from django.shortcuts import render
from .models import Realisation, RealisationPhoto

# Create your views here.
def realisation_page(request):
    realisations = Realisation.objects.all()
    return render(request, 'realisation.html',{'realisations':realisations})


def detail_realisation(request, id):
    pass
    
