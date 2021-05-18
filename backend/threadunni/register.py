from django.contrib.auth import authenticate
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import repackage

repackage.up()
from my_secrets import secrets

def register_user(username):
    filtered_by_username = User.objects.filter(username=username)

    if filtered_by_username.exists():

        registered_user = authenticate(
                username=username, password=secrets.SECRET_PW)
        
        return {
                'username': registered_user.username,
                'tokens': registered_user.tokens()}

    else:
        # user = {
        #     'username': username,
        #     'password': secrets.SECRET_PW}
        user = User.objects.create_user(username,secrets.SECRET_PW)
        print(user.username) 
        user.save()

        new_user = authenticate(
            username=username, password=secrets.SECRET_PW)
        return {
            'username': new_user.username,
            'tokens': new_user.tokens()
        }
