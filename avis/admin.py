from django.contrib import admin
from .models import Avis

@admin.register(Avis)
class AvisAdmin(admin.ModelAdmin):
    list_display = ['id','nom', 'organisation', 'note', 'date_creation','est_valide']
    list_editable = ['est_valide']
    list_filter = ['est_valide', 'note']
    search_fields = ['nom', 'message']
