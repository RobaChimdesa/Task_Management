from django.urls import path
# from rest_framework.routers import DefaultRouter
from .views import register_user,task_list_or_create,task_detail,category_list_or_create
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# router = DefaultRouter()

# router.register(r'tasks',TaskViewSet,basename='task')
# router.register(r'categories',CategoryViewSet,basename='category')
urlpatterns = [
    path('register/', register_user, name='register'),

    # path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # task urls
    path('tasks/',task_list_or_create,name='task_list_or_create'),
    path('tasks/<int:pk>/',task_detail,name='task_detail'),

    # category urls

    path('categories',category_list_or_create, name = 'category_list_create')

]
