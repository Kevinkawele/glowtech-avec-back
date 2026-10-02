from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .forms import DevisForm


def devis_page(request):
    if request.method == "POST":
        form = DevisForm(request.POST)
        if form.is_valid():
            nom = form.cleaned_data['nom']
            orgnaisation = form.cleaned_data['orgnaisation']
            email = form.cleaned_data['email']
            telephone = form.cleaned_data['telephone']
            service = form.cleaned_data['service']
            localisation = form.cleaned_data['localisation']
            message = form.cleaned_data['message']


            corps_mail = f"""
                Nom : {nom}
                orgnaisation : {orgnaisation}
                email : {email}
                telephone : {telephone}
                service : {service}
                localisation : {localisation}
                Message : {message}
            """

            send_mail(
                subject= f"[Devis  ] {service}",
                message = corps_mail,
                from_email= settings.DEFAULT_FROM_EMAIL,
                recipient_list= [settings.CONTACT_EMAIL],
                fail_silently=False,
                reply_to = [email]
            )

            messages.success(request, "Votre Devis a bien été envoyé, merci")
            return redirect('devis_page')
    else:
        form = DevisForm()
    return render(request, 'devis.html', {'form': form})
    
    