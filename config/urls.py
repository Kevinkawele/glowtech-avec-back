from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    path('', include('core.urls')),
    path('services/', include('services.urls')),
    path('avis/', include('avis.urls')),
    path('contact/', include('contact.urls')),
    path('devis/', include('devis.urls')),
    path('realisation/', include('realisation.urls')),
    path('admin/', admin.site.urls),
] 

if not settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
