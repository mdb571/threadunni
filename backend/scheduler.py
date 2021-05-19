from apscheduler.schedulers.blocking import BlockingScheduler
import os


sched = BlockingScheduler()

@sched.scheduled_job('interval', minutes=3)
def timed_job():
    os.sys('python manage.py bot')