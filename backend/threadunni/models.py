from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser , PermissionsMixin
)
from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.



class AppUser(BaseUserManager):

    def create_user(self,username,password=None):
        
        if username  is None:
            raise ValueError('Username Missing')

        user=self.model(username=username)
        user.set_password(password)
        
        return user

    def create_superuser(self, username, password=None):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser,PermissionsMixin):
    username=models.CharField(max_length=255,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    

    USERNAME_FIELD='username'
    
    objects=AppUser()

    def __str__(self):
        return self.username

    def tokens(self):
        refresh=RefreshToken.for_user(self)
        return{
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }


class Thread(models.Model):
    id=models.AutoField(primary_key=True)
    username=models.ManyToManyField(User,default=1)
    thread_id=models.CharField(max_length=256,unique=True)
    thread=models.TextField()
    link=models.CharField(max_length=250,unique=True)
    owner=models.CharField(max_length=64)
    owner_photo=models.CharField(max_length=256)
    title=models.CharField(max_length=256,default='Thread')
    thread_thumbnail=models.CharField(max_length=250)
    media_url=models.CharField(max_length=250,default="")

    def __str__():
        return self.owner