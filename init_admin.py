import os
import django

# Configuration de l'environnement Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Récupération des variables d'environnement
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if username and password:
    # On vérifie si le superutilisateur existe déjà pour éviter les erreurs
    if not User.objects.filter(username=username).exists():
        print(f"Création automatique du superutilisateur : {username}...")
        User.objects.create_superuser(username=username, email=email, password=password)
        print("Superutilisateur créé avec succès !")
    else:
        print(f"Le superutilisateur '{username}' existe déjà. Étape ignorée.")
else:
    print("Variables d'administration manquantes dans l'environnement.")
