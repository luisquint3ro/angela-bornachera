/* ==========================================================================
   iLatina Premium Web Design — reveal.js
   Revelado de contenido al hacer scroll (patrón estilo Apple) + smooth
   scroll para anclas internas. Copia a js/main.js y no lo reinventes por
   sitio — solo agrega la clase "reveal" a los elementos que quieras animar.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal");

  // Escalona pequeños delays dentro de cada sección para que se sienta
  // como una cascada, no un parpadeo simultáneo.
  const groups = new Map();
  revealEls.forEach((el) => {
    const section = el.closest("section") || document.body;
    const list = groups.get(section) || [];
    list.push(el);
    groups.set(section, list);
  });
  groups.forEach((els) => {
    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  // Smooth scroll para anclas internas (#nav-links, botones "ver más", etc.)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Parallax sutil opcional para el fondo del hero (si existe .hero__bg)
  const heroBg = document.querySelector(".hero__bg");
  if (heroBg) {
    window.addEventListener(
      "scroll",
      () => {
        const offset = window.scrollY * 0.3;
        heroBg.style.transform = `translateY(${offset}px) scale(1.05)`;
      },
      { passive: true }
    );
  }
});
