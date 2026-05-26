const secciones = document.querySelectorAll('section[id]');
const linksNav  = document.querySelectorAll('.nav-links a');

const observerNav = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        linksNav.forEach((link) => link.classList.remove('active'));

        const linkActivo = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );

        if (linkActivo) {
          linkActivo.classList.add('active');
        }
      }
    });
  },
  {
    threshold: 0.3,
  }
);

secciones.forEach((sec) => observerNav.observe(sec));


const elementosReveal = document.querySelectorAll('.reveal');

const observerReveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerReveal.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

elementosReveal.forEach((el) => observerReveal.observe(el));
