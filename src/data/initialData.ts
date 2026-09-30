import { Product, Order, Customer, ActiveCart, DiscountCoupon } from '../types';
import { MEDICAL_IMAGES } from '../utils/productImages';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    sku: 'LAP-MARY-533',
    name: 'Pinza Laparoscópica Maryland Curva 5mm x 330mm',
    category: 'laparoscopia',
    brand: 'Metzen Medical',
    specialty: 'Cirugía General y Laparoscópica',
    price: 3850,
    comparePrice: 4200,
    stock: 14,
    minStockThreshold: 4,
    presentation: 'Pieza individual reusable en autoclave',
    diameterMm: 5,
    lengthMm: 330,
    cofePristReg: '0418R2021 SSA',
    sterilization: 'Reutilizable Autoclavable (134°C)',
    description: 'Pinza de disección curva Maryland con mandíbulas de doble acción, giro rotatorio de 360 grados y conector aislado para electrocirugía monopolar. Acero inoxidable quirúrgico alemán templado.',
    features: [
      'Doble acción de mandíbula con microdentado atraumático',
      'Rotación continua de 360° mediante dial ergonómico',
      'Puerto de irrigación y lavado Luer-Lock desmontable',
      'Aislamiento de teflón de alta resistencia a 3.5 kV'
    ],
    image: MEDICAL_IMAGES.maryland,
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'prod-002',
    sku: 'LAP-METZ-533',
    name: 'Tijera Quirúrgica Laparoscópica Metzenbaum Curva 5mm x 330mm',
    category: 'laparoscopia',
    brand: 'Metzen Medical',
    specialty: 'Cirugía General y Ginecológica',
    price: 4250,
    comparePrice: 4600,
    stock: 9,
    minStockThreshold: 3,
    presentation: 'Pieza individual reusable en autoclave',
    diameterMm: 5,
    lengthMm: 330,
    cofePristReg: '0419R2021 SSA',
    sterilization: 'Reutilizable Autoclavable (134°C)',
    description: 'Tijera curva Metzenbaum de alta precisión con filos templados de tungsteno. Proporciona corte limpio y coagulación monopolar homogénea en tejidos delicados sin deshilachado.',
    features: [
      'Filo con inserto microafilado para corte certero de vasos y fascia',
      'Mecanismo de doble cuchilla de fricción balanceada',
      'Conexión monopolar protegida con cubierta de polímero',
      'Empuñadura axial ergonómica sin trinquete para control fino'
    ],
    image: MEDICAL_IMAGES.tijerasMetzenbaum,
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    reviewsCount: 29
  },
  {
    id: 'prod-003',
    sku: 'LAP-GRASP-533',
    name: 'Pinza Grasper de Tracción Diente de Ratón 2x3 5mm x 330mm',
    category: 'laparoscopia',
    brand: 'Scope QX',
    specialty: 'Cirugía General y Colecistectomía',
    price: 3650,
    comparePrice: 3950,
    stock: 18,
    minStockThreshold: 5,
    presentation: 'Pieza individual reusable en autoclave',
    diameterMm: 5,
    lengthMm: 330,
    cofePristReg: '1102C2020 SSA',
    sterilization: 'Reutilizable Autoclavable (134°C)',
    description: 'Pinza de fuerte agarre con dientes entrelazados tipo diente de ratón 2x3. Diseñada para sujeción firme del fondo de vesícula biliar o tracción de estructuras resistentes.',
    features: [
      'Mandíbula de agarre profundo con trinquete de bloqueo ajustable',
      'Desenganche suave con una sola mano',
      'Vástago rígido de 5mm con tratamiento antirreflejante mate'
    ],
    image: MEDICAL_IMAGES.grasper,
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    reviewsCount: 19
  },
  {
    id: 'prod-004',
    sku: 'LAP-BABC-533',
    name: 'Pinza Laparoscópica Babcock Atraumática 5mm x 330mm',
    category: 'laparoscopia',
    brand: 'Scope QX',
    specialty: 'Cirugía Bariátrica y Colorrectal',
    price: 3900,
    comparePrice: 4300,
    stock: 11,
    minStockThreshold: 4,
    presentation: 'Pieza individual reusable en autoclave',
    diameterMm: 5,
    lengthMm: 330,
    cofePristReg: '1103C2020 SSA',
    sterilization: 'Reutilizable Autoclavable (134°C)',
    description: 'Pinza Babcock laparoscópica diseñada para manipular asas intestinales, trompas de Falopio, estómago y apéndice sin lesionar la serosa o irrigación sanguínea.',
    features: [
      'Ventanas fenestradas atraumáticas con bordes pulidos',
      'Cremallera de retención progresiva regulable',
      'Giro completo del cabezal 360°'
    ],
    image: MEDICAL_IMAGES.babcock,
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 22
  },
  {
    id: 'prod-005',
    sku: 'ENG-ENDO-60A',
    name: 'Engrapadora Endoscópica Lineal Cortante Articulada 60mm',
    category: 'engrapado',
    brand: 'Scope QX',
    specialty: 'Cirugía Bariátrica, Tórax y Colorrectal',
    price: 9400,
    comparePrice: 10800,
    stock: 7,
    minStockThreshold: 3,
    presentation: 'Pieza estéril desechable en empaque blister',
    diameterMm: 12,
    lengthMm: 440,
    cofePristReg: '2194C2022 SSA',
    sterilization: 'Estéril Desechable (ETO)',
    description: 'Engrapadora quirúrgica endoscópica articulada hasta 45 grados en ambas direcciones. Disparo balanceado con retroceso automático de cuchilla y sistema de seguridad que impide el disparo en vacío.',
    features: [
      'Articulación precisa de 45° a izquierda y derecha con clic de fijación',
      'Compatible con recargas de titanio de 60mm (blanca, azul, oro y verde)',
      'Mango ergonómico con botón de descarga asistida',
      'Cuchilla nueva integrada en cada cartucho para corte sin desgarro'
    ],
    image: MEDICAL_IMAGES.engrapadora,
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    reviewsCount: 41
  },
  {
    id: 'prod-006',
    sku: 'ENG-REC-60G',
    name: 'Recarga para Engrapadora Endoscópica 60mm Oro (Parénquima Grueso)',
    category: 'engrapado',
    brand: 'Scope QX',
    specialty: 'Cirugía Bariátrica (Manga Gástrica y Bypass)',
    price: 3450,
    comparePrice: 3800,
    stock: 24,
    minStockThreshold: 8,
    presentation: 'Caja con 6 cartuchos estériles de titanio grado médico',
    diameterMm: 12,
    lengthMm: 60,
    cofePristReg: '2195C2022 SSA',
    sterilization: 'Estéril Desechable (ETO)',
    description: 'Cartucho recargable de 60mm color oro con 6 hileras de grapas de titanio en forma de B 3.8mm/4.1mm. Diseñado para sellado de tejido gástrico e intestinal engrosado.',
    features: [
      'Seis hileras de grapas con altura progresiva tridimensional',
      'Titanio médico de ultra pureza libre de magnetismo',
      'Yunque de compresión con canal de guiado uniforme'
    ],
    image: MEDICAL_IMAGES.recargasGrapas,
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    reviewsCount: 35
  },
  {
    id: 'prod-007',
    sku: 'CIE-HEM-XL14',
    name: 'Clips Quirúrgicos de Polímero Hem-o-lok® Tamaño XL (Caja c/14)',
    category: 'cierre_vasos',
    brand: 'Teleflex / Weck',
    specialty: 'Urología, Nefrectomía y Cirugía General',
    price: 7600,
    comparePrice: 8400,
    stock: 15,
    minStockThreshold: 5,
    presentation: 'Caja con 14 cartuchos (84 clips en total)',
    cofePristReg: '0812C2019 SSA',
    sterilization: 'Estéril Desechable (ETO)',
    description: 'Sistema original Hem-o-lok® de polímero no reabsorbible con mecanismo de traba sonora de clic táctil. Cierre seguro de arterias y venas renales de hasta 16mm de calibre.',
    features: [
      'Polímero inerte biocompatible radiotransparente (sin interferencia en TAC/RM)',
      'Retroalimentación auditiva y táctil de bloqueo seguro',
      'Dientes integrados que previenen el deslizamiento longitudinal del vaso'
    ],
    image: MEDICAL_IMAGES.hemolokClips,
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    reviewsCount: 57
  },
  {
    id: 'prod-008',
    sku: 'CIE-APLI-1033',
    name: 'Pinza Aplicadora Laparoscópica para Clips Hem-o-lok® XL 10mm x 330mm',
    category: 'cierre_vasos',
    brand: 'Teleflex / Weck',
    specialty: 'Cirugía Laparoscópica Avanzada',
    price: 14800,
    comparePrice: 16500,
    stock: 5,
    minStockThreshold: 2,
    presentation: 'Pieza individual en estuche protector rígido',
    diameterMm: 10,
    lengthMm: 330,
    cofePristReg: '0813C2019 SSA',
    sterilization: 'Reutilizable Autoclavable (134°C)',
    description: 'Aplicador reusable de alta gama con mandíbulas maquinadas específicamente para cargar cartuchos de clips de polímero Hem-o-lok tamaño XL. Retención de clip sin caída durante la maniobra.',
    features: [
      'Mandíbula de aleación especial templada con ranura de retención',
      'Vástago giratorio 360° para abordajes en ángulos complejos',
      'Desarmable para esterilización completa en autoclave'
    ],
    image: MEDICAL_IMAGES.aplicadorClips,
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 16
  },
  {
    id: 'prod-009',
    sku: 'ACC-TROC-SET',
    name: 'Kit de Trocares Desechables ELITE Ópticos con Cánula Roscada (Set 5mm, 10mm y 12mm)',
    category: 'laparoscopia',
    brand: 'Elite Medical',
    specialty: 'Acceso Quirúrgico Laparoscópico',
    price: 3200,
    comparePrice: 3600,
    stock: 30,
    minStockThreshold: 8,
    presentation: 'Caja con 6 kits de accesos completos estériles',
    diameterMm: 10,
    lengthMm: 100,
    cofePristReg: '1540C2023 SSA',
    sterilization: 'Estéril Desechable (ETO)',
    description: 'Sistema de acceso laparoscópico con punzón transparente para entrada visual controlada con óptica de cero grados. Cánula con rosca de fijación firme en pared abdominal que evita fugas de neumoperitoneo.',
    features: [
      'Entrada óptica directa guiada por visión endoscópica',
      'Cánula con válvula de doble sello para instrumental de 5mm a 12mm sin reductor externo',
      'Llave de paso Luer de alto flujo para insuflación de CO2'
    ],
    image: MEDICAL_IMAGES.trocares,
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    reviewsCount: 31
  },
  {
    id: 'prod-010',
    sku: 'CON-EBAG-10',
    name: 'Bolsa de Extracción Quirúrgica Endo Bag con Aro Autoexpandible 10mm (Caja c/10)',
    category: 'consumibles',
    brand: 'Purple Surgical',
    specialty: 'Colecistectomía y Ooforectomía',
    price: 2950,
    comparePrice: 3300,
    stock: 22,
    minStockThreshold: 6,
    presentation: 'Caja con 10 piezas estériles en empaque individual',
    diameterMm: 10,
    lengthMm: 330,
    cofePristReg: '0945C2021 SSA',
    sterilization: 'Estéril Desechable (ETO)',
    description: 'Bolsa de polímero impermeable resistente a rasgaduras con memoria metálica en la boca para apertura espontánea al desplegarse en cavidad. Previene la diseminación de bilis, cálculos o tejido neoplásico.',
    features: [
      'Aro de Nitinol con apertura inmediata al salir de la cánula',
      'Hilo de cierre hermético con nudo de tracción reforzado',
      'Capacidad de 250ml en material transparente impermeable'
    ],
    image: MEDICAL_IMAGES.endobag,
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    reviewsCount: 28
  },
  {
    id: 'prod-011',
    sku: 'CON-ANTI-FOG',
    name: 'Solución Antiempañante Quirúrgica UltraClear con Esponja Estéril (Caja c/20)',
    category: 'consumibles',
    brand: 'Scope QX',
    specialty: 'Toda Cirugía Videoendoscópica',
    price: 1850,
    comparePrice: 2100,
    stock: 45,
    minStockThreshold: 10,
    presentation: 'Caja con 20 frascos de 6ml con almohadilla adhesiva',
    cofePristReg: '0322R2020 SSA',
    sterilization: 'Estéril Desechable (ETO)',
    description: 'Solución surfactante médica estéril que evita el empañamiento de lentes laparoscópicos por condensación o calor intraabdominal. Incluye almohadilla adhesiva estéril para fijar al campo quirúrgico.',
    features: [
      'Fórmula no tóxica de rápida evaporación que no raya la óptica',
      'Almohadilla con reverso adhesivo de fijación rápida a sábana quirúrgica',
      'Mantiene la visión nítida durante procedimientos prolongados'
    ],
    image: MEDICAL_IMAGES.antiempanante,
    isFeatured: false,
    isActive: true,
    rating: 4.7,
    reviewsCount: 42
  },
  {
    id: 'prod-012',
    sku: 'EQU-TOR-4K',
    name: 'Torre de Laparoscopía 4K UHD UltraVision Pro con Monitor Grado Médico 32"',
    category: 'torres_equipos',
    brand: 'Scope QX Hospital System',
    specialty: 'Quirófano Quirúrgico Central',
    price: 285000,
    comparePrice: 310000,
    stock: 2,
    minStockThreshold: 1,
    presentation: 'Torre completa rodable con transformador de aislamiento y accesorios',
    cofePristReg: '3011E2024 SSA',
    sterilization: 'No Estéril / Equipo',
    description: 'Sistema completo de videocirugía 4K con procesador de imagen UltraVision, cabezal de cámara autoclavable de sensor CMOS 4K nativo, fuente de luz LED fría de 120W y monitor de 32 pulgadas grado médico antirreflejo.',
    features: [
      'Resolución 3840 x 2160 a 60 fps con realce cromático de vasos',
      'Insuflador de CO2 de 45 Litros/min con calentador de gas integrado',
      'Grabador digital USB dual para expediente clínico electrónico',
      'Garantía de 2 años en México con servicio técnico biomédico certificado'
    ],
    image: MEDICAL_IMAGES.torre4k,
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    reviewsCount: 8
  },
  {
    id: 'prod-013',
    sku: 'LAP-PORTA-533',
    name: 'Portaagujas Laparoscópico Mango Axial con Carburo de Tungsteno 5mm x 330mm',
    category: 'laparoscopia',
    brand: 'Metzen Medical',
    specialty: 'Sutura Laparoscópica e Intracorpórea',
    price: 6200,
    comparePrice: 6900,
    stock: 6,
    minStockThreshold: 2,
    presentation: 'Pieza individual en estuche esterilizable',
    diameterMm: 5,
    lengthMm: 330,
    cofePristReg: '0422R2021 SSA',
    sterilization: 'Reutilizable Autoclavable (134°C)',
    description: 'Portaagujas de diseño alemán con mango axial ergonómico y mandíbula recta con pastillas de carburo de tungsteno piramidal que impiden la rotación de la aguja quirúrgica durante la sutura.',
    features: [
      'Grip con insertos de carburo de tungsteno de durabilidad extrema',
      'Trinquete de liberación rápida con presión suave del pulgar',
      'Transmisión de fuerza 1:1 para anudado intracorpóreo de alta precisión'
    ],
    image: MEDICAL_IMAGES.portaagujas,
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    reviewsCount: 15
  },
  {
    id: 'prod-014',
    sku: 'LAP-VERESS-15',
    name: 'Aguja de Veress con Cánula Retráctil de Seguridad 150mm (Caja c/5)',
    category: 'laparoscopia',
    brand: 'Elite Medical',
    specialty: 'Creación de Neumoperitoneo',
    price: 2150,
    comparePrice: 2400,
    stock: 20,
    minStockThreshold: 6,
    presentation: 'Caja con 5 piezas estériles desechables',
    diameterMm: 2,
    lengthMm: 150,
    cofePristReg: '1541C2023 SSA',
    sterilization: 'Estéril Desechable (ETO)',
    description: 'Aguja de Veress con estilete interno romo retráctil con resorte de alta sensibilidad. El indicador de posición visual confirma la entrada segura al espacio peritoneal.',
    features: [
      'Alarma visual roja de posición para verificar entrada a cavidad libre',
      'Válvula de dos vías tipo Luer-Lock con cierre hermético',
      'Punta biselada afilada para penetración suave sin desgarro fascial'
    ],
    image: MEDICAL_IMAGES.veress,
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    reviewsCount: 17
  },
  {
    id: 'prod-015',
    sku: 'CON-MALLA-15',
    name: 'Malla Quirúrgica de Polipropileno Monofilamento Pesada 15cm x 15cm (Caja c/3)',
    category: 'consumibles',
    brand: 'Scope QX',
    specialty: 'Hernioplastía Laparoscópica TAPP / TEP',
    price: 2400,
    comparePrice: 2750,
    stock: 16,
    minStockThreshold: 5,
    presentation: 'Caja con 3 mallas estériles selladas',
    cofePristReg: '2019C2021 SSA',
    sterilization: 'Estéril Desechable (ETO)',
    description: 'Malla tejida de polipropileno 100% monofilamento de grado médico. Memoria elástica para facilitar su desenrollado a través del trocar de 10mm en la cavidad preperitoneal.',
    features: [
      'Porosidad macro de 1.2mm que promueve rápida integración fibroblástica',
      'Bordes recortables que no desprenden fibras sueltas',
      'Excelente fijación con tackers o sutura de polipropileno'
    ],
    image: MEDICAL_IMAGES.mallaQuirurgica,
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    reviewsCount: 23
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'LAP-2026-9104',
    createdAt: '2026-09-28T14:32:00Z',
    customer: {
      name: 'Dr. Alejandro Morales Ramos',
      email: 'dr.morales@hospitalangeles.mx',
      phone: '+52 33 1892 4432',
      specialty: 'Cirugía Bariátrica y Metabólica',
      hospitalOrClinic: 'Hospital Ángeles del Carmen (Guadalajara)',
      cedulaProfesional: '7841920'
    },
    shippingAddress: {
      street: 'Av. Manuel Acuña',
      exteriorNumber: '2760',
      neighborhood: 'Prados Providencia',
      city: 'Guadalajara',
      state: 'Jalisco',
      zipCode: '44670',
      hospitalWard: 'Pabellón Quirúrgico Central - Entrega a Lic. Verónica (Jefa de Quirófano 4)'
    },
    billingInfo: {
      requiresInvoice: true,
      rfc: 'MORA820415HQ3',
      legalName: 'ALEJANDRO MORALES RAMOS',
      taxRegime: '612 - Personas Físicas con Actividades Empresariales y Profesionales',
      cfdiUse: 'G03 - Gastos en general',
      email: 'facturas@cirugiamorales.com'
    },
    items: [
      {
        productId: 'prod-005',
        productName: 'Engrapadora Endoscópica Lineal Cortante Articulada 60mm',
        sku: 'ENG-ENDO-60A',
        quantity: 2,
        unitPrice: 9400,
        subtotal: 18800,
        image: MEDICAL_IMAGES.engrapadora
      },
      {
        productId: 'prod-006',
        productName: 'Recarga para Engrapadora Endoscópica 60mm Oro',
        sku: 'ENG-REC-60G',
        quantity: 3,
        unitPrice: 3450,
        subtotal: 10350,
        image: MEDICAL_IMAGES.recargasGrapas
      }
    ],
    subtotal: 29150,
    discount: 0,
    iva: 4664,
    shippingCost: 0,
    total: 33814,
    paymentMethod: 'spei',
    paymentStatus: 'pagado',
    orderStatus: 'preparacion_quirurgica',
    trackingNumber: 'MEX-DHL-941829031',
    carrier: 'DHL Express Quirúrgico Priority',
    notes: 'Urgente para procedimiento programado el viernes a las 08:00 hrs.'
  },
  {
    id: 'LAP-2026-9098',
    createdAt: '2026-09-27T11:15:00Z',
    customer: {
      name: 'Dra. Sofia Valenzuela Garza',
      email: 'sofia.valenzuela@abchospital.mx',
      phone: '+52 55 4910 8821',
      specialty: 'Cirugía General y Laparoscopía Avanzada',
      hospitalOrClinic: 'Centro Médico ABC Observatorio (CDMX)',
      cedulaProfesional: '9103847'
    },
    shippingAddress: {
      street: 'Sur 136',
      exteriorNumber: '116',
      neighborhood: 'Las Américas',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '01120',
      hospitalWard: 'Torre de Consultorios B - Suite 502'
    },
    billingInfo: {
      requiresInvoice: true,
      rfc: 'VAGS861021ML8',
      legalName: 'SERVICIOS MEDICOS VALENZUELA S.A. DE C.V.',
      taxRegime: '601 - General de Ley Personas Morales',
      cfdiUse: 'I08 - Otra maquinaria y equipo',
      email: 'contabilidad@medicosvalenzuela.mx'
    },
    items: [
      {
        productId: 'prod-001',
        productName: 'Pinza Laparoscópica Maryland Curva 5mm x 330mm',
        sku: 'LAP-MARY-533',
        quantity: 1,
        unitPrice: 3850,
        subtotal: 3850,
        image: MEDICAL_IMAGES.maryland
      },
      {
        productId: 'prod-002',
        productName: 'Tijera Quirúrgica Laparoscópica Metzenbaum Curva 5mm x 330mm',
        sku: 'LAP-METZ-533',
        quantity: 1,
        unitPrice: 4250,
        subtotal: 4250,
        image: MEDICAL_IMAGES.tijerasMetzenbaum
      },
      {
        productId: 'prod-010',
        productName: 'Bolsa de Extracción Quirúrgica Endo Bag 10mm (Caja c/10)',
        sku: 'CON-EBAG-10',
        quantity: 2,
        unitPrice: 2950,
        subtotal: 5900,
        image: MEDICAL_IMAGES.endobag
      }
    ],
    subtotal: 14000,
    discount: 1400, // Coupon SURGEON10
    iva: 2016,
    shippingCost: 0,
    total: 14616,
    paymentMethod: 'tarjeta',
    paymentStatus: 'pagado',
    orderStatus: 'enviado',
    trackingNumber: 'FDX-8849201948MX',
    carrier: 'FedEx Medical Priority',
    notes: 'Guía activa en tránsito. Entrega estimada: Mañana antes de las 12:00.'
  },
  {
    id: 'LAP-2026-9082',
    createdAt: '2026-09-26T09:40:00Z',
    customer: {
      name: 'Dr. Héctor Cárdenas Villarreal',
      email: 'hector.cardenas@christus.mx',
      phone: '+52 81 8399 2200',
      specialty: 'Urología Oncológica',
      hospitalOrClinic: 'Hospital Christus Muguerza Alta Especialidad (Monterrey)',
      cedulaProfesional: '6549021'
    },
    shippingAddress: {
      street: 'Av. Belisario Domínguez',
      exteriorNumber: '2120',
      neighborhood: 'Obispado',
      city: 'Monterrey',
      state: 'Nuevo León',
      zipCode: '64060',
      hospitalWard: 'Recepción Central de Almacén de Farmacia Quirúrgica'
    },
    billingInfo: {
      requiresInvoice: true,
      rfc: 'CAVH790311PX2',
      legalName: 'DR HECTOR CARDENAS VILLARREAL',
      taxRegime: '612 - Personas Físicas con Actividades Empresariales y Profesionales',
      cfdiUse: 'G03 - Gastos en general',
      email: 'hcardenas@urosalud.com'
    },
    items: [
      {
        productId: 'prod-007',
        productName: 'Clips Quirúrgicos de Polímero Hem-o-lok® Tamaño XL (Caja c/14)',
        sku: 'CIE-HEM-XL14',
        quantity: 2,
        unitPrice: 7600,
        subtotal: 15200,
        image: MEDICAL_IMAGES.hemolokClips
      },
      {
        productId: 'prod-008',
        productName: 'Pinza Aplicadora Laparoscópica para Clips Hem-o-lok® XL',
        sku: 'CIE-APLI-1033',
        quantity: 1,
        unitPrice: 14800,
        subtotal: 14800,
        image: MEDICAL_IMAGES.aplicadorClips
      }
    ],
    subtotal: 30000,
    discount: 0,
    iva: 4800,
    shippingCost: 0,
    total: 34800,
    paymentMethod: 'spei',
    paymentStatus: 'pagado',
    orderStatus: 'entregado',
    trackingNumber: 'MEX-DHL-719304812',
    carrier: 'DHL Express Quirúrgico Priority',
    notes: 'Recibido en Quirófano con sello de conformidad.'
  },
  {
    id: 'LAP-2026-9071',
    createdAt: '2026-09-29T10:10:00Z',
    customer: {
      name: 'Dr. Gerardo Beltrán Salcedo',
      email: 'compras@clinicasanjavier.com.mx',
      phone: '+52 33 3669 0222',
      specialty: 'Jefe de Quirófanos y Suministros Médicos',
      hospitalOrClinic: 'Hospital San Javier (Guadalajara)',
      cedulaProfesional: '5192834'
    },
    shippingAddress: {
      street: 'Av. Pablo Casals',
      exteriorNumber: '640',
      neighborhood: 'Prados Providencia',
      city: 'Guadalajara',
      state: 'Jalisco',
      zipCode: '44670',
      hospitalWard: 'Departamento de Compras Médicas - Piso 2'
    },
    billingInfo: {
      requiresInvoice: true,
      rfc: 'HSJ920518TL3',
      legalName: 'HOSPITAL SAN JAVIER S.A. DE C.V.',
      taxRegime: '601 - General de Ley Personas Morales',
      cfdiUse: 'I08 - Otra maquinaria y equipo',
      email: 'facturacion@hospitalsanjavier.com'
    },
    items: [
      {
        productId: 'prod-009',
        productName: 'Kit de Trocares Desechables ELITE Ópticos con Cánula Roscada',
        sku: 'ACC-TROC-SET',
        quantity: 5,
        unitPrice: 3200,
        subtotal: 16000,
        image: MEDICAL_IMAGES.trocares
      },
      {
        productId: 'prod-011',
        productName: 'Solución Antiempañante Quirúrgica UltraClear con Esponja Estéril',
        sku: 'CON-ANTI-FOG',
        quantity: 3,
        unitPrice: 1850,
        subtotal: 5550,
        image: MEDICAL_IMAGES.antiempanante
      }
    ],
    subtotal: 21550,
    discount: 0,
    iva: 3448,
    shippingCost: 0,
    total: 24998,
    paymentMethod: 'orden_compra',
    paymentStatus: 'pendiente',
    orderStatus: 'pendiente',
    notes: 'Orden de compra institucional No. OC-HSJ-2026-441. En espera de confirmación de Tesorería.'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    name: 'Dr. Alejandro Morales Ramos',
    email: 'dr.morales@hospitalangeles.mx',
    phone: '+52 33 1892 4432',
    rfc: 'MORA820415HQ3',
    hospitalOrClinic: 'Hospital Ángeles del Carmen',
    city: 'Guadalajara',
    state: 'Jalisco',
    specialty: 'Cirugía Bariátrica y Metabólica',
    cedulaProfesional: '7841920',
    totalOrders: 6,
    totalSpent: 148200,
    lastOrderDate: '2026-09-28',
    status: 'activo'
  },
  {
    id: 'cust-002',
    name: 'Dra. Sofia Valenzuela Garza',
    email: 'sofia.valenzuela@abchospital.mx',
    phone: '+52 55 4910 8821',
    rfc: 'VAGS861021ML8',
    hospitalOrClinic: 'Centro Médico ABC Observatorio',
    city: 'Ciudad de México',
    state: 'CDMX',
    specialty: 'Cirugía General y Laparoscopía Avanzada',
    cedulaProfesional: '9103847',
    totalOrders: 4,
    totalSpent: 62450,
    lastOrderDate: '2026-09-27',
    status: 'activo'
  },
  {
    id: 'cust-003',
    name: 'Dr. Héctor Cárdenas Villarreal',
    email: 'hector.cardenas@christus.mx',
    phone: '+52 81 8399 2200',
    rfc: 'CAVH790311PX2',
    hospitalOrClinic: 'Hospital Christus Muguerza Alta Especialidad',
    city: 'Monterrey',
    state: 'Nuevo León',
    specialty: 'Urología Oncológica y Laparoscópica',
    cedulaProfesional: '6549021',
    totalOrders: 3,
    totalSpent: 89300,
    lastOrderDate: '2026-09-26',
    status: 'activo'
  },
  {
    id: 'cust-004',
    name: 'Dr. Gerardo Beltrán Salcedo',
    email: 'compras@clinicasanjavier.com.mx',
    phone: '+52 33 3669 0222',
    rfc: 'HSJ920518TL3',
    hospitalOrClinic: 'Hospital San Javier',
    city: 'Guadalajara',
    state: 'Jalisco',
    specialty: 'Jefatura de Quirófanos y Suministros',
    cedulaProfesional: '5192834',
    totalOrders: 8,
    totalSpent: 215000,
    lastOrderDate: '2026-09-29',
    status: 'activo'
  },
  {
    id: 'cust-005',
    name: 'Dra. Mariana Ochoa Lomelí',
    email: 'dra.ochoa@medicasur.org.mx',
    phone: '+52 55 5424 7200',
    rfc: 'OOLM880912KT1',
    hospitalOrClinic: 'Hospital Médica Sur',
    city: 'Ciudad de México',
    state: 'CDMX',
    specialty: 'Ginecología y Cirugía Mínimamente Invasiva',
    cedulaProfesional: '10482914',
    totalOrders: 2,
    totalSpent: 18400,
    lastOrderDate: '2026-09-18',
    status: 'activo'
  },
  {
    id: 'cust-006',
    name: 'Dr. Fernando Zepeda Ortiz',
    email: 'fzepeda@cmnsigloxxi.gob.mx',
    phone: '+52 55 5627 6900',
    hospitalOrClinic: 'Hospital de Especialidades CMN Siglo XXI',
    city: 'Ciudad de México',
    state: 'CDMX',
    specialty: 'Cirugía Gastrointestinal y Pediátrica',
    cedulaProfesional: '4928172',
    totalOrders: 1,
    totalSpent: 9800,
    lastOrderDate: '2026-08-30',
    status: 'prospecto'
  }
];

export const INITIAL_ACTIVE_CARTS: ActiveCart[] = [
  {
    id: 'cart-sess-901',
    customerName: 'Dra. Mariana Ochoa Lomelí',
    customerEmail: 'dra.ochoa@medicasur.org.mx',
    customerPhone: '+52 55 5424 7200',
    hospital: 'Hospital Médica Sur',
    items: [
      { productName: 'Pinza Laparoscópica Babcock 5mm x 330mm', quantity: 2, unitPrice: 3900 },
      { productName: 'Bolsa de Extracción Endo Bag 10mm (Caja c/10)', quantity: 1, unitPrice: 2950 }
    ],
    total: 10750,
    lastActivity: 'Hace 18 minutos',
    status: 'activo'
  },
  {
    id: 'cart-sess-894',
    customerName: 'Dr. Fernando Zepeda Ortiz',
    customerEmail: 'fzepeda@cmnsigloxxi.gob.mx',
    customerPhone: '+52 55 5627 6900',
    hospital: 'CMN Siglo XXI',
    items: [
      { productName: 'Portaagujas Laparoscópico Mango Axial con Tungsteno 5mm', quantity: 1, unitPrice: 6200 },
      { productName: 'Aguja de Veress con Seguridad 150mm (Caja c/5)', quantity: 2, unitPrice: 2150 }
    ],
    total: 10500,
    lastActivity: 'Ayer a las 18:22 hrs',
    status: 'abandonado'
  },
  {
    id: 'cart-sess-889',
    customerName: 'Dra. Lorena Peña (Clínica Santa María)',
    customerEmail: 'lpena@santamaria.mx',
    customerPhone: '+52 33 2211 4455',
    hospital: 'Clínica Quirúrgica Santa María (Zapopan)',
    items: [
      { productName: 'Clips Quirúrgicos de Polímero Hem-o-lok® Tamaño XL', quantity: 1, unitPrice: 7600 },
      { productName: 'Solución Antiempañante Quirúrgica UltraClear', quantity: 2, unitPrice: 1850 }
    ],
    total: 11300,
    lastActivity: 'Hace 3 horas',
    status: 'abandonado'
  }
];

export const INITIAL_COUPONS: DiscountCoupon[] = [
  {
    code: 'SURGEON10',
    percentage: 10,
    minPurchase: 5000,
    active: true,
    description: '10% de descuento de cortesía para cirujanos certificados'
  },
  {
    code: 'HOSPITAL15',
    percentage: 15,
    minPurchase: 20000,
    active: true,
    description: '15% de descuento institucional en pedidos hospitalarios de alto volumen'
  },
  {
    code: 'LAPARO2026',
    percentage: 5,
    minPurchase: 2500,
    active: true,
    description: '5% de descuento en instrumental laparoscópico seleccionado'
  }
];
