from django.urls import path
from . import views

urlpatterns = [
    path('', views.DesignListCreateAPI.as_view(), name='design-list-create'),
    path('<int:pk>/', views.DesignRetrieveUpdateDestroyAPI.as_view(), name='design-detail'),
    path('types/', views.ClothingTypeListAPI.as_view(), name='clothing-type-list'),
    path('subtypes/', views.ClothingSubtypeListAPI.as_view(), name='clothing-subtype-list'),
    path('images/', views.DesignImageListCreateAPI.as_view(), name='design-image-list-create'),
    path('images/<int:pk>/', views.DesignImageRetrieveUpdateDestroyAPI.as_view(), name='design-image-detail'),
    path('elements/', views.DesignElementListCreateAPI.as_view(), name='design-element-list-create'),
    path('elements/<int:pk>/', views.DesignElementRetrieveUpdateDestroyAPI.as_view(), name='design-element-detail'),
] 