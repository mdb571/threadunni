from django.urls import path
from .views import TwitterAuthView,ThreadView,LoginView

urlpatterns = [
    path('twitter/',TwitterAuthView.as_view()),
    path('login/',LoginView.as_view()),
    path('thread/<int:thread_id>/',ThreadView.as_view()),
]
