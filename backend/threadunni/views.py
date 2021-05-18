from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import TwitterSerializer

# Create your views here.


class TwitterAuthView(GenericAPIView):
    serializer_class = TwitterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)