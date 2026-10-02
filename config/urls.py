from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path

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
    urlpatterns += [
        re_path(r'^static/(?call:p.*)$', serve, {'document_root': settings.STATIC_ROOT}),
        re_path(r'^media/(?call:p.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]
else:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
