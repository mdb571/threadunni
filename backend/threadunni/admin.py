from django.contrib import admin

# Register your models here.
from .models import User,Thread,Since

admin.site.register(User)
admin.site.register(Thread)
admin.site.register(Since)