import tweepy
import logging
from config import create_api
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

def check_mentions(api,since_id):
    logger.info("Retrieving mentions")
    new_since_id = since_id
    for tweet in tweepy.Cursor(api.mentions_timeline,
        since_id=since_id).items():
        print(tweet.text.lower())
        new_since_id = max(tweet.id, new_since_id)
        
        if tweet.in_reply_to_status_id is None:
            continue
        if 'save' in tweet.text.lower().split():
            logger.info(f"Answering to {tweet.user.name}")

            if not tweet.favorited:
                tweet.favorite()

            api.update_status(
                status="Ok this works",
                in_reply_to_status_id=tweet.id,
                auto_populate_reply_metadata=True
            )
    return new_since_id

def main():
    api = create_api()
    since_id = 1
    while True:
        since_id = check_mentions(api, since_id)
        logger.info("Waiting...")
        time.sleep(10)

if __name__ == "__main__":
    main()