import tweepy
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

def create_api():
        
        consumer_key = "A7pCvUvYh12lPrAoYyO3hACoA"
        consumer_secret = "lu9aDxZODOgaIPfxTHW1qev1tiFPITNrUjyLfuPDxn4qHSxLYc"
        access_token = "1394591469059543048-ezJbZsKiKJVOCBd5zo84U9ONmRZdTh"
        access_token_secret = "sWB7LgMok0GzgmzNx8PjDINaXbfNfuetVywePwPwFox4a"

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

def check_mentions(api, keywords, since_id):
    logger.info("Retrieving mentions")
    new_since_id = since_id
    for tweet in tweepy.Cursor(api.mentions_timeline,
        since_id=since_id).items():
        new_since_id = max(tweet.id, new_since_id)
        if tweet.in_reply_to_status_id is not None:
            continue
        if any(keyword in tweet.text.lower() for keyword in keywords):
            logger.info(f"Answering to {tweet.user.name}")

            if not tweet.user.following:
                tweet.user.follow()

            api.update_status(
                status="Please reach us via DM",
                in_reply_to_status_id=tweet.id,
            )
    return new_since_id

def main():
    api = create_api()
    since_id = 1
    # while True:
    #     since_id = check_mentions(api, ["save",], since_id)
    #     logger.info("Waiting...")
    #     time.sleep(60)
    tweets = api.home_timeline(count=1)
    tweet = tweets[0]
    print(f"Liking tweet {tweet.id} of {tweet.author.name}")
if __name__ == "__main__":
    main()