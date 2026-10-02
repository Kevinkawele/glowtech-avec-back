from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .forms import ContactForm



def contact_page(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            nom = form.cleaned_data['nom']
            email = form.cleaned_data['email']
            sujet = form.cleaned_data['sujet']
            message = form.cleaned_data['message']

            corps_mail = f"""
                Nom : {nom}
                Email : {email}
                sujet : {sujet}
                Message : {message}
            """

            send_mail(
                subject= f"[contact du site ] {sujet}",
                message = corps_mail,
                from_email= settings.DEFAULT_FROM_EMAIL,
                recipient_list= [settings.CONTACT_EMAIL],
                fail_silently=False,
                reply_to = [email]
            )

            messages.success(request, "Votre message a bien été envoyé, merci")
            return redirect('contact')
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})
    
    