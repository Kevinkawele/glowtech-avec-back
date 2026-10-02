from django import forms

class DevisForm(forms.Form):
    nom = forms.CharField(max_length=100, label='Votre nom')
    orgnaisation = forms.EmailField(label='Organisation')
    email = forms.CharField(max_length=200, label='email')
    telephone = forms.CharField(max_length=15, label='Telephone')

    SERVICE_CHOICES = [
        ('BTP et construction', 'BTP et construction'),
        ('Électricité', 'Électricité'),
        ('Énergie solaire', 'Énergie solaire'),
        ('Maintenance', 'Maintenance'),
        ('Climatisation', 'Climatisation'),
        ('Ajustage et soudure', 'Ajustage et soudure'),

    ]
    service = forms.Select(choices=SERVICE_CHOICES)
    localisation = forms.CharField(max_length=50)
    message = forms.CharField(widget=forms.Textarea, label='Votre message')