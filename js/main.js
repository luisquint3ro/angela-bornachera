/* ==========================================================================
   Sitio: Pastora & Profeta Angela Bornachera — main.js
   Comportamiento de navegación (fondo al hacer scroll + menú móvil).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- WhatsApp ---
  const WHATSAPP_NUMBER = "573105217674";
  const WHATSAPP_MESSAGE = "Hola Pastora Angela, la contacto desde su página web.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  document.querySelectorAll("#whatsapp-link, #whatsapp-cta, #whatsapp-float").forEach((el) => {
    el.setAttribute("href", whatsappUrl);
  });

  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Año dinámico en el footer
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Videos: miniatura real con botón de reproducir sobre el iframe ---
  // El iframe de YouTube ya está incluido en el HTML (con su código completo);
  // la miniatura solo se quita al hacer clic para que el video se vea y se
  // reproduzca directamente ahí, en vez de mostrar un recuadro vacío.
  document.querySelectorAll(".video-embed__cover").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrap = btn.closest(".video-embed");
      const iframe = wrap ? wrap.querySelector("iframe") : null;
      if (iframe) {
        const src = iframe.getAttribute("src") || "";
        if (src && !/[?&]autoplay=1/.test(src)) {
          iframe.setAttribute("src", src + (src.includes("?") ? "&" : "?") + "autoplay=1");
        }
      }
      btn.classList.add("is-hidden");
    });
  });
});
