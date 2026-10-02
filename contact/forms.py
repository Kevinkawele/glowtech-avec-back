from django import forms

class ContactForm(forms.Form):
    nom = forms.CharField(max_length=100, label='Votre nom')
    email = forms.EmailField(label='Adresse e-mail')
    sujet = forms.CharField(max_length=200, label='Le sujet')
    message = forms.CharField(widget=forms.Textarea, label='Votre nom')