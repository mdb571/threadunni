from django.contrib.auth import authenticate
from .models import User
import environ
from rest_framework.exceptions import AuthenticationFailed


def register_user(username, email):
    filtered_by_username = User.objects.filter(username=username)

    if filtered_by_username.exists():

        registered_user = authenticate(
                email=email, password=env('SECRET_PW'))

        return {
                'username': registered_user.username,
                'email': registered_user.email,
                'tokens': registered_user.tokens()}

    else:
        user = {
            'username': username, 'email': email,
            'password': env('SECRET_PW')}
        user = User.objects.create_user(**user) 
        user.save()

        new_user = authenticate(
            email=email, password=env('SECRET_PW'))
        return {
            'email': new_user.email,
            'username': new_user.username,
            'tokens': new_user.tokens()
        }
