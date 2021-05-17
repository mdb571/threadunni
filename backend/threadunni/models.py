from django.db import models
from django.contrib.auth.models import (
    User,BaseUserManager, AbstractBaseUser
)
from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.




class AppUser(BaseUserManager):

    def create_user(self,username,email,password=None):
        
        if username or email is None:
            raise ValueError('Username/Email Missing')

        user=self.model(username=username,email=self.normalize_email(email))
        user.set_password(password)
        
        return user

    

class User(AbstractBaseUser):
    username=models.CharField(max_length=255,unique=True,db_index=True)
    email=models.EmailField(max_length=255,unique=True,db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects=AppUser()

    USERNAME_FIELD='username'
    REQUIRED_FIELDS=['username']

    def __str__(self):
        return self.username

    def tokens(self):
        refresh=RefreshToken.for_user(self)
        return{
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }


class Thread(models.Model):

    user=models.ForeignKey(User,on_delete=models.CASCADE)
    thread=models.TextField(null=False)