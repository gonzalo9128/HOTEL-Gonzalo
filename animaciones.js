// =============================================
// ANIMACIONES JAVASCRIPT — Hotel Villa Elciego
// =============================================

// ── 1. IntersectionObserver: revela elementos al hacer scroll ──
// Afecta a: títulos de sección (.section-title-anim) y cards (.card-anim)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // solo una vez
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section-title-anim, .card-anim').forEach(el => {
  observer.observe(el);
});

// ── 2. Contadores animados en precios de habitaciones ──
// Sube el número desde 0 hasta el valor real al aparecer en pantalla
function animarContador(el, destino, duracion = 1200) {
  let inicio = 0;
  const paso = duracion / destino;
  const timer = setInterval(() => {
    inicio++;
    el.textContent = inicio + '€';
    if (inicio >= destino) clearInterval(timer);
  }, paso);
}

const precioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const destino = parseInt(entry.target.dataset.precio);
      animarContador(entry.target, destino);
      precioObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.precio-num').forEach(el => {
  precioObserver.observe(el);
});

// ── 3. Barras de valoración animadas en instalaciones ──
// Se activan al hacer scroll hasta la sección #instalaciones
const barraObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.barra-prog-fill').forEach(fill => {
        const target = fill.dataset.valor;
        setTimeout(() => { fill.style.width = target; }, 200);
      });
      barraObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const secInstalaciones = document.querySelector('#instalaciones');
if (secInstalaciones) barraObserver.observe(secInstalaciones);

// ── 4. Toast de confirmación al enviar el formulario de disponibilidad ──
const form = document.querySelector('#hero form');
const toast = document.getElementById('toast-reserva');

if (form && toast) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  });
}
