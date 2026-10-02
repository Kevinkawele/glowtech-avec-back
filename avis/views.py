from django.http import JsonResponse
from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .forms import AvisForm
from .models import Avis


@require_POST
def creer_avis(request):
    form = AvisForm(request.POST)
    if form.is_valid():
        form.save()
        return JsonResponse(
            {
                "success" : True,
                "message" : "Merci votre avis sera publié apres lecture"
            })
    return JsonResponse({"seccess": False, "errors": form.errors}, status =400)

