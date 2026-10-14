/* =========================================================
   js/main.js - Lógica Global e Interactividad
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar Componentes (Navbar y Footer) dinámicamente si existen los contenedores
  cargarComponente("#navbar-container", "components/navbar.html");
  cargarComponente("#footer-container", "components/footer.html");

  // 2. Inicializar AOS (Animaciones al hacer Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  // 3. Inicializar Swiper (Carrusel de Opiniones/Testimonios)
  if (typeof Swiper !== "undefined" && document.querySelector(".swiper-opiniones")) {
    new Swiper(".swiper-opiniones", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  // 4. Inicializar GLightbox (Visor de fotos ampliadas para Proyectos)
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true
    });
  }

  // 5. Contadores Animados para el Bloque de Cifras
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0) {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          let count = 0;
          const speed = target / 50;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, 30);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
          obs.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  // 6. Deslizador / Comparador "Antes y Después" (JS Puro)
  const baSliders = document.querySelectorAll(".ba-slider");
  baSliders.forEach(container => {
    const slider = container.querySelector(".ba-slider-range");
    const beforeImg = container.querySelector(".ba-before");

    if (slider && beforeImg) {
      slider.addEventListener("input", (e) => {
        beforeImg.style.width = `${e.target.value}%`;
      });
    }
  });

  // 7. Navbar con efecto Scroll y Botón "Volver arriba"
  const navbar = document.querySelector(".navbar");
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add("navbar-scrolled", "shadow");
      if (backToTopBtn) backToTopBtn.classList.remove("d-none");
    } else {
      if (navbar) navbar.classList.remove("navbar-scrolled", "shadow");
      if (backToTopBtn) backToTopBtn.classList.add("d-none");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// Función auxiliar para cargar componentes HTML
function cargarComponente(selector, url) {
  const elemento = document.querySelector(selector);
  if (elemento) {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Error al cargar ${url}`);
        return response.text();
      })
      .then(html => {
        elemento.innerHTML = html;
      })
      .catch(error => console.error(error));
  }
}

// Función auxiliar para cargar componentes HTML de forma suave
function cargarComponente(selector, url) {
  const elemento = document.querySelector(selector);
  if (elemento) {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Error al cargar ${url}`);
        return response.text();
      })
      .then(html => {
        elemento.innerHTML = html;
        // Añadir un pequeño retraso para asegurar que el DOM lo procese y aplicar la clase de transición
        setTimeout(() => {
          elemento.classList.add("loaded");
        }, 50);
      })
      .catch(error => console.error(error));
  }
}