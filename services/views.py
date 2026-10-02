from django.shortcuts import render
from .models import Services

# Create your views here.
def activity_page(request):
    services = Services.objects.all()
    return render(request, 'activity.html', {'services' : services})
