// Datos de contacto: cambia estos valores antes de publicar.
export const WHATSAPP_NUMBER = '573000000000'; // formato internacional sin "+" ni espacios, para wa.me
export const WHATSAPP_DISPLAY = '+57 300 000 0000';
export const CONTACT_EMAIL = 'hola@optisain.co';
export const INSTAGRAM_URL = 'https://instagram.com/optisain';
export const INSTAGRAM_HANDLE = '@optisain';
export const SITE_URL = 'https://optisain.co';
export const SITE_NAME = 'OptiSain';

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
