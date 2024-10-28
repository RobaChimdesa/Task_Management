from rest_framework import serializers
from .models import Task,Catagory

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Catagory
        fields = '__all__'  # fields = '__all__' means all fields of the
    