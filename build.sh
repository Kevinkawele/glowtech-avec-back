#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Cette commande rassemble les 130 fichiers statiques dans le dossier 'staticfiles'
python manage.py collectstatic --noinput

python manage.py migrate
