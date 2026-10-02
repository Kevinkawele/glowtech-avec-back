
const header = document.querySelector("[data-header]");
const navigation = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = [...document.querySelectorAll("[data-nav] a")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  navigation?.classList.remove("is-open");
  menuToggle?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Ouvrir le menu");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = navigation?.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealElements = [...document.querySelectorAll("[data-reveal]")];

document.querySelectorAll("[data-reveal-group]").forEach((group) => {
  [...group.querySelectorAll(":scope > [data-reveal]")].forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${index * 90}ms`);
  });
});

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px" });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const navigationSections = navLinks
  .filter((link) => link.getAttribute("href")?.startsWith("#"))
  .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
  .filter(({ section }) => section);

if ("IntersectionObserver" in window && navigationSections.length) {
  const navigationObserver = new IntersectionObserver((entries) => {
    const visibleEntry = entries.find((entry) => entry.isIntersecting);
    if (!visibleEntry) return;

    navigationSections.forEach(({ link, section }) => {
      link.classList.toggle("active", section === visibleEntry.target);
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });

  navigationSections.forEach(({ section }) => navigationObserver.observe(section));
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const quoteForm = document.querySelector("[data-quote-form]");
const formMessage = document.querySelector("[data-form-message]");

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!quoteForm.checkValidity()) {
    quoteForm.reportValidity();
    return;
  }

  quoteForm.reset();
  if (formMessage) {
    formMessage.textContent = "Merci. Le formulaire est prêt à être connecté à l’équipe GLOW TECH pour recevoir votre demande.";
  }
});


// formulaire de contact
const contactForm = document.querySelector("[data-contact-form]");
const contactMessage = document.querySelector("[data-contact-message]");

// contactForm?.addEventListener("submit", (event) => {
//   event.preventDefault();

//   if (!contactForm.checkValidity()) {
//     contactForm.reportValidity();
//     return;
//   }

//   contactForm.reset();
//   if (contactMessage) {
//     contactMessage.textContent = "Merci. Le formulaire est prêt à être connecté à l’équipe GLOW TECH pour recevoir votre message.";
//   }
// });

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

  try {
    const response = await fetch('/avis/creer/', {
      method : "POST",
      headers: {"X-CSRFToken" : csrfToken},
      body: formData,
    })

    const data = await response.json();
    if (data.success){
      contactForm.reset();
      if (reviewMessage) reviewMessage.textContent = data.message;
    }else{
      if (reviewMessage) reviewMessage.textContent = "Merci de vérifierles champs formulaire";
    }
  } catch (error) {
    if (reviewMessage) reviewMessage.textContent = "Une erreur est survenue, réessayez plus tard";
  }

});

const testimonialSlider = document.querySelector("[data-testimonial-slider]");
const testimonialTrack = document.querySelector("[data-testimonial-track]");
const testimonialSlides = [...document.querySelectorAll(".testimonial-card")];
const testimonialPrevious = document.querySelector("[data-testimonial-prev]");
const testimonialNext = document.querySelector("[data-testimonial-next]");
const testimonialStatus = document.querySelector("[data-testimonial-status]");
let testimonialIndex = 0;
let testimonialTimer;

const updateTestimonialSlider = () => {
  if (!testimonialTrack || !testimonialSlides.length) return;

  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  if (testimonialStatus) {
    testimonialStatus.textContent = `Témoignage ${testimonialIndex + 1} sur ${testimonialSlides.length}`;
  }
};

const moveTestimonialSlider = (direction) => {
  testimonialIndex = (testimonialIndex + direction + testimonialSlides.length) % testimonialSlides.length;
  updateTestimonialSlider();
};

const stopTestimonialAutoplay = () => {
  window.clearInterval(testimonialTimer);
};

const startTestimonialAutoplay = () => {
  if (reducedMotion || testimonialSlides.length < 2) return;

  stopTestimonialAutoplay();
  testimonialTimer = window.setInterval(() => moveTestimonialSlider(1), 6000);
};

if (testimonialSlider && testimonialSlides.length) {
  testimonialPrevious?.addEventListener("click", () => {
    moveTestimonialSlider(-1);
    startTestimonialAutoplay();
  });
  testimonialNext?.addEventListener("click", () => {
    moveTestimonialSlider(1);
    startTestimonialAutoplay();
  });
  testimonialSlider.addEventListener("pointerenter", stopTestimonialAutoplay);
  testimonialSlider.addEventListener("pointerleave", startTestimonialAutoplay);
  testimonialSlider.addEventListener("focusin", stopTestimonialAutoplay);
  testimonialSlider.addEventListener("focusout", startTestimonialAutoplay);
  updateTestimonialSlider();
  startTestimonialAutoplay();
}

const reviewDialog = document.querySelector("[data-review-dialog]");
const openReviewButton = document.querySelector("[data-open-review]");
const closeReviewButton = document.querySelector("[data-close-review]");
const reviewForm = document.querySelector("[data-review-form]");
const reviewMessage = document.querySelector("[data-review-message]");

openReviewButton?.addEventListener("click", () => {
  reviewDialog?.showModal();
});

closeReviewButton?.addEventListener("click", () => reviewDialog?.close());

reviewDialog?.addEventListener("click", (event) => {
  if (event.target === reviewDialog) reviewDialog.close();
});

reviewForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!reviewForm.checkValidity()) {
    reviewForm.reportValidity();
    return;
  }

  const formData = new FormData(reviewForm);
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

  try {
    const response = await fetch('/avis/creer/', {
      method : "POST",
      headers: {"X-CSRFToken" : csrfToken},
      body: formData,
    })

    const data = await response.json();
    if (data.success){
      reviewForm.reset();
      if (reviewMessage) reviewMessage.textContent = data.message;
    }else{
      if (reviewMessage) reviewMessage.textContent = "Merci de vérifierles champsfu formulaire";
    }
  } catch (error) {
    if (reviewMessage) reviewMessage.textContent = "Une erreur est survenue, réessayez plus tard";
  }

});

const parallaxSections = [...document.querySelectorAll("[data-parallax]")];

if (!reducedMotion && window.matchMedia("(min-width: 821px)").matches) {
  const updateParallax = () => {
    parallaxSections.forEach((section) => {
      const bounds = section.getBoundingClientRect();
      const offset = (bounds.top + bounds.height / 2 - window.innerHeight / 2) * -0.08;
      section.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    });
  };

  window.addEventListener("scroll", updateParallax, { passive: true });
  updateParallax();
}

const galleryDialog = document.querySelector("[data-gallery-dialog]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryTitle = document.querySelector("[data-gallery-title]");
const galleryCaption = document.querySelector("[data-gallery-caption]");
const galleryCount = document.querySelector("[data-gallery-count]");
const galleryCollections = {
  construction: {
    title: "Complexe résidentiel moderne",
    images: [
      { src: "images/services/IMG-20260901-WA0059.jpg", alt: "Vue du projet de construction résidentielle" },
      { src: "images/services/about.jpg", alt: "Intervention sur le chantier de construction" },
      { src: "images/services/IMG-20260901-WA0076.jpg", alt: "Détail d'une intervention technique du projet" },
    ],
  },
  electricite: {
    title: "Installation électrique industrielle",
    images: [
      { src: "images/services/F5D7EAF7-3B98-4ECA-B83D-19BA134AF3D3.png", alt: "Installation électrique industrielle" },
      { src: "images/services/IMG-20260901-WA0076.jpg", alt: "Équipement industriel en intervention" },
      { src: "images/services/IMG-20260901-WA0059.jpg", alt: "Travaux techniques sur site" },
    ],
  },
  solaire: {
    title: "Installation photovoltaïque",
    images: [
      { src: "images/services/1785301793778.jpg", alt: "Technicien installant des panneaux solaires" },
      { src: "images/services/IMG-20260901-WA0054.jpg", alt: "Équipement technique installé sur site" },
      { src: "images/services/about.jpg", alt: "Intervention technique GLOW TECH" },
    ],
  },
  maintenance: {
    title: "Intervention électromécanique",
    images: [
      { src: "images/services/IMG-20260901-WA0076.jpg", alt: "Maintenance d'un équipement industriel" },
      { src: "images/services/F5D7EAF7-3B98-4ECA-B83D-19BA134AF3D3.png", alt: "Équipement électrique en maintenance" },
      { src: "images/services/IMG-20260901-WA0054.jpg", alt: "Équipement de climatisation en maintenance" },
    ],
  },
};
let activeGallery;
let activeGalleryIndex = 0;

const updateGallery = () => {
  const collection = galleryCollections[activeGallery];
  if (!collection || !galleryImage) return;

  const image = collection.images[activeGalleryIndex];
  galleryImage.src = image.src;
  galleryImage.alt = image.alt;
  if (galleryTitle) galleryTitle.textContent = collection.title;
  if (galleryCaption) galleryCaption.textContent = image.alt;
  if (galleryCount) galleryCount.textContent = `${activeGalleryIndex + 1} / ${collection.images.length}`;
};

document.querySelectorAll("[data-gallery-open]").forEach((button) => {
  button.addEventListener("click", () => {
    activeGallery = button.dataset.gallery;
    activeGalleryIndex = 0;
    updateGallery();
    galleryDialog?.showModal();
  });
});

document.querySelector("[data-gallery-close]")?.addEventListener("click", () => galleryDialog?.close());

const moveGallery = (direction) => {
  const collection = galleryCollections[activeGallery];
  if (!collection) return;

  activeGalleryIndex = (activeGalleryIndex + direction + collection.images.length) % collection.images.length;
  updateGallery();
};

document.querySelector("[data-gallery-previous]")?.addEventListener("click", () => moveGallery(-1));
document.querySelector("[data-gallery-next]")?.addEventListener("click", () => moveGallery(1));

galleryDialog?.addEventListener("click", (event) => {
  if (event.target === galleryDialog) galleryDialog.close();
});

galleryDialog?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});

document.querySelectorAll("[data-expand-cards]").forEach((button) => {
  const target = document.getElementById(button.dataset.expandTarget);
  if (!target) return;

  button.addEventListener("click", () => {
    const expanded = target.classList.toggle("is-expanded");
    button.setAttribute("aria-expanded", String(expanded));
    button.innerHTML = expanded
      ? 'Voir moins <i class="fas fa-arrow-up" aria-hidden="true"></i>'
      : `Voir plus${target.id === "services-list" ? " de services" : " de réalisations"} <i class="fas fa-arrow-down" aria-hidden="true"></i>`;
  });
});
