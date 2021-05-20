from django.core.management.base import BaseCommand
from threadunni.models import User,Thread,Since
import tweepy
import logging
import time
import os
import requests
from bs4 import BeautifulSoup


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

class Command(BaseCommand):
    help='Script to reply to mentions'

    def create_api(self):
        
        consumer_key = os.environ.get('BOT_CONSUMER_KEY')
        consumer_secret = os.environ.get('BOT_CONSUMER_KEY_SECRET')
        access_token = os.environ.get('BOT_ACCESS_TOKEN')
        access_token_secret = os.environ.get('BOT_ACCESS_TOKEN_SECRET')

        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth, wait_on_rate_limit=True, 
            wait_on_rate_limit_notify=True)
        try:
            api.verify_credentials()
        except Exception as e:
            logger.error("Error creating API", exc_info=True)
            raise e
        logger.info("API created")

        return api


    def getAllTweets(self,tweetId,api):
        thread = []
        hasReply = True
        res = api.get_status(tweetId, tweet_mode='extended')
        allTillThread = self.get_all_tweets(res,api)
        thread.append(res)
        if allTillThread[-1] > res.id:
            logger.info("Not able to retrieve so older tweets")
            return thread
        logger.info("Got required tweets")
        startIndex = allTillThread.index(res.id)
        
        quietLong = 0
        while startIndex!=0 and quietLong<25:
            nowIndex = startIndex-1
            nowTweet = api.get_status(allTillThread[nowIndex], tweet_mode='extended')
            if nowTweet.in_reply_to_status_id == thread[-1].id:
                quietLong = 0
                #print("Reached a useful tweet to be included in thread")
                thread.append(nowTweet)
                logger.info(nowTweet.full_text)
            else:
                quietLong = quietLong + 1
            startIndex = nowIndex
        
        return thread


    def get_all_tweets(self,tweet,api):

        screen_name = tweet.user.screen_name
        lastTweetId = tweet.id
        
        allTweets = []
        
        new_tweets = api.user_timeline(screen_name = screen_name,count=200)
        allTweets.extend(new_tweets)
        
        oldest = allTweets[-1].id - 1
        
        while len(new_tweets) > 0 and oldest >= lastTweetId:
            logger.info(f"getting tweets before {oldest}")
            
            new_tweets = api.user_timeline(screen_name = screen_name,count=200,max_id=oldest)
            
            allTweets.extend(new_tweets)
            #
            oldest =allTweets[-1].id - 1
            logger.info(f"...{len(allTweets)} tweets downloaded so far")

        outtweets = [tweet.id for tweet in allTweets]
       
        return outtweets
        


    def handle(self,*args, **options):
        
        api=self.create_api()
       
        since=Since.objects.latest('since_int')
        logger.info("Retrieving mentions")
        since_id=int(str(since))
        
        media_url="No Media"
        
        new_since_id = since_id
       
        for tweet in tweepy.Cursor(api.mentions_timeline,
            since_id=since_id).items():
            
            if tweet.id>new_since_id:
                new_since_id = tweet.id
                Since(since_int=new_since_id).save()
            if tweet.in_reply_to_status_id is None:
                logger.info("Status None")
                continue
            if 'save' in tweet.text.lower().split():
                logger.info(f"Answering to {tweet.user.name}")

                if not tweet.favorited:
                    tweet.favorite()
                status = api.get_status(new_since_id) 
                thread_exists = Thread.objects.filter(
                    thread_id=status.in_reply_to_status_id).first()
                if thread_exists:
                    logger.info("Thread Already Exists")
                    try:
                        thread_reader = User.objects.filter(username=status.user.screen_name).first()
                        
                        if thread_reader:
                            Thread.objects.filter(thread_id=status.in_reply_to_status_id).first().username.add(thread_reader)
                        
                        api.update_status(
                        status=f'@{status.user.screen_name} Your collected thread is ready '+ str(status.in_reply_to_status_id),
                        in_reply_to_status_id=tweet.id,
                        auto_populate_reply_metadata=True
                    )
                        logger.info("Reply Tweeted")
                    except Exception as e:
                        logger.info(e)
                        pass
                else:
                    thread_requester=status.user.screen_name
                    owner_name = status.in_reply_to_screen_name
                    thread_id = status.in_reply_to_status_id
                    main = api.get_status(thread_id, tweet_mode='extended')
                    
                    photo = main.user.profile_image_url_https.replace(
                        "_normal.jpg", ".jpg").replace("_normal.png", ".png")
                    try:
                        thum_url = main.entities['media'][0]['media_url_https']
                    except Exception:
                        thum_url="Default Link"
                        pass

                    content_text=list()

                    content=self.getAllTweets(thread_id,api)
                    for text in content:

                        content_text.append(text.full_text)

                    
                        try:
                            for i in range(len(text.extended_entities['media'])):
                                if "ext_tw_video" in text.extended_entities['media'][i]['media_url_https']:
                                    for j in range(len(text.extended_entities['media'][i]['video_info']['variants'])):
                                        if ".mp4" in text.extended_entities['media'][i]['video_info']['variants'][j]['url']:
                                            media_url = text.extended_entities[
                                                'media'][i]['video_info']['variants'][j]['url']

                                            break
                                elif text.extended_entities['media'][i]['type'] == "animated_gif":
                                    for j in range(len(text.extended_entities['media'][i]['video_info']['variants'])):
                                        if ".mp4" in text.extended_entities['media'][i]['video_info']['variants'][j]['url']:
                                            media_url = text.extended_entities[
                                                'media'][i]['video_info']['variants'][j]['url']
                                            
                                            
                                            break
                                else:
                                    media_url = text.extended_entities['media'][i]['media_url_https']
                                    
                        except Exception as e:
                            print(e)
                        
                    title="A Thread by "+ owner_name
                    new_thread=Thread(thread_id=thread_id,thread=content_text,link="/thread/"+str(thread_id),owner=owner_name,owner_photo=photo,title=title,thread_thumbnail=thum_url,media_url=media_url)
                    logger.info("Thread Created")
                    api.update_status(
                        status=f'@{status.user.screen_name} Your collected thread is ready '+ str(thread_id),
                        in_reply_to_status_id=tweet.id,
                        auto_populate_reply_metadata=True
                    )
                    new_thread.save()
                    logger.info("Thread Replied")
        return 


