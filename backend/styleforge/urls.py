from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('knox.urls')),
    path('api/users/', include('users.urls')),
    path('api/designs/', include('designs.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 