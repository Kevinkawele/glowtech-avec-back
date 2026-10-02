
from django.urls import path
from .views import HomePageViews, about_page


urlpatterns = [
    path('', HomePageViews.as_view(), name='home_page'),
    path('about/', about_page, name='about_page'),

] 
