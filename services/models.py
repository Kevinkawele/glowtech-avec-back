from django.db import models

class Services(models.Model):
    designation = models.CharField(max_length=40, )
    description = models.TextField()
    photo_service = models.ImageField(upload_to="media/service/")


    def __str__(self):
        return f"{self.designation}"

    class Meta:
            verbose_name = 'Service'
            verbose_name_plural = 'Service'