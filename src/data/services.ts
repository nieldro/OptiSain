export type ServiceLine =
  | 'presencia-web'
  | 'marca-crecimiento'
  | 'automatizacion-ia'
  | 'datos'
  | 'soporte';

export interface Service {
  slug: string;
  line: ServiceLine;
  name: string;
  summary: string;
  includes: string[];
  icon: string;
}

export interface Line {
  id: ServiceLine;
  label: string;
  tagline: string;
}

export const lines: Line[] = [
  { id: 'presencia-web', label: 'Presencia web', tagline: 'Lo que tu cliente ve primero.' },
  { id: 'marca-crecimiento', label: 'Marca y crecimiento', tagline: 'Que te encuentren y te recuerden.' },
  { id: 'automatizacion-ia', label: 'Automatización e IA', tagline: 'Que tu negocio trabaje solo.' },
  { id: 'datos', label: 'Datos', tagline: 'Decide con números, no con corazonadas.' },
  { id: 'soporte', label: 'Soporte', tagline: 'No te dejamos solo después de entregar.' },
];

export const services: Service[] = [
  {
    slug: 'landing-page',
    line: 'presencia-web',
    name: 'Landing page',
    summary: 'Una sola página enfocada en vender un producto o conseguir contactos. Ideal para campañas de publicidad.',
    includes: [
      'Diseño adaptado a tu marca y al celular',
      'Formulario y botón directo a WhatsApp',
      'Textos persuasivos que convierten',
      'Medición con Meta Pixel y Google Analytics',
    ],
    icon: 'rocket',
  },
  {
    slug: 'pagina-web-corporativa',
    line: 'presencia-web',
    name: 'Página web corporativa',
    summary: 'El sitio completo de tu empresa, fácil de actualizar por tu cuenta.',
    includes: [
      'De 5 a más de 15 páginas, con diseño a medida',
      'Blog autoadministrable',
      'SEO básico, velocidad optimizada y dos idiomas si lo necesitas',
      'Capacitación para que la manejes tú',
    ],
    icon: 'globe',
  },
  {
    slug: 'tienda-en-linea',
    line: 'presencia-web',
    name: 'Tienda en línea',
    summary: 'Tu e-commerce en Shopify o WooCommerce, listo para vender en Colombia.',
    includes: [
      'Pagos con PSE, Nequi, tarjeta, Wompi y Mercado Pago',
      'Envíos por ciudad o transportadora',
      'Cupones, carrito abandonado y correos automáticos',
      'Conexión con Instagram, Facebook y Google Shopping',
    ],
    icon: 'cart',
  },
  {
    slug: 'diseno-de-marca',
    line: 'marca-crecimiento',
    name: 'Diseño de marca',
    summary: 'Identidad visual para negocios que empiezan o se están renovando.',
    includes: [
      'Logo, paleta de color y tipografías',
      'Manual de marca y papelería',
      'Plantillas para redes sociales',
      'Posicionamiento y tono de voz',
    ],
    icon: 'brush',
  },
  {
    slug: 'publicidad-digital',
    line: 'marca-crecimiento',
    name: 'Publicidad digital',
    summary: 'Campañas en Meta (Facebook e Instagram), Google y TikTok que traen clientes, no solo "likes".',
    includes: [
      'Estrategia, montaje de campañas y remarketing',
      'Diseño de piezas y videos cortos',
      'Pruebas A/B continuas',
      'Reportes claros de resultados',
    ],
    icon: 'target',
  },
  {
    slug: 'gestion-de-redes-sociales',
    line: 'marca-crecimiento',
    name: 'Gestión de redes sociales',
    summary: 'Contenido constante y con estrategia para Instagram, Facebook y TikTok.',
    includes: [
      'Calendario de contenido mensual',
      'Publicaciones, historias y reels editados',
      'Textos y hashtags',
      'Respuesta a mensajes y comentarios',
    ],
    icon: 'chat',
  },
  {
    slug: 'seo-y-google-business',
    line: 'marca-crecimiento',
    name: 'SEO y Google Business',
    summary: 'Que tu negocio aparezca en Google sin pagar por cada clic.',
    includes: [
      'Auditoría técnica y palabras clave de tu sector',
      'Perfil de Google Business optimizado (SEO local)',
      'Artículos de blog y mejoras técnicas',
      'Reporte de posiciones',
    ],
    icon: 'search',
  },
  {
    slug: 'chatbots-con-ia',
    line: 'automatizacion-ia',
    name: 'Chatbots con IA',
    summary: 'Asistentes para WhatsApp, Instagram y tu web que responden, agendan y venden las 24 horas.',
    includes: [
      'Entrenados con la información de tu negocio',
      'Agendan citas y toman pedidos',
      'Pasan a un asesor humano cuando hace falta',
      'Conectados con tu CRM y catálogo',
    ],
    icon: 'bot',
  },
  {
    slug: 'automatizaciones',
    line: 'automatizacion-ia',
    name: 'Automatizaciones',
    summary: 'Flujos que conectan tus herramientas para que las tareas repetitivas se hagan solas.',
    includes: [
      'Formularios, CRM, correo, WhatsApp y facturación conectados',
      'Hechos con Make, Zapier o n8n',
      'Alertas cuando algo falla',
      'Documentación y capacitación',
    ],
    icon: 'flow',
  },
  {
    slug: 'integraciones-con-apis',
    line: 'automatizacion-ia',
    name: 'Integraciones con APIs',
    summary: 'Conectamos sistemas que no hablan entre sí: software contable, inventario, pasarelas de pago y plataformas propias.',
    includes: [
      'Sincronización en ambos sentidos',
      'Servidor propio y monitoreo cuando se requiere',
    ],
    icon: 'plug',
  },
  {
    slug: 'tableros-dashboards',
    line: 'datos',
    name: 'Tableros (dashboards)',
    summary: 'Tus ventas, clientes y operación en tiempo real, en Looker Studio o Power BI.',
    includes: [
      'Varias fuentes de datos en un solo lugar',
      'Actualización automática',
      'Tableros por área',
      'Capacitación al equipo',
    ],
    icon: 'chart',
  },
  {
    slug: 'analisis-de-datos',
    line: 'datos',
    name: 'Análisis de datos',
    summary: 'Entiende qué vende, quién compra y dónde se pierde plata.',
    includes: [
      'Diagnóstico de tus bases de datos',
      'Segmentación de clientes',
      'Informes con recomendaciones accionables',
      'Acompañamiento mensual',
    ],
    icon: 'magnifier',
  },
  {
    slug: 'mantenimiento-web',
    line: 'soporte',
    name: 'Mantenimiento web',
    summary: 'Tu sitio siempre actualizado, seguro y funcionando.',
    includes: [
      'Actualizaciones y copias de seguridad',
      'Monitoreo de caídas',
      'Horas de cambios al mes',
      'Soporte prioritario',
    ],
    icon: 'shield',
  },
  {
    slug: 'hosting-dominio-correo',
    line: 'soporte',
    name: 'Hosting, dominio y correo',
    summary: 'Nos encargamos de lo técnico para que no te enredes.',
    includes: [
      'Dominio .com o .co y certificado SSL',
      'Hosting rápido',
      'Correos corporativos (Google Workspace o Microsoft 365)',
    ],
    icon: 'server',
  },
  {
    slug: 'consultoria-y-capacitacion',
    line: 'soporte',
    name: 'Consultoría y capacitación',
    summary: 'Asesoría para digitalizar tu empresa y talleres para tu equipo.',
    includes: [
      'Diagnóstico de tu presencia digital',
      'Hoja de ruta de 90 días',
      'Talleres de IA, automatización y redes',
    ],
    icon: 'graduation',
  },
];

export interface Combo {
  name: string;
  description: string;
}

export const combos: Combo[] = [
  {
    name: 'Arranca',
    description: 'Marca básica + landing page + chatbot para WhatsApp. Para emprendedores que empiezan de cero.',
  },
  {
    name: 'Negocio Digital',
    description: 'Identidad de marca + web profesional + automatizaciones + 3 meses de mantenimiento.',
  },
  {
    name: 'Vende en línea',
    description: 'Tienda online + chatbot con IA + primer mes de publicidad + SEO local.',
  },
  {
    name: 'Datos al día',
    description: 'Dashboard + automatización que lo alimenta + análisis mensual.',
  },
];
