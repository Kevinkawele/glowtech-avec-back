from django.urls import path
from . import views

urlpatterns = [
    path('creer/', views.creer_avis, name="creer_avis"),
   
]
