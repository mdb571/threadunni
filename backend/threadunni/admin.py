from django.contrib import admin

# Register your models here.
from .models import User,Thread

admin.site.register(User)
admin.site.register(Thread)