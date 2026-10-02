from django.db import models
from services.models import Services

class Realisation(models.Model):
    service = models.ForeignKey(to=Services, on_delete=models.CASCADE)
    titre = models.CharField(max_length=35)
    description = models.TextField()
    photo_principale = models.ImageField(upload_to='media/project')

    date_realisation = models.DateField(blank=True, auto_now=True)

    def __str__(self):
        return f"{self.titre} - {self.service}"


class RealisationPhoto(models.Model):
    realisation = models.ForeignKey(to=Realisation, on_delete=models.CASCADE)
    photos = models.ImageField(upload_to='media/project')

    def __str__(self):
        return f"{self.photo}"