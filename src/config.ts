// Datos de contacto: cambia estos valores antes de publicar.
export const WHATSAPP_NUMBER = '573052027517'; // formato internacional sin "+" ni espacios, para wa.me
export const WHATSAPP_DISPLAY = '+57 305 202 7517';
export const CONTACT_EMAIL = 'hola@optisain.co';
export const INSTAGRAM_URL = 'https://instagram.com/optisain';
export const INSTAGRAM_HANDLE = '@optisain';
export const SITE_URL = 'https://optisain.35.196.253.146.sslip.io'; // sin dominio propio por ahora (31-oct-2026)
export const SITE_NAME = 'OptiSain';

// Datos del responsable para las páginas legales (privacidad, términos, cookies).
// Las líneas vacías no se muestran: completa nombre, documento, ciudad y correo cuando los tengas.
export const LEGAL_HOLDER = 'Daniel Alejandro Páez Torres'; // persona natural; OptiSain es su nombre comercial
export const LEGAL_ID = 'C.C. 1012318460'; // cédula o NIT
export const LEGAL_CITY = 'Colombia'; // ciudad de domicilio, p. ej. 'Bogotá, Colombia'
export const LEGAL_EMAIL = ''; // correo para peticiones de datos; mientras esté vacío se atiende por WhatsApp
export const LEGAL_UPDATED = '31 de octubre de 2026';

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
