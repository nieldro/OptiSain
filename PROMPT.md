Construye el sitio web de OptiSain en esta carpeta. Lee primero `CLAUDE.md`, `contenido/servicios.md` y `contenido/textos-sitio.md`: ahí están la marca, los colores, las fuentes, el logo y todos los textos. Usa esos textos; no inventes cifras, clientes ni testimonios.

## Stack
- Astro (última versión estable) + TypeScript + Tailwind CSS, sitio estático.
- Three.js para la escena 3D, GSAP + ScrollTrigger para animaciones de scroll y Lenis para scroll suave.
- Carga Three.js solo en el hero y de forma diferida, para no afectar la velocidad.
- Mueve `marca/logo` y `marca/iconos` a `public/`.

## Estructura de la página (una sola página con anclas)
1. **Header fijo** con fondo translúcido y desenfoque (glassmorphism) que aparece al hacer scroll: logo, enlaces (Servicios, Cómo trabajamos, Por qué OptiSain, Preguntas, Contacto) y botón ámbar "Cotiza tu proyecto". Menú hamburguesa animado en celular. Barra fina ámbar arriba que muestra el progreso de lectura.
2. **Hero** a pantalla completa con un **planeta 3D en Three.js** inspirado en el logo: esfera gunmetal con brillo de borde (fresnel) en gainsboro, anillos inclinados con bandas gainsboro/silver y una línea ámbar fina, una luna pequeña ámbar orbitando y un campo de estrellas en partículas. El planeta gira lento, reacciona al mouse (parallax suave) y rota un poco más al hacer scroll. En celular, versión más liviana (menos partículas). Título con animación de entrada letra por letra o por palabras, y la palabra "órbita" en ámbar.
3. **Marquee** infinito con los servicios, separado por estrellas de 4 puntas.
4. **Servicios**: filtros por línea (Todos, Presencia web, Marca y crecimiento, Automatización e IA, Datos, Soporte) con transición animada. Tarjetas con **efecto 3D tilt** al pasar el mouse (perspectiva + reflejo de luz que sigue el cursor), ícono SVG por servicio, descripción, lista de lo que incluye y botón "Cotizar" que abre WhatsApp con el servicio en el mensaje. **Sin precios.** Debajo, los 4 combos como "Soluciones completas" en tarjetas destacadas con borde animado.
5. **Cómo trabajamos**: los 5 pasos unidos por una línea en forma de órbita que se dibuja con el scroll (SVG stroke animado); cada paso se ilumina al llegar.
6. **Por qué OptiSain**: 4 bloques con íconos animados y aparición escalonada.
7. **Banda de cierre** con anillos orbitales animados de fondo y botón "Escríbenos por WhatsApp" con efecto magnético.
8. **Preguntas frecuentes** en acordeón accesible (`details/summary` o botones con `aria-expanded`).
9. **Contacto**: formulario (nombre, WhatsApp, servicio, mensaje) con validación que al enviar abre `https://wa.me/WHATSAPP_NUMBER?text=...`. Muestra también correo e Instagram.
10. **Footer** con logo, enlaces y "© 2026 OptiSain. Hecho en Colombia."

## Animaciones y efectos (modernos pero profesionales)
- Aparición de secciones al hacer scroll (fade + desplazamiento corto, escalonado), sin que el contenido dependa de JS para verse.
- Cursor con halo suave en escritorio (desactivado en pantallas táctiles).
- Botones magnéticos y microinteracciones en hover.
- Ruido/grano sutil y degradados radiales gunmetal en el fondo para dar profundidad.
- Todo respeta `prefers-reduced-motion` (sin 3D animado, sin Lenis, sin parallax).

## SEO limpio
- `lang="es-CO"`, un solo H1, jerarquía H2/H3 correcta, HTML semántico (`header`, `nav`, `main`, `section`, `footer`).
- Title, meta description, canonical, Open Graph y Twitter Card con los textos de `contenido/textos-sitio.md`. Genera una imagen OG de 1200×630 con el logo sobre obsidian.
- JSON-LD: `ProfessionalService` (nombre, url, logo, areaServed Colombia, sameAs Instagram), `OfferCatalog` con los 15 servicios (sin precios) y `FAQPage` con las preguntas.
- `sitemap.xml` (con @astrojs/sitemap), `robots.txt`, favicons y `site.webmanifest`.
- Imágenes con `alt`, fuentes con preconnect y `display=swap`, scripts diferidos. Meta: Lighthouse ≥ 90 en móvil.

## Configuración
- Crea `src/config.ts` con `WHATSAPP_NUMBER`, `CONTACT_EMAIL`, `INSTAGRAM_URL` y `SITE_URL` usando los valores de ejemplo de `contenido/textos-sitio.md`, y úsalos en todo el sitio.

## Al terminar
1. Corre `npm run build` y corrige cualquier error.
2. Levanta `npm run preview` y revisa el sitio en escritorio y en celular (375 px).
3. Escribe en `README.md` cómo cambiar los datos de contacto y cómo publicar gratis en Vercel o Netlify.
4. Dime qué quedó hecho y qué datos me faltan por reemplazar.
