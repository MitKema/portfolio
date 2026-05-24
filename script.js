/* =====================================================
   NAVEGACIÓN ACTIVA + SCROLL REVEAL
   con IntersectionObserver

   ¿Por qué no usar el evento 'scroll'?
   El evento 'scroll' se dispara decenas de veces por
   segundo. Si dentro calculás posiciones con
   getBoundingClientRect(), el navegador recalcula el
   layout en cada disparo → puede hacer la página lenta
   (se llama "layout thrashing").

   IntersectionObserver es la solución moderna: el
   navegador te avisa SOLO cuando un elemento entra o
   sale de la pantalla, sin trabajo extra de tu parte.
   ===================================================== */


/* ── 1. NAVBAR ACTIVO ────────────────────────────── */

/* querySelectorAll devuelve una NodeList con todos los
   elementos que coincidan con el selector CSS. */
const secciones = document.querySelectorAll('section[id]');
const linksNav  = document.querySelectorAll('.nav-links a');

const observerNav = new IntersectionObserver(
  (entries) => {
    /* entries: array de cambios detectados.
       Si dos secciones cambian a la vez, hay dos entradas. */
    entries.forEach((entry) => {

      /* isIntersecting: true cuando la sección está visible,
         false cuando sale de la pantalla. */
      if (entry.isIntersecting) {

        /* Removemos 'active' de todos los links primero */
        linksNav.forEach((link) => link.classList.remove('active'));

        /* Buscamos el link cuyo href coincida con el id de la sección.
           Ejemplo: si entry.target.id es "about", buscamos a[href="#about"] */
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
    /* threshold: qué porcentaje de la sección tiene que ser visible
       para que el callback se dispare.
       0.3 = 30% visible → el link cambia cuando ya ves bastante la sección. */
    threshold: 0.3,
  }
);

secciones.forEach((sec) => observerNav.observe(sec));


/* ── 2. SCROLL REVEAL ────────────────────────────── */

/* Seleccionamos todos los elementos con la clase "reveal".
   En el CSS, estos elementos empiezan invisibles (opacity: 0)
   y desplazados 24px hacia abajo. */
const elementosReveal = document.querySelectorAll('.reveal');

const observerReveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        /* Agregar "visible" dispara la transición CSS:
           el elemento aparece suavemente desde abajo. */
        entry.target.classList.add('visible');

        /* unobserve: dejamos de observar el elemento una vez que ya apareció.
           No tiene sentido seguir observando algo que ya es visible.
           Esto libera recursos del navegador. */
        observerReveal.unobserve(entry.target);
      }
    });
  },
  {
    /* threshold: 0.15 = el elemento empieza a aparecer cuando el 15%
       ya es visible. Un valor más bajo hace que aparezca más temprano. */
    threshold: 0.15,
  }
);

elementosReveal.forEach((el) => observerReveal.observe(el));
