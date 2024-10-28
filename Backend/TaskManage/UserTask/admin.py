from django.contrib import admin
from .models import Task,Catagory
# Register your models here.


# admin.py
from django.contrib import admin
from .models import Task,Catagory

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'catagory', 'user', 'deadline', 'completed')
    list_filter = ('completed', 'catagory', 'user')
    search_fields = ('title', 'description ')

@admin.register(Catagory)
class CatagoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')
    search_fields = ('name',)