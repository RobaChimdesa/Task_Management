from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Task, Catagory
from .serializers import TaskSerializer,CategorySerializer,RegisterSerializer

# Create your views here.
 
@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class TaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Task.objects.filter(user=self.request.user)
    
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# class CategoryViewSet(viewsets.ModelViewSet):
#     serializer_class = CategorySerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Catagory.objects.filter(user = self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user = self.request.user) 


# Task List and Create
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def task_list_or_create(request):
    if request.method == 'GET':
        tasks = Task.objects.filter(user=request.user)
        seralizer = TaskSerializer(tasks,many=True)
        return Response(seralizer.data)
    if request.method == 'POST':
        seralizer = TaskSerializer(data = request.data)
        if seralizer.is_valid():
            seralizer.save(user=request.user)
            return Response(seralizer.data,status=status.HTTP_201_CREATED)
        return Response(seralizer.errors,status=status.HTTP_400_BAD_REQUEST)
    



# task detail,updata,delete

@api_view(['GET', 'PUT','DELETE'])
@permission_classes([IsAuthenticated])
def task_detail(request,pk):
    try:
        task = Task.objects.get(pk=pk,user=request.user)
    except Task.DoesNotExist:
        return Response({"error":"Task not found"},status=status.HTTP_404_NOT_FOUND)    
    
    if request.method == 'GET':
        seralizer = TaskSerializer(task)
        return Response(seralizer.data)
    

    if request.method == 'PUT':
        seralizer = TaskSerializer(task,data=request.data)
        if seralizer.is_valid():
            seralizer.save()
            return Response(seralizer.data)
        return Response(seralizer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method =='DELETE':
        task.delete()
        return Response({"message":"Task deleted"},status=status.HTTP_204_NO_CONTENT)
    
# category list and creation

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])

def category_list_or_create(request):
    if request.method == 'GET':
        Catagories = Catagory.objects.filter(user = request.user)
        serializer = CategorySerializer(Catagories, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = CategorySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)





