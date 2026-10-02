

from django.urls import path
from .views import devis_page


urlpatterns = [
    path('', devis_page, name='devis_page'),
]
