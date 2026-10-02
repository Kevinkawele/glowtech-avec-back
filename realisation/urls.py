from django.urls import path
from.views import realisation_page

urlpatterns = [
    path('', realisation_page, name='realisation_page'),
]
