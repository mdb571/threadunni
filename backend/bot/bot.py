import tweepy
from config import create_api
import time
from threadunni.models import Thread,User
import re

api = create_api()

class ThreadStreamListener(tweepy.StreamListener):
    def on_status(self, status):
        try:
            if 'save' in status.text.lower().split(" "):
                thread_exists = Thread.objects.filter(
                    thread_id=status.in_reply_to_status_id).first()
                if thread_exists:
                    try:
                        thread_ond = User.objects.filter(username=status.user.screen_name).first()
                        if thread_ond:
                            Thread.objects.filter(thread_id=status.in_reply_to_status_id).first().username.add(thread_ond.user.username)
                        api.update_status(
                            f'@{status.user.screen_name} Your saved thread is ready Link : ', status.id)
                    except Exception:
                        pass
                else:
                    
                    screen_name = status.in_reply_to_screen_name
                    name = status.entities['user_mentions'][0]['name']
                    thread_id = status.in_reply_to_status_id
                    main = api.get_status(thread_id, tweet_mode='extended')
                    photo = main.user.profile_image_url_https.replace(
                        "_normal.jpg", ".jpg").replace("_normal.png", ".png")
                    description = self.clean_string(main.user.description)
                    
                    try:
                        thumb_url = main.entities['media'][0]['media_url_https']
                    except Exception:
                        thum = "https://default.jpg"

                    thread_tweets = []
                    req = requests.get(
                        "https://mobile.twitter.com/{0}/status/{1}".format(screen_name, thread_id))
                    bs4 = BeautifulSoup(req.content, "html.parser")
                    for el in bs4.findAll('table', class_="tweet", href=True):
                        if "{0}/status/".format(screen_name) in el.attrs["href"]:
                            thread_tweets.append(
                                el.attrs["href"].split("/")[3].split('?')[0])
                        else:
                            break

                    
                    final_content = []
                    if len(thread_tweets) > 0:
                        thread_tweets.insert(0, thread_id)
                        for index, tweet in enumerate(thread_tweets):
                            tweet_details = api.get_status(
                                tweet, tweet_mode='extended')
                            text = tweet_details.full_text
                            
                            if index == 0:
                                title = self.remove_tco(text)
                            content = self.get_media_url(
                                thread_id, tweet_details, content)
                            content = self.clean_string(content)
                            final_content.append(content+'<br><br>')
                        final_content = ''.join(final_content)
                        final_content = "<p class='article__text'>" + final_content + '</p>'
                            
                        Thread(thread_id=thread_id, thread=final_content, link="/thread/"+str(thread_id), owner=name,
                            owner_photo=photo, title=title, thread_thumbnail=thumb_url).save()
                        
                        thread_ond = User.objects.filter(status.user.screen_name).first()
                        if thread_ond:
                            Thread.objects.filter(thread_id=status.in_reply_to_status_id).first().username.add(thread_ond.user.username)
                        
            else:
                pass
        except Exception as e:
            print(e)
            pass


    def on_error(self, status_code):
        if status_code == 420:
            time.sleep(60)
            return True

     def remove_tco(self, string):
        twitter_urls = re.findall(
            r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', string)
        for url in twitter_urls:
            if "t.co" in url:
                string = string.replace(url, "")
        return string

    def get_media_url(self, thread_id, tweet_details, text):
        data = text
        try:
            for i in range(len(tweet_details.extended_entities['media'])):
                if "ext_tw_video" in tweet_details.extended_entities['media'][i]['media_url_https']:
                    for j in range(len(tweet_details.extended_entities['media'][i]['video_info']['variants'])):
                        if ".mp4" in tweet_details.extended_entities['media'][i]['video_info']['variants'][j]['url']:
                            mp4_url = tweet_details.extended_entities[
                                'media'][i]['video_info']['variants'][j]['url']
                            self.media_url=mp4_url
                            break
                elif tweet_details.extended_entities['media'][i]['type'] == "animated_gif":
                    for j in range(len(tweet_details.extended_entities['media'][i]['video_info']['variants'])):
                        if ".mp4" in tweet_details.extended_entities['media'][i]['video_info']['variants'][j]['url']:
                            mp4_url = tweet_details.extended_entities[
                                'media'][i]['video_info']['variants'][j]['url']
                            self.media_url=mp4_url
                            break
                else:
                    img_url = tweet_details.extended_entities['media'][i]['media_url_https']
                    self.media_url=img_url
            return data
        except Exception as e:
            print(e)
            return data

def start_stream(stream, **kwargs):
    try:
        print("started")
        stream.filter(**kwargs)
    except Exception as e:
        print(e)
        start_stream(stream, **kwargs)

ThreadStream=ThreadStreamListener()
stream=tweepy.Stream(auth=api.auth, listener=myStreamListener)
start_stream(stream, track=['@threadunni save'], stall_warnings=True)
