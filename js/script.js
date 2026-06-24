const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

/**
 * Applique le thème choisi et met à jour l'icône du bouton.
 * @param {string} theme - 'dark' ou 'light'
 */
function appliquerTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.setAttribute('aria-label', 'Activer le mode clair');
  } else {
    body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Activer le mode sombre');
  }
}

// Lecture de la préférence sauvegardée au chargement
const themeSauvegarde = localStorage.getItem('theme') || 'light';
appliquerTheme(themeSauvegarde);

// Écoute du clic sur le bouton de bascule
themeToggle.addEventListener('click', function () {
  const estSombre = body.classList.contains('dark-mode');
  const nouveauTheme = estSombre ? 'light' : 'dark';
  appliquerTheme(nouveauTheme);
  // Sauvegarde du choix dans localStorage
  localStorage.setItem('theme', nouveauTheme);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Ouverture / fermeture du menu mobile
hamburger.addEventListener('click', function () {
  const estOuvert = navLinks.classList.contains('open');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(!estOuvert));
});

// Fermer le menu au clic sur un lien + smooth scroll
navLinks.querySelectorAll('a').forEach(function (lien) {
  lien.addEventListener('click', function (e) {
    const href = lien.getAttribute('href');

    // Si lien d'ancrage interne
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const cible = document.querySelector(href);
      if (cible) {
        // Décalage pour tenir compte de la navbar fixe
        const navHeight = document.getElementById('navbar').offsetHeight;
        const positionCible = cible.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: positionCible, behavior: 'smooth' });
      }
    }

    // Fermer le menu mobile après clic
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


const skillFills = document.querySelectorAll('.skill-fill');

/**
 * Lance l'animation d'une barre de compétence.
 * La largeur cible est lue depuis l'attribut data-width.
 * @param {HTMLElement} barre
 */
function animerBarre(barre) {
  const largeurCible = barre.getAttribute('data-width');
  if (largeurCible) {
    barre.style.width = largeurCible + '%';
  }
}

// Création de l'observateur
const observateurCompetences = new IntersectionObserver(
  function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        animerBarre(entree.target);
        // On n'observe plus une fois animée
        observateurCompetences.unobserve(entree.target);
      }
    });
  },
  {
    threshold: 0.3, // Déclenche quand 30% de l'élément est visible
  }
);

// Observation de chaque barre
skillFills.forEach(function (barre) {
  observateurCompetences.observe(barre);
});

const formulaire = document.getElementById('contact-form');
const champNom = document.getElementById('nom');
const champEmail = document.getElementById('email');
const champMessage = document.getElementById('message');
const erreurNom = document.getElementById('nom-error');
const erreurEmail = document.getElementById('email-error');
const erreurMessage = document.getElementById('message-error');
const messageSucces = document.getElementById('form-success');

/**
 * Affiche une erreur sur un champ.
 * @param {HTMLElement} champ - L'input/textarea
 * @param {HTMLElement} spanErreur - Le span d'erreur associé
 * @param {string} texte - Le message d'erreur
 */
function afficherErreur(champ, spanErreur, texte) {
  champ.classList.add('error');
  spanErreur.textContent = texte;
}

/**
 * Efface l'erreur d'un champ.
 * @param {HTMLElement} champ
 * @param {HTMLElement} spanErreur
 */
function effacerErreur(champ, spanErreur) {
  champ.classList.remove('error');
  spanErreur.textContent = '';
}

/**
 * Valide une adresse e-mail avec une expression régulière.
 * @param {string} email
 * @returns {boolean}
 */
function estEmailValide(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valide tous les champs du formulaire.
 * @returns {boolean} true si tout est valide
 */
function validerFormulaire() {
  let valide = true;

  // Validation du nom
  if (champNom.value.trim() === '') {
    afficherErreur(champNom, erreurNom, 'Veuillez entrer votre nom.');
    valide = false;
  } else {
    effacerErreur(champNom, erreurNom);
  }

  // Validation de l'e-mail
  if (champEmail.value.trim() === '') {
    afficherErreur(champEmail, erreurEmail, 'Veuillez entrer votre adresse e-mail.');
    valide = false;
  } else if (!estEmailValide(champEmail.value.trim())) {
    afficherErreur(champEmail, erreurEmail, 'Format d\'e-mail invalide (ex: nom@domaine.com).');
    valide = false;
  } else {
    effacerErreur(champEmail, erreurEmail);
  }

  // Validation du message
  if (champMessage.value.trim() === '') {
    afficherErreur(champMessage, erreurMessage, 'Veuillez saisir votre message.');
    valide = false;
  } else if (champMessage.value.trim().length < 10) {
    afficherErreur(champMessage, erreurMessage, 'Votre message doit contenir au moins 10 caractères.');
    valide = false;
  } else {
    effacerErreur(champMessage, erreurMessage);
  }

  return valide;
}

// Écoute de la soumission du formulaire
formulaire.addEventListener('submit', function (e) {
  e.preventDefault();
  messageSucces.textContent = '';

  if (validerFormulaire()) {
    // Simulation d'un envoi réussi (pas de backend ici)
    messageSucces.textContent = 'Message envoyé avec succès ! Je vous répondrai très bientôt.';
    formulaire.reset();
    // Effacer le message de succès après 5 secondes
    setTimeout(function () {
      messageSucces.textContent = '';
    }, 5000);
  }
});

// Validation en temps réel (à la frappe)
champNom.addEventListener('input', function () {
  if (champNom.value.trim() !== '') {
    effacerErreur(champNom, erreurNom);
  }
});

champEmail.addEventListener('input', function () {
  if (estEmailValide(champEmail.value.trim())) {
    effacerErreur(champEmail, erreurEmail);
  }
});

champMessage.addEventListener('input', function () {
  if (champMessage.value.trim().length >= 10) {
    effacerErreur(champMessage, erreurMessage);
  }
});

const boutonHaut = document.getElementById('back-to-top');

// Afficher / masquer le bouton selon la position du scroll
window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    boutonHaut.classList.add('visible');
  } else {
    boutonHaut.classList.remove('visible');
  }
});

// Remonter en haut au clic
boutonHaut.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
