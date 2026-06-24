# CV Interactif – Mariama LY

Projet réalisé dans le cadre du module **Développement Web** – Licence 2 Informatique,  
Université Iba Der Thiam de Thiès.

## Description

Page web complète représentant un curriculum vitae interactif et responsive, développée
avec les trois technologies fondamentales du front-end : HTML5, CSS3 et JavaScript (Vanilla).

## Technologies utilisées

- **HTML5** – Structure sémantique (header, nav, main, section, article, footer)
- **CSS3** – Variables CSS, Flexbox, Grid, animations, responsive design
- **JavaScript** – Vanilla JS (aucune bibliothèque externe)
- **Google Fonts** – Playfair Display + Inter
- **Font Awesome 6** – Icônes

## Fonctionnalités

- Mode sombre / clair avec sauvegarde `localStorage`
- Menu de navigation fixe avec liens d'ancrage et smooth scroll
- Menu hamburger responsive (mobile)
- Barres de compétences animées au scroll (`IntersectionObserver`)
- Formulaire de contact avec validation JavaScript côté client
- Bouton "Retour en haut" avec apparition au scroll
- Design fully responsive (mobile, tablette, desktop)

## Structure du projet

```
mon-cv/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── photo-profil.jpg   ← À remplacer par ta vraie photo
└── README.md
```

## Comment ouvrir le projet

1. Télécharger ou décompresser le dossier `mon-cv/`
2. Placer ta photo dans `images/photo-profil.jpg`
3. Ouvrir `index.html` dans un navigateur (Chrome, Firefox…)

> Aucun serveur requis – la page fonctionne directement en local.

## Personnalisation

Pour adapter ce CV à tes vraies informations, remplace dans `index.html` :
- Le nom **Amadou Diallo** par ton nom
- Les coordonnées (e-mail, téléphone, ville)
- Le contenu de chaque section (formation, expériences, projets…)
- Les pourcentages des compétences (attribut `data-width`)
- Les liens GitHub et LinkedIn dans le footer
