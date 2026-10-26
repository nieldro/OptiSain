export interface Step {
  title: string;
  text: string;
}

export const steps: Step[] = [
  { title: 'Diagnóstico', text: 'Una videollamada de 15 minutos para entender tu negocio. Gratis.' },
  { title: 'Propuesta', text: 'Te enviamos alcance, tiempos y precio exacto. Sin sorpresas.' },
  { title: 'Construcción', text: 'Diseñamos y desarrollamos. Ves avances en cada etapa.' },
  { title: 'Lanzamiento', text: 'Publicamos, probamos todo y te enseñamos a usarlo.' },
  { title: 'Acompañamiento', text: 'Mantenimiento, mejoras y soporte cuando lo necesites.' },
];

export interface WhyPoint {
  title: string;
  text: string;
  icon: string;
}

export const whyPoints: WhyPoint[] = [
  {
    title: 'Todo en un solo lugar',
    text: 'Marca, web, publicidad, automatización y datos con un solo equipo.',
    icon: 'layers',
  },
  {
    title: 'Hecho para Colombia',
    text: 'Pagos con PSE, Nequi y tarjeta, facturación electrónica y soporte en tu horario.',
    icon: 'map',
  },
  {
    title: 'Te enseñamos a usarlo',
    text: 'Te entregamos tu proyecto funcionando y con capacitación.',
    icon: 'book',
  },
  {
    title: 'No te dejamos solo',
    text: 'Planes de mantenimiento y acompañamiento después del lanzamiento.',
    icon: 'heart',
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: '¿Cuánto cuesta un proyecto?',
    answer: 'Cada negocio es distinto. Después de un diagnóstico gratis de 15 minutos te enviamos una propuesta con precio exacto y sin costos ocultos.',
  },
  {
    question: '¿Cuánto tiempo toma?',
    answer: 'Depende del servicio. En la propuesta te damos una fecha de entrega concreta y te mostramos avances en cada etapa.',
  },
  {
    question: '¿Trabajan con negocios fuera de mi ciudad?',
    answer: 'Sí. Trabajamos de forma remota con negocios en toda Colombia y Latinoamérica.',
  },
  {
    question: '¿Podré actualizar mi página yo mismo?',
    answer: 'Sí. Entregamos sitios autoadministrables y te capacitamos para que hagas cambios sin depender de nadie.',
  },
  {
    question: '¿Qué medios de pago puede recibir mi tienda?',
    answer: 'PSE, Nequi, tarjetas de crédito y débito, Wompi y Mercado Pago, entre otros.',
  },
  {
    question: '¿Qué pasa después de entregar?',
    answer: 'Puedes quedarte con un plan de mantenimiento para que tu sitio siga seguro, actualizado y mejorando.',
  },
];

export const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-trabajamos', label: 'Cómo trabajamos' },
  { href: '#por-que-optisain', label: 'Por qué OptiSain' },
  { href: '#preguntas', label: 'Preguntas' },
  { href: '#contacto', label: 'Contacto' },
];
