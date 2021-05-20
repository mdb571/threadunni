from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView ,RetrieveAPIView
from rest_framework.views import APIView  
from .serializers import TwitterSerializer,ThreadSerializer ,LoginSerializer
from .models import User,Thread
from  rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
# Create your views here.


class TwitterAuthView(GenericAPIView):
    serializer_class = TwitterSerializer
    permission_classes = [AllowAny,]
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class LoginView(APIView):
    permission_classes = [IsAuthenticated,]
    
    def get_object(self):
        return User.objects.get(username=self.request.user.username)

    def get(self, request, *args, **kwargs):
        serializer = LoginSerializer(self.get_object())
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    
class ThreadView(APIView):
    permission_classes = [IsAuthenticated,]
   
    def get_object(self):
        return Thread.objects.get(thread_id=self.kwargs['thread_id'])

    def get(self,request,*args,**kwargs):
        serializer = ThreadSerializer(self.get_object())
        
        return Response(serializer.data, status=status.HTTP_200_OK)



