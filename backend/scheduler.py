from apscheduler.schedulers.blocking import BlockingScheduler
import os


sched = BlockingScheduler()

@sched.scheduled_job('interval', minutes=3)
def timed_job():
    os.system('python manage.py bot')

sched.start()
