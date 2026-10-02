from django.shortcuts import render
from django.views.generic import TemplateView
from services.models import Services
from realisation.models import Realisation
from avis.models import Avis


class HomePageViews(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['services'] = Services.objects.all()
        context['avis_valides'] = Avis.objects.filter(est_valide=True)
        context['realisations'] = Realisation.objects.all()[:5]
        return context


def about_page(request):
    return render(request, 'about.html')







    
def devis_page(request):
    return render(request, 'devis.html')