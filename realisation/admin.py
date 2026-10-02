from django.contrib import admin
from .models import Realisation, RealisationPhoto

@admin.register(Realisation)
class RealisationAdmin(admin.ModelAdmin):
    list_display = ['titre', 'description']
    