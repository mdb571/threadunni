from django.urls import path
from .views import TwitterAuthView

urlpatterns = [
    path('twitter/',TwitterAuthView.as_view()),
]