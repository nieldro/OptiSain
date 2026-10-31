// Planes de páginas web. Precios en pesos colombianos (COP), tomados de propuesta-optisain.pdf.
export interface Plan {
  id: string;
  name: string;
  cta?: string; // texto del botón si no sirve "Quiero el <nombre>"
  tagline: string;
  price: number; // pago único del primer año
  separate: number; // lo que costaría contratar cada cosa por separado
  renewal: number; // renovación anual desde el año 2
  downPayment: number; // cuota inicial del plan en cuotas
  monthly: number; // mensualidad x 12
  delivery: string;
  features: string[];
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'esencial',
    name: 'Esencial',
    tagline: 'Para que te encuentren y te escriban directo al WhatsApp.',
    price: 1190000,
    separate: 2250000,
    renewal: 690000,
    downPayment: 390000,
    monthly: 79000,
    delivery: 'Lista en 7 días hábiles',
    features: [
      'Página de una sección, hecha para vender',
      'Botón de WhatsApp y formulario',
      'Dominio, hosting y candado de seguridad',
      'Correo con tu nombre de negocio',
      '12 meses de mantenimiento',
    ],
  },
  {
    id: 'empresarial',
    name: 'Empresarial',
    tagline: 'Para verte como una empresa sólida y aparecer en Google.',
    price: 2290000,
    separate: 3700000,
    renewal: 990000,
    downPayment: 690000,
    monthly: 149000,
    delivery: 'Lista en 15 días hábiles',
    features: [
      'Web de hasta 5 páginas + blog',
      'Google Business y Analytics conectados',
      'Dominio, hosting y candado de seguridad',
      'Correos con tu dominio para tu equipo',
      '12 meses de mantenimiento',
    ],
  },
  {
    id: 'tienda',
    name: 'Tienda en línea',
    cta: 'Quiero mi tienda',
    tagline: 'Para vender y cobrar en línea las 24 horas.',
    price: 3990000,
    separate: 5500000,
    renewal: 1490000,
    downPayment: 990000,
    monthly: 269000,
    delivery: 'Lista en 25 días hábiles',
    featured: true,
    features: [
      'Tienda con hasta 50 productos',
      'Pagos con PSE, Nequi y tarjeta',
      'Envíos por ciudad o transportadora',
      'Dominio, hosting y correos',
      '12 meses de mantenimiento',
    ],
  },
];

export const included: { title: string; text: string }[] = [
  { title: 'Se ve bien en el celular', text: 'Diseño a la medida de tu marca.' },
  { title: 'Dominio propio', text: 'tunegocio.com o .co por un año.' },
  { title: 'Hosting rápido', text: 'Tu página siempre en línea.' },
  { title: 'Candado de seguridad', text: 'Certificado SSL activo.' },
  { title: 'Correos con tu marca', text: 'contacto@tunegocio.com' },
  { title: 'Mantenimiento 12 meses', text: 'Actualizaciones, copias y un cambio al mes.' },
  { title: 'Google conectado', text: 'Google Business y Analytics.' },
  { title: 'Te enseñamos a usarla', text: 'Cambia textos y fotos tú mismo.' },
];

export const planSteps: { title: string; text: string }[] = [
  { title: 'Hablemos', text: 'Escríbenos por WhatsApp o agenda una reunión corta, virtual o presencial. Resolvemos tus dudas y elegimos el plan juntos.' },
  { title: 'Separa tu cupo', text: 'Pagas el 50 % y nos mandas tu logo, fotos y datos. Si no tienes textos, los escribimos nosotros.' },
  { title: 'Revisa y publica', text: 'Te mostramos la página, ajustamos lo que quieras (2 rondas), pagas el resto y sale al aire.' },
];

export const paymentMethods = 'Transferencia, Bre-B, Nequi, Daviplata, tarjeta o PSE';

const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
export const formatCop = (n: number): string => cop.format(n).replace(/\s/g, '');
export const installmentsTotal = (p: Plan): number => p.downPayment + p.monthly * 12;
