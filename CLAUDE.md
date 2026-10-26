# OptiSain · sitio web

Sitio de OptiSain, estudio de servicios digitales en Colombia (webs, tiendas, branding, publicidad, chatbots con IA, automatizaciones, dashboards y datos). Público: dueños de negocios en Colombia y LATAM. Idioma: español de Colombia (`lang="es-CO"`), tuteo.

## Contenido
- Servicios: `contenido/servicios.md` (15 servicios en 5 líneas + 4 combos). **Nunca mostrar precios.**
- Resto de textos, FAQ y SEO: `contenido/textos-sitio.md`.
- Datos de contacto aún no definidos: usar las constantes `WHATSAPP_NUMBER`, `CONTACT_EMAIL`, `INSTAGRAM_URL`, `SITE_URL` en un solo archivo de configuración (`src/config.ts`) para que se cambien en un lugar.

## Marca (no cambiar)
Colores (definir como variables CSS / tokens de Tailwind):
| Token | Hex | Uso |
|---|---|---|
| obsidian | #161516 | Fondo principal (~45%) |
| gunmetal | #2C4057 | Color de marca: tarjetas, bloques, planeta 3D (~25%) |
| gainsboro | #D3D8E2 | Títulos, texto principal y logo sobre oscuro |
| silver | #939BAA | Texto secundario |
| gray | #606A7A | Solo bordes, divisores e íconos. NUNCA texto sobre obsidian |
| amber | #FFB547 | Único acento (~5%): botones principales, palabras clave, brillos. Texto sobre ámbar siempre en obsidian |

Reglas: no agregar otros colores de marca. No usar ámbar sobre fondos claros. No poner gunmetal sobre obsidian para texto o logo.

Tipografía (Google Fonts, con `font-display: swap`): **Lexend** 600–700 para títulos, **Manrope** 400–600 para texto.

Logo: `marca/logo/` (SVG vectorizado). Sobre fondo oscuro usar `optisain-logo-gainsboro.svg`; el isotipo (solo planeta) para favicon y espacios pequeños. Íconos en `marca/iconos/`.

## Estilo visual
Oscuro, premium, tecnológico, con tema de órbita/Saturno (anillos, estrellas de 4 puntas como las del logo, trayectorias elípticas). Animaciones fluidas pero sobrias; nada de efectos que distraigan de leer.

## Requisitos técnicos
- Lighthouse ≥ 90 en Performance, Accesibilidad, Buenas prácticas y SEO (móvil).
- Contraste AA en todo el texto. Foco visible con teclado.
- Respetar `prefers-reduced-motion`: sin 3D animado ni scroll suave, contenido igual de completo.
- Si WebGL no está disponible, mostrar el logo SVG en lugar del planeta 3D.
- Todo el contenido visible sin JavaScript (las animaciones son mejora progresiva).
