from django.contrib import admin

# Register your models here.
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'created_at','updated_at']


admin.site.register(User, UserAdmin)
