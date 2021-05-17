from rest_framework import serializers
from .twitterr import validate_twitter
import os
from rest_framework.exceptions import AuthenticationFailed
from .register import register_user

class TwitterSerializer(serializers.Serializer):
    
    access_token_key = serializers.CharField()
    access_token_secret = serializers.CharField()

    def validate(self, attrs):

        access_token_key = attrs.get('access_token_key')
        access_token_secret = attrs.get('access_token_secret')

        user_info = validate_twitter(
            access_token_key, access_token_secret)

        try:
            username = user_info['screen_name']
        
        except:
            raise serializers.ValidationError(
                'The tokens are invalid or expired. Please login again.'
            )

        return register_user(username=username)
