/* ==========================================================================
   iLatina Premium Web Design — slider.js
   Slider/carrusel ligero sin dependencias, para testimonios, galerías, o
   rotar mensajes en el hero. Usa las clases de slider.css (dentro de
   base.css). Copia a js/slider.js e inicializa con:

   <div class="slider" data-slider>
     <div class="slider__track">
       <div class="slider__slide">...</div>
       <div class="slider__slide">...</div>
     </div>
     <button class="slider__arrow slider__arrow--prev" data-slider-prev>‹</button>
     <button class="slider__arrow slider__arrow--next" data-slider-next>›</button>
     <div class="slider__dots" data-slider-dots></div>
   </div>

   Opcional: agrega data-autoplay="4000" en .slider para que rote sola
   (en ms). Respeta prefers-reduced-motion: si el usuario lo tiene activado,
   el autoplay no arranca (pero prev/next/swipe siguen funcionando).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-slider]").forEach((root) => {
    const track = root.querySelector(".slider__track");
    const slides = Array.from(track.children);
    const dotsWrap = root.querySelector("[data-slider-dots]");
    const prevBtn = root.querySelector("[data-slider-prev]");
    const nextBtn = root.querySelector("[data-slider-next]");
    let index = 0;
    let autoplayTimer = null;

    // Construir los puntos de navegación
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "slider__dot";
        dot.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((dot, i) => {
          dot.classList.toggle("is-active", i === index);
        });
      }
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    if (nextBtn) nextBtn.addEventListener("click", () => { next(); restartAutoplay(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restartAutoplay(); });

    // Swipe táctil
    let startX = 0;
    track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) {
        diff < 0 ? next() : prev();
        restartAutoplay();
      }
    }, { passive: true });

    // Autoplay opcional (se detiene con hover y respeta reduced-motion)
    const autoplayMs = parseInt(root.dataset.autoplay || "0", 10);
    function startAutoplay() {
      if (!autoplayMs || reduceMotion) return;
      autoplayTimer = setInterval(next, autoplayMs);
    }
    function restartAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      startAutoplay();
    }
    root.addEventListener("mouseenter", () => autoplayTimer && clearInterval(autoplayTimer));
    root.addEventListener("mouseleave", startAutoplay);

    update();
    startAutoplay();
  });
});
