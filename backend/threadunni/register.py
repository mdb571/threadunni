from django.contrib.auth import authenticate
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import os

def register_user(username,profile_pic):
    filtered_by_username = User.objects.filter(username=username)

    if filtered_by_username.exists():

        registered_user = authenticate(
                username=username, password=os.environ.get('SECRET_PW'))
        
        return {
                'username': registered_user.username,
                'tokens': registered_user.tokens()}

    else:
        # user = {
        #      'username': username,
        #      'password': os.environ.get(SECRET_PW}
        user = User.objects.create_user(username,os.environ.get('SECRET_PW'))
        user.profile_pic=profile_pic 
        user.save()

        new_user = authenticate(
            username=username, password=os.environ.get('SECRET_PW'))
        return {
            'username': new_user.username,
            'tokens': new_user.tokens()
        }
