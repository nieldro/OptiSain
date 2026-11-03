# Páginas legales

Las páginas `/privacidad/`, `/terminos/` y `/cookies/` están escritas para una persona natural en Colombia que vende servicios digitales por WhatsApp. **No son asesoría jurídica**: conviene que un abogado las revise antes de crecer o cobrar a muchos clientes.

## Quién figura como responsable

Los datos salen de `src/config.ts`:

| Constante | Uso |
|---|---|
| `LEGAL_HOLDER` | Nombre de quien responde (persona natural; OptiSain es nombre comercial). |
| `LEGAL_ID` | Cédula o NIT. |
| `LEGAL_CITY` | Ciudad de domicilio. Hoy solo «Colombia». |
| `LEGAL_EMAIL` | Correo para peticiones sobre datos. Si queda vacío se atiende por WhatsApp. |
| `LEGAL_UPDATED` | Fecha que se muestra como «Última actualización». |

Las líneas vacías no se muestran. Si cambias el texto de alguna página, actualiza `LEGAL_UPDATED`.

## Base legal usada

- **Datos personales:** Ley 1581 de 2012 y Decreto 1377 de 2013 (habeas data). El formulario de contacto exige marcar una casilla de autorización antes de abrir WhatsApp.
- **Retracto en ventas a distancia:** Ley 1480 de 2011, art. 47 (cinco días hábiles).
- **Horario de contacto comercial:** Ley 2300 de 2023, como buena práctica (lunes a viernes de 7:00 a 19:00, sábados de 8:00 a 15:00).

## Cookies

El sitio no usa cookies ni almacenamiento local y no hace peticiones a terceros (las tipografías van incluidas). Por eso no hay aviso de cookies. `npm run check` falla si algún HTML apunta a un servidor que no sea WhatsApp o el propio dominio.

Si algún día se agrega analítica, píxeles o mapas incrustados, hay que añadir el aviso con opción de rechazar y actualizar `/cookies/` y `/privacidad/`.

## Precios

Los precios de los planes se muestran **sin IVA**. Si Daniel pasa a ser responsable de IVA, hay que cambiar la nota de la sección de planes y `/terminos/`.
