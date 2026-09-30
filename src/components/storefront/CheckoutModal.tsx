import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  CheckCircle,
  Building,
  CreditCard,
  FileText,
  Truck,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Printer,
  ShoppingBag,
  ExternalLink,
  Banknote,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { Order, PaymentMethod } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    subtotal,
    discountAmount,
    iva,
    shippingCost,
    total,
    createOrder,
    lastCreatedOrder,
    setLastCreatedOrder,
    setViewMode,
    setAdminTab,
    setCustomerTab,
    activeCustomer
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State initialized with realistic Mexican surgical client data
  const [formData, setFormData] = useState({
    // Doctor / Hospital
    name: activeCustomer ? activeCustomer.name : 'Dr. Fernando Zepeda Ortiz',
    email: activeCustomer ? activeCustomer.email : 'dr.zepeda@cirugialaparoscopica.mx',
    phone: activeCustomer ? activeCustomer.phone : '+52 33 1948 2011',
    specialty: activeCustomer?.specialty || 'Cirugía General y Laparoscopía',
    hospitalOrClinic: activeCustomer?.hospital || 'Hospital Ángeles del Carmen',
    cedulaProfesional: activeCustomer?.cedulaProfesional || '8392019',

    // Shipping
    street: activeCustomer?.address?.street || 'Av. Manuel Acuña',
    exteriorNumber: activeCustomer?.address?.exteriorNumber || '2760',
    neighborhood: activeCustomer?.address?.neighborhood || 'Prados Providencia',
    city: activeCustomer?.address?.city || 'Guadalajara',
    state: activeCustomer?.address?.state || 'Jalisco',
    zipCode: activeCustomer?.address?.zipCode || '44670',
    hospitalWard: activeCustomer?.address?.hospitalWard || 'Pabellón Quirúrgico - Quirófano 2 (A nombre de Dr. Zepeda)',

    // Billing
    requiresInvoice: true,
    rfc: activeCustomer?.rfc || 'ZEOF840912KM4',
    legalName: activeCustomer?.taxName || 'FERNANDO ZEPEDA ORTIZ',
    taxRegime: activeCustomer?.taxRegime || '612 - Personas Físicas con Actividades Empresariales y Profesionales',
    cfdiUse: 'G03 - Gastos en general',
    billingEmail: activeCustomer?.email || 'facturas@cirugiazepeda.com',

    // Payment
    paymentMethod: 'contra_entrega' as PaymentMethod,
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/28',
    cardCvc: '•••'
  });

  // Sync if activeCustomer changes
  useEffect(() => {
    if (activeCustomer) {
      setFormData(prev => ({
        ...prev,
        name: activeCustomer.name,
        email: activeCustomer.email,
        phone: activeCustomer.phone,
        specialty: activeCustomer.specialty || prev.specialty,
        hospitalOrClinic: activeCustomer.hospital || prev.hospitalOrClinic,
        cedulaProfesional: activeCustomer.cedulaProfesional || prev.cedulaProfesional,
        rfc: activeCustomer.rfc || prev.rfc,
        legalName: activeCustomer.taxName || prev.legalName,
        taxRegime: activeCustomer.taxRegime || prev.taxRegime
      }));
    }
  }, [activeCustomer]);

  if (!isCheckoutModalOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinalizeOrder = () => {
    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      sku: item.product.sku,
      quantity: item.quantity,
      unitPrice: item.product.price,
      subtotal: item.product.price * item.quantity,
      image: item.product.image
    }));

    // Generate Surgical Reception PIN for Contra Entrega
    const generatedPin = formData.paymentMethod === 'contra_entrega'
      ? `QX-${Math.floor(1000 + Math.random() * 9000)}`
      : undefined;

    const newOrder = createOrder({
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialty: formData.specialty,
        hospitalOrClinic: formData.hospitalOrClinic,
        cedulaProfesional: formData.cedulaProfesional
      },
      shippingAddress: {
        street: formData.street,
        exteriorNumber: formData.exteriorNumber,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        hospitalWard: formData.hospitalWard
      },
      billingInfo: {
        requiresInvoice: formData.requiresInvoice,
        rfc: formData.rfc,
        legalName: formData.legalName,
        taxRegime: formData.taxRegime,
        cfdiUse: formData.cfdiUse,
        email: formData.billingEmail || formData.email
      },
      items: orderItems,
      subtotal,
      discount: discountAmount,
      iva,
      shippingCost,
      total,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'tarjeta'
        ? 'pagado'
        : formData.paymentMethod === 'contra_entrega'
          ? 'contra_entrega_pendiente'
          : 'pendiente',
      orderStatus: formData.paymentMethod === 'contra_entrega'
        ? 'confirmado'
        : formData.paymentMethod === 'tarjeta'
          ? 'confirmado'
          : 'pendiente',
      carrier: formData.paymentMethod === 'contra_entrega'
        ? 'Mensajería Médica Directa (Custodia de Cadena Quirúrgica)'
        : 'DHL Express Quirúrgico Priority',
      notes: formData.paymentMethod === 'contra_entrega'
        ? `[CONTRA ENTREGA] Liquidación programada contra entrega hospitalaria. PIN de verificación: ${generatedPin}. Cobro en terminal o efectivo.`
        : 'Pedido generado desde la tienda en línea Laparoscopic.mx'
    });

    if (generatedPin && newOrder) {
      newOrder.deliveryPin = generatedPin;
    }

    setLastCreatedOrder(newOrder);
    setStep(5);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-cyan-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {step === 5 ? 'Confirmación de Pedido Quirúrgico' : 'Finalizar Adquisición Quirúrgica'}
              </h2>
              <p className="text-[11px] text-slate-500">
                Laparoscopic.mx · Suministro Médico Especializado
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCheckoutModalOpen(false);
              setStep(1);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-cyan-700' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-cyan-700 text-white' : 'bg-slate-300 text-slate-700'}`}>1</span>
              <span>Médico</span>
            </div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-cyan-700' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-cyan-700 text-white' : 'bg-slate-300 text-slate-700'}`}>2</span>
              <span>Entrega</span>
            </div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-cyan-700' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-cyan-700 text-white' : 'bg-slate-300 text-slate-700'}`}>3</span>
              <span>CFDI 4.0</span>
            </div>
            <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-cyan-700' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? 'bg-cyan-700 text-white' : 'bg-slate-300 text-slate-700'}`}>4</span>
              <span>Pago</span>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Datos del Médico / Hospital */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                1. Información del Médico o Responsable de Compras
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Dr. Nombre y Apellidos"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Cédula Profesional</label>
                  <input
                    type="text"
                    value={formData.cedulaProfesional}
                    onChange={e => handleInputChange('cedulaProfesional', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Ej. 7841920"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Hospital / Clínica *</label>
                  <input
                    type="text"
                    value={formData.hospitalOrClinic}
                    onChange={e => handleInputChange('hospitalOrClinic', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Hospital Ángeles, ABC, Privada..."
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Especialidad</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={e => handleInputChange('specialty', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Cirugía General, Bariátrica, Urología..."
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="contacto@hospital.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Teléfono Móvil (WhatsApp) *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="+52 33 1234 5678"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                Sus datos médicos son confidenciales y se utilizan para coordinar la entrega en quirófano y la emisión de su factura CFDI.
              </div>
            </div>
          )}

          {/* STEP 2: Dirección de Entrega Hospitalaria */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                2. Destino de Entrega (Hospital o Clínica)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-medium mb-1">Calle y Número *</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={e => handleInputChange('street', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Av. Principal No. 123"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Colonia *</label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={e => handleInputChange('neighborhood', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Col. Del Valle"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Código Postal *</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={e => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="44670"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Ciudad *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Guadalajara, Monterrey, CDMX..."
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Estado *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Jalisco"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-medium mb-1">
                    Indicaciones de Entrega (Piso, Quirófano o Almacén)
                  </label>
                  <input
                    type="text"
                    value={formData.hospitalWard}
                    onChange={e => handleInputChange('hospitalWard', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Ej. Quirófano Central - Piso 2 o Recepción de Farmacia"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Facturación CFDI 4.0 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  3. Datos de Facturación Fiscal (CFDI 4.0)
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresInvoice}
                    onChange={e => handleInputChange('requiresInvoice', e.target.checked)}
                    className="rounded text-cyan-600 focus:ring-cyan-500/20"
                  />
                  <span>Requiero Factura Electrónica</span>
                </label>
              </div>

              {formData.requiresInvoice ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">RFC con Homoclave *</label>
                    <input
                      type="text"
                      value={formData.rfc}
                      onChange={e => handleInputChange('rfc', e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg uppercase font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="MORA820415HQ3"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Razón Social *</label>
                    <input
                      type="text"
                      value={formData.legalName}
                      onChange={e => handleInputChange('legalName', e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="NOMBRE O EMPRESA TAL CUAL EN CONSTANCIA"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Régimen Fiscal *</label>
                    <select
                      value={formData.taxRegime}
                      onChange={e => handleInputChange('taxRegime', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-xs"
                    >
                      <option value="612 - Personas Físicas con Actividades Empresariales y Profesionales">
                        612 - Personas Físicas Profesionales / Médicos
                      </option>
                      <option value="601 - General de Ley Personas Morales">
                        601 - General de Ley Personas Morales (Hospital / Clínica)
                      </option>
                      <option value="626 - Régimen Simplificado de Confianza (RESICO)">
                        626 - RESICO
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Uso de CFDI *</label>
                    <select
                      value={formData.cfdiUse}
                      onChange={e => handleInputChange('cfdiUse', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-xs"
                    >
                      <option value="G03 - Gastos en general">G03 - Gastos en general</option>
                      <option value="I08 - Otra maquinaria y equipo">I08 - Otra maquinaria y equipo médico</option>
                      <option value="D01 - Honorarios médicos, dentales y gastos hospitalarios">
                        D01 - Gastos hospitalarios
                      </option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                  Se generará una Nota de Venta Simple para su control interno. Podrá solicitar refacturación en los siguientes 15 días hábiles.
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Método de Pago */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                4. Selección de Método de Pago Seguro
              </div>

              <div className="space-y-2.5">
                {/* Pago Contra Entrega */}
                <label className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'contra_entrega' ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="contra_entrega"
                      checked={formData.paymentMethod === 'contra_entrega'}
                      onChange={() => handleInputChange('paymentMethod', 'contra_entrega')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Banknote className="w-4 h-4 text-emerald-600" />
                          Pago Contra Entrega en Hospital / Quirófano (Simulado)
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          Efectivo o Terminal Móvil
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Paga al recibir el material estéril directamente en almacén o recepción del quirófano. Se generará un <strong>PIN Quirúrgico de Recepción</strong> para validar la entrega.
                      </p>
                    </div>
                  </div>
                </label>

                {/* SPEI Interbancario */}
                <label className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'spei' ? 'border-cyan-600 bg-cyan-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="spei"
                      checked={formData.paymentMethod === 'spei'}
                      onChange={() => handleInputChange('paymentMethod', 'spei')}
                      className="mt-1 text-cyan-600 focus:ring-cyan-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          Transferencia Interbancaria SPEI (Recomendado Médicos)
                        </span>
                        <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded">
                          Sin Comisiones
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        CLABE interbancaria Banamex directa. Validación automática de comprobante en menos de 10 minutos para empaque estéril.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Tarjeta de Crédito / Débito */}
                <label className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'tarjeta' ? 'border-cyan-600 bg-cyan-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="tarjeta"
                      checked={formData.paymentMethod === 'tarjeta'}
                      onChange={() => handleInputChange('paymentMethod', 'tarjeta')}
                      className="mt-1 text-cyan-600 focus:ring-cyan-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          Tarjeta de Crédito / Débito (Visa, Mastercard, AMEX)
                        </span>
                        <span className="text-[10px] text-slate-500">
                          3, 6 meses sin intereses disponibles
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Procesamiento cifrado SSL bancario 256 bits. Aprobación inmediata.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Orden de Compra Institucional */}
                <label className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'orden_compra' ? 'border-cyan-600 bg-cyan-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="orden_compra"
                      checked={formData.paymentMethod === 'orden_compra'}
                      onChange={() => handleInputChange('paymentMethod', 'orden_compra')}
                      className="mt-1 text-cyan-600 focus:ring-cyan-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          Orden de Compra Hospitalaria / Crédito Institucional
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                          Hospitales Registrados
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Sujeto a validación con el Departamento de Compras o Jefatura de Quirófanos de su institución médica.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Order Summary box */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Productos ({cart.reduce((a, b) => a + b.quantity, 0)} piezas)</span>
                  <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Descuento aplicado</span>
                    <span>-${discountAmount.toLocaleString('es-MX')} MXN</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>IVA Trasladado (16%)</span>
                  <span>${iva.toLocaleString('es-MX')} MXN</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío Hospitalario Express</span>
                  <span>{shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-MX')} MXN`}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>Total Final</span>
                  <span className="text-base">${total.toLocaleString('es-MX')} MXN</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Success & Order Voucher */}
          {step === 5 && lastCreatedOrder && (
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold text-cyan-800 bg-cyan-100 px-2.5 py-1 rounded">
                  ORDEN: {lastCreatedOrder.id}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  ¡Pedido Quirúrgico Registrado con Éxito!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Hemos notificado al equipo de almacén estéril y al asesor biomédico responsable. Se ha enviado una copia a <strong>{lastCreatedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Voucher Card */}
              <div className="text-left bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 text-xs space-y-3">
                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Médico / Solicitante:</span>
                    <strong className="text-slate-800">{lastCreatedOrder.customer.name}</strong>
                    <div className="text-[11px] text-slate-500">{lastCreatedOrder.customer.hospitalOrClinic}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Destino en Quirófano:</span>
                    <strong className="text-slate-800">{lastCreatedOrder.shippingAddress.city}, {lastCreatedOrder.shippingAddress.state}</strong>
                    <div className="text-[11px] text-slate-500 truncate">{lastCreatedOrder.shippingAddress.hospitalWard}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Insumos Registrados:</div>
                  {lastCreatedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-800">
                        {it.quantity}x {it.productName} ({it.sku})
                      </span>
                      <span className="font-mono font-semibold text-slate-700">
                        ${it.subtotal.toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-slate-900">
                  <span>Total Liquidado / Por Liquidar:</span>
                  <span className="text-sm text-cyan-800 font-extrabold font-mono">
                    ${lastCreatedOrder.total.toLocaleString('es-MX')} MXN
                  </span>
                </div>

                {/* Contra Entrega Notice & PIN */}
                {lastCreatedOrder.paymentMethod === 'contra_entrega' && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-[12px] text-emerald-950 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-emerald-900">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span>Modalidad Contra Entrega Quirúrgica Activada</span>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                        Simulación Activa
                      </span>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-emerald-300">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                          PIN de Validación al Recibir:
                        </div>
                        <div className="text-lg font-black font-mono text-emerald-700 tracking-wider">
                          {lastCreatedOrder.deliveryPin || 'QX-4892'}
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-emerald-800">
                      El repartidor médico asignado solicitará este <strong>PIN</strong> en la recepción de Quirófano o Almacén antes de cobrar los <strong>${lastCreatedOrder.total.toLocaleString('es-MX')} MXN</strong> en efectivo o con terminal bancaria.
                    </p>
                  </div>
                )}

                {/* SPEI Instructions if spei */}
                {lastCreatedOrder.paymentMethod === 'spei' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 space-y-1">
                    <div className="font-bold">Datos para Transferencia SPEI Interbancaria:</div>
                    <div>Banco: <strong>Citibanamex</strong></div>
                    <div>CLABE: <strong className="font-mono">0023 2007 1948 2910 44</strong></div>
                    <div>Beneficiario: <strong>PMI SERVICIOS QUIRURGICOS / LAPAROSCOPIC MX</strong></div>
                    <div>Concepto: <strong className="font-mono">{lastCreatedOrder.id}</strong></div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Comprobante</span>
                </button>

                {/* Direct link to Customer Portal Orders */}
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setViewMode('customer');
                    setCustomerTab('mis_compras');
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Ver en Mis Compras (Cliente)</span>
                </button>

                {/* Direct link to Admin Panel Orders tracking */}
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setViewMode('admin');
                    setAdminTab('orders');
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver en Panel Admin</span>
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setStep(1);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Continuar en Tienda</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step < 5 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep((step + 1) as any)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinalizeOrder}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirmar Orden (${total.toLocaleString('es-MX')} MXN)</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
