from django.contrib import admin
from .models import Services


class ServiceAdmin(admin.ModelAdmin):
    list_display = ('designation', 'designation')
    list_per_page = 5



admin.site.register(Services, ServiceAdmin)