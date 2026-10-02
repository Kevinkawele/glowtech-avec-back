from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Avis(models.Model):
    nom = models.CharField(max_length=100)
    organisation = models.CharField(max_length=100, blank=True)
    note = models.PositiveBigIntegerField(
        validators = [MinValueValidator(1), MaxValueValidator(5)]
    )
    message = models.TextField(max_length=200)
    date_creation = models.DateTimeField(auto_now=True)
    est_valide = models.BooleanField(default=True, help_text='Cocher pour publier cet avis sur le site')

    class Meta:
        ordering = ['-date_creation']
        verbose_name = 'Avis'
        verbose_name_plural = 'Avis'

    def __str__(self):
        return f"{self.nom} - {self.note}"