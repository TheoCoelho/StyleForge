from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterAPI.as_view(), name='register'),
    path('login/', views.LoginAPI.as_view(), name='login'),
    path('logout/', views.LogoutAPI.as_view(), name='logout'),
    path('user/', views.UserAPI.as_view(), name='user'),
    path('profile/', views.ProfileAPI.as_view(), name='profile'),
] 