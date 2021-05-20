from django.urls import path
from .views import TwitterAuthView,ThreadView,LoginView
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('twitter/',TwitterAuthView.as_view()),
    path('login/',LoginView.as_view()),
    path('thread/<int:thread_id>/',ThreadView.as_view()),
]

urlpatterns+= static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
