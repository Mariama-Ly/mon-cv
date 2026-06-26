document.addEventListener('DOMContentLoaded', function () {

  /* 1. MODE SOMBRE / CLAIR */
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    function appliquerTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    }
    appliquerTheme(localStorage.getItem('theme') || 'light');
    themeToggle.addEventListener('click', function () {
      var estSombre = document.body.classList.contains('dark-mode');
      var nouveauTheme = estSombre ? 'light' : 'dark';
      appliquerTheme(nouveauTheme);
      localStorage.setItem('theme', nouveauTheme);
    });
  }

  /* 2. MENU HAMBURGER */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (lien) {
      lien.addEventListener('click', function (e) {
        var href = lien.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          var cible = document.querySelector(href);
          if (cible) {
            var navHeight = document.getElementById('navbar').offsetHeight;
            window.scrollTo({ top: cible.getBoundingClientRect().top + window.scrollY - navHeight, behavior: 'smooth' });
          }
        }
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  /* 3. BARRES DE COMPÉTENCES */
  var skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length > 0) {
    var observer = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.style.width = entree.target.getAttribute('data-width') + '%';
          observer.unobserve(entree.target);
        }
      });
    }, { threshold: 0.3 });
    skillFills.forEach(function (b) { observer.observe(b); });
  }

  /* 4. FORMULAIRE DE CONTACT */
  var formulaire = document.getElementById('contact-form');
  if (formulaire) {
    function estEmailValide(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    formulaire.addEventListener('submit', function (e) {
      e.preventDefault();
      var nom = document.getElementById('nom');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var succes = document.getElementById('form-success');
      var valide = true;

      if (nom && nom.value.trim() === '') { nom.classList.add('error'); valide = false; } 
      else if (nom) { nom.classList.remove('error'); }

      if (email && !estEmailValide(email.value.trim())) { email.classList.add('error'); valide = false; } 
      else if (email) { email.classList.remove('error'); }

      if (message && message.value.trim().length < 10) { message.classList.add('error'); valide = false; } 
      else if (message) { message.classList.remove('error'); }

      if (valide && succes) {
        succes.textContent = 'Message envoyé avec succès !';
        formulaire.reset();
        setTimeout(function () { succes.textContent = ''; }, 5000);
      }
    });
  }

  /* 5. BOUTON RETOUR EN HAUT */
  var boutonHaut = document.getElementById('back-to-top');
  if (boutonHaut) {
    window.addEventListener('scroll', function () {
      boutonHaut.classList.toggle('visible', window.scrollY > 400);
    });
    boutonHaut.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 6. QR CODE */
  var conteneurQR = document.getElementById('qr-footer');
  if (conteneurQR && typeof QRCode !== 'undefined') {
    new QRCode(conteneurQR, {
      text: 'https://Mariama-Ly.github.io/mon-cv/',
      width: 120,
      height: 120,
      colorDark: '#8B5A7A',
      colorLight: '#F7F0F4',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

});

  var btnTelecharger = document.getElementById('btn-telecharger-qr');
  if (btnTelecharger) {
    btnTelecharger.addEventListener('click', function () {
      var canvas = conteneurQR.querySelector('canvas');
      if (canvas) {
        var lien = document.createElement('a');
        lien.download = 'qr-cv-mariama-ly.png';
        lien.href = canvas.toDataURL('image/png');
        lien.click();
      }
    });
  }