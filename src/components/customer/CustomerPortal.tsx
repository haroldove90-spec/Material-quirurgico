import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  ShoppingBag,
  Truck,
  Heart,
  User,
  Building,
  KeyRound,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  RotateCw,
  Plus,
  Printer,
  Search,
  AlertCircle,
  Eye,
  Store,
  ShieldAlert
} from 'lucide-react';
import { Order } from '../../types';

export const CustomerPortal: React.FC = () => {
  const {
    customerTab,
    setCustomerTab,
    setViewMode,
    activeCustomer,
    setActiveCustomer,
    updateActiveCustomerProfile,
    customers,
    orders,
    wishlist,
    toggleWishlist,
    addToCart,
    setIsCartDrawerOpen,
    reorderItems,
    selectedTrackingOrder,
    setSelectedTrackingOrder,
    products
  } = useStore();

  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Edit profile form state
  const [profileForm, setProfileForm] = useState({
    name: activeCustomer?.name || '',
    email: activeCustomer?.email || '',
    phone: activeCustomer?.phone || '',
    specialty: activeCustomer?.specialty || '',
    hospital: activeCustomer?.hospital || '',
    cedulaProfesional: activeCustomer?.cedulaProfesional || '',
    rfc: activeCustomer?.rfc || '',
    taxName: activeCustomer?.taxName || '',
    taxRegime: activeCustomer?.taxRegime || '',
    street: activeCustomer?.address?.street || '',
    exteriorNumber: activeCustomer?.address?.exteriorNumber || '',
    neighborhood: activeCustomer?.address?.neighborhood || '',
    city: activeCustomer?.address?.city || '',
    state: activeCustomer?.address?.state || '',
    zipCode: activeCustomer?.address?.zipCode || '',
    hospitalWard: activeCustomer?.address?.hospitalWard || ''
  });

  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // Filter orders belonging to activeCustomer
  const customerOrders = orders.filter(
    o => o.customer.email.toLowerCase() === activeCustomer?.email.toLowerCase() ||
         o.customer.name.toLowerCase().includes(activeCustomer?.name.toLowerCase().split(' ')[1] || '---')
  );

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateActiveCustomerProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      specialty: profileForm.specialty,
      hospital: profileForm.hospital,
      cedulaProfesional: profileForm.cedulaProfesional,
      rfc: profileForm.rfc,
      taxName: profileForm.taxName,
      taxRegime: profileForm.taxRegime,
      address: {
        street: profileForm.street,
        exteriorNumber: profileForm.exteriorNumber,
        neighborhood: profileForm.neighborhood,
        city: profileForm.city,
        state: profileForm.state,
        zipCode: profileForm.zipCode,
        hospitalWard: profileForm.hospitalWard
      }
    });
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  const navTabs = [
    {
      id: 'mis_compras' as const,
      label: 'Mis Compras & Pedidos',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: customerOrders.length
    },
    {
      id: 'rastreo' as const,
      label: 'Rastreo Quirúrgico en Vivo',
      icon: <Truck className="w-4 h-4" />
    },
    {
      id: 'deseos' as const,
      label: 'Insumos Frecuentes / Favoritos',
      icon: <Heart className="w-4 h-4" />,
      badge: wishlist.length
    },
    {
      id: 'perfil' as const,
      label: 'Datos de Quirófano & Facturación',
      icon: <User className="w-4 h-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col pb-20 md:pb-12">
      {/* Top Header of Customer Portal */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-bold shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white">
                  LAPAROSCOPIC<span className="text-cyan-400">.MX</span>
                </span>
                <span className="text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                  Portal Médico de Cliente
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Bienvenido, <strong className="text-slate-200">{activeCustomer?.name}</strong> · {activeCustomer?.hospital}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Doctor / Hospital account switcher */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Simular Médico:</span>
              <select
                value={activeCustomer?.id}
                onChange={e => {
                  const target = customers.find(c => c.id === e.target.value);
                  if (target) {
                    setActiveCustomer(target);
                    setProfileForm({
                      name: target.name,
                      email: target.email,
                      phone: target.phone,
                      specialty: target.specialty || '',
                      hospital: target.hospital || '',
                      cedulaProfesional: target.cedulaProfesional || '',
                      rfc: target.rfc || '',
                      taxName: target.taxName || '',
                      taxRegime: target.taxRegime || '',
                      street: target.address?.street || '',
                      exteriorNumber: target.address?.exteriorNumber || '',
                      neighborhood: target.address?.neighborhood || '',
                      city: target.address?.city || '',
                      state: target.address?.state || '',
                      zipCode: target.address?.zipCode || '',
                      hospitalWard: target.address?.hospitalWard || ''
                    });
                  }
                }}
                className="bg-transparent text-cyan-300 font-medium focus:outline-none cursor-pointer text-xs"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.name} ({c.hospital})
                  </option>
                ))}
              </select>
            </div>

            {/* Back to Catalog */}
            <button
              onClick={() => setViewMode('store')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Ir al Catálogo</span>
            </button>

            {/* Admin Switch */}
            <button
              onClick={() => setViewMode('admin')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs rounded-lg transition-colors cursor-pointer border border-slate-700"
              title="Ir al panel de administración"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Panel Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        {/* Customer Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Cirugías / Pedidos Totales
            </span>
            <div className="text-xl font-black text-slate-900 mt-0.5">
              {customerOrders.length}
            </div>
            <span className="text-[11px] text-cyan-600 font-medium">Pedidos quirúrgicos</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Pedidos en Tránsito
            </span>
            <div className="text-xl font-black text-amber-600 mt-0.5">
              {customerOrders.filter(o => o.orderStatus === 'en_camino' || o.orderStatus === 'confirmado' || o.orderStatus === 'pendiente').length}
            </div>
            <span className="text-[11px] text-slate-500">Con custodia médica</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Insumos Guardados
            </span>
            <div className="text-xl font-black text-emerald-600 mt-0.5">
              {wishlist.length}
            </div>
            <span className="text-[11px] text-slate-500">Para resurtido rápido</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Hospital de Asignación
            </span>
            <div className="text-sm font-bold text-slate-800 truncate mt-1">
              {activeCustomer?.hospital || 'Hospital General'}
            </div>
            <span className="text-[11px] text-slate-400">Cédula: {activeCustomer?.cedulaProfesional || 'Verificada'}</span>
          </div>
        </div>

        {/* Layout Grid: Sidebar Tabs + Module Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Lateral Nav Tabs on Desktop */}
          <aside className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Módulos del Cliente
            </div>

            {navTabs.map(tab => {
              const isActive = customerTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCustomerTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-100 mt-2 p-3 bg-cyan-50/50 rounded-xl border border-cyan-100/50">
              <div className="flex items-center gap-2 text-cyan-900 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Garantía de Esterilidad</span>
              </div>
              <p className="text-[11px] text-cyan-800/80 mt-1 leading-relaxed">
                Todos sus pedidos cuentan con registro COFEPRIS, trazabilidad de lote y empaque con indicador de óxido de etileno.
              </p>
            </div>
          </aside>

          {/* Module Content */}
          <main className="md:col-span-9 space-y-6">
            {/* TAB 1: MIS COMPRAS & PEDIDOS */}
            {customerTab === 'mis_compras' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Historial de Compras Quirúrgicas</h2>
                    <p className="text-xs text-slate-500">
                      Consulte sus órdenes, estados de entrega en quirófano, PIN de recepción y vuelva a pedir insumos en 1 clic.
                    </p>
                  </div>
                  <button
                    onClick={() => setViewMode('store')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nueva Compra</span>
                  </button>
                </div>

                {customerOrders.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-semibold text-slate-700">Aún no tiene pedidos registrados</p>
                    <p className="text-xs mt-1">Explore nuestro instrumental laparoscópico y realice su primera adquisición.</p>
                    <button
                      onClick={() => setViewMode('store')}
                      className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-cyan-700 transition-colors cursor-pointer"
                    >
                      Ir al Catálogo de Productos
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {customerOrders.map(order => (
                      <div key={order.id} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-xs text-slate-900">
                              {order.id}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {new Date(order.createdAt).toLocaleDateString('es-MX', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>

                            {/* Status badge */}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                order.orderStatus === 'entregado'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : order.orderStatus === 'en_camino'
                                    ? 'bg-cyan-100 text-cyan-800'
                                    : order.orderStatus === 'confirmado'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {order.orderStatus === 'entregado' && 'Entregado en Quirófano'}
                              {order.orderStatus === 'en_camino' && 'En Ruta Hospitalaria'}
                              {order.orderStatus === 'confirmado' && 'Confirmado / En Preparación'}
                              {order.orderStatus === 'pendiente' && 'Pendiente de Validación'}
                              {order.orderStatus === 'cancelado' && 'Cancelado'}
                            </span>

                            {/* Payment status badge */}
                            {order.paymentMethod === 'contra_entrega' && (
                              <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                Contra Entrega
                              </span>
                            )}
                          </div>

                          <div className="font-mono font-black text-sm text-slate-900">
                            ${order.total.toLocaleString('es-MX')} MXN
                          </div>
                        </div>

                        {/* PIN if contra entrega */}
                        {order.deliveryPin && (
                          <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <KeyRound className="w-4 h-4 text-emerald-600" />
                              <span className="text-xs font-semibold text-emerald-900">
                                PIN de Recepción Contra Entrega:
                              </span>
                            </div>
                            <span className="font-mono font-black text-xs text-emerald-800 bg-white px-2.5 py-0.5 rounded border border-emerald-300">
                              {order.deliveryPin}
                            </span>
                          </div>
                        )}

                        {/* Items list preview */}
                        <div className="space-y-1.5 py-2">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs text-slate-700">
                              <div className="flex items-center gap-2 truncate">
                                {it.image && (
                                  <img
                                    src={it.image}
                                    alt={it.productName}
                                    className="w-7 h-7 rounded object-cover border border-slate-200 shrink-0"
                                  />
                                )}
                                <span className="font-medium truncate">{it.quantity}x {it.productName}</span>
                                <span className="text-[10px] font-mono text-slate-400">({it.sku})</span>
                              </div>
                              <span className="font-mono text-slate-600 shrink-0">
                                ${it.subtotal.toLocaleString('es-MX')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions */}
                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="text-[11px] text-slate-500">
                            Envío: <strong>{order.carrier || 'DHL Medical Express'}</strong> · Destino: {order.shippingAddress.hospitalWard || order.shippingAddress.city}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Reorder items */}
                            <button
                              onClick={() => {
                                reorderItems(order);
                                setIsCartDrawerOpen(true);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                              <span>Volver a Pedir</span>
                            </button>

                            {/* Live tracking button */}
                            <button
                              onClick={() => {
                                setSelectedTrackingOrder(order);
                                setCustomerTab('rastreo');
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-cyan-200"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>Rastrear</span>
                            </button>

                            {/* View details */}
                            <button
                              onClick={() => setSelectedOrderDetails(order)}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Detalles</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: RASTREO QUIRÚRGICO EN VIVO */}
            {customerTab === 'rastreo' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Rastreo de Cadena de Custodia Médica</h2>
                  <p className="text-xs text-slate-500">
                    Monitoreo en tiempo real del instrumental desde la planta de esterilización hasta el quirófano de su hospital.
                  </p>
                </div>

                {/* Select which order to track */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs font-bold text-slate-800">
                    Seleccione Orden para Seguimiento:
                  </div>
                  <select
                    value={selectedTrackingOrder?.id || customerOrders[0]?.id || ''}
                    onChange={e => {
                      const found = orders.find(o => o.id === e.target.value);
                      if (found) setSelectedTrackingOrder(found);
                    }}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  >
                    {customerOrders.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.id} - ${o.total.toLocaleString('es-MX')} MXN ({new Date(o.createdAt).toLocaleDateString('es-MX')})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedTrackingOrder || customerOrders[0] ? (
                  (() => {
                    const tracking = selectedTrackingOrder || customerOrders[0];
                    return (
                      <div className="space-y-6">
                        {/* Summary Header */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-cyan-50/60 rounded-xl border border-cyan-200/80 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase block">Número de Guía:</span>
                            <span className="font-mono font-bold text-cyan-900 text-sm">
                              {tracking.trackingNumber || 'DHL-QX-92819203'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase block">Paquetería Asignada:</span>
                            <span className="font-bold text-slate-800">
                              {tracking.carrier || 'DHL Medical Express'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase block">Destino Final:</span>
                            <span className="font-bold text-slate-800 truncate block">
                              {tracking.shippingAddress.hospitalWard || tracking.shippingAddress.city}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Timeline */}
                        <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                          {/* Step 1 */}
                          <div className="relative">
                            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                              ✓
                            </div>
                            <div className="font-bold text-xs text-slate-900">
                              1. Pedido Quirúrgico Recibido y Validado
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Se emite la orden de surtido en almacén central estéril con registro de lote.
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {new Date(tracking.createdAt).toLocaleString('es-MX')}
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="relative">
                            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                              ✓
                            </div>
                            <div className="font-bold text-xs text-slate-900">
                              2. Inspección de Esterilidad y Empaque Grado Médico
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Trazabilidad de esterilización por Óxido de Etileno / Gamma y cotejo de vigencia COFEPRIS.
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="relative">
                            <div className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                              tracking.orderStatus === 'en_camino' || tracking.orderStatus === 'entregado'
                                ? 'bg-cyan-600 text-white'
                                : 'bg-slate-300 text-slate-700'
                            }`}>
                              3
                            </div>
                            <div className="font-bold text-xs text-slate-900">
                              3. En Ruta con Custodia Hospitalaria Express
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Transporte con temperatura controlada hacia {tracking.shippingAddress.city}, {tracking.shippingAddress.state}.
                            </div>
                          </div>

                          {/* Step 4 */}
                          <div className="relative">
                            <div className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                              tracking.orderStatus === 'entregado'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              4
                            </div>
                            <div className="font-bold text-xs text-slate-900">
                              4. Entrega y Recepción en Quirófano / Almacén
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {tracking.deliveryPin ? (
                                <span>Requiere validación mediante PIN: <strong>{tracking.deliveryPin}</strong></span>
                              ) : (
                                <span>Firma de acuse y verificación de sellos de seguridad intactos.</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    No hay información de rastreo activa.
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: INSUMOS FRECUENTES / DESEOS */}
            {customerTab === 'deseos' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Insumos Quirúrgicos Frecuentes</h2>
                    <p className="text-xs text-slate-500">
                      Guarde los consumibles laparoscópicos que utiliza en sus procedimientos habituales para reabastecimiento instantáneo.
                    </p>
                  </div>
                </div>

                {wishlist.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    <Heart className="w-10 h-10 mx-auto mb-2 text-rose-300 opacity-60" />
                    <p className="font-semibold text-slate-700 text-xs">No tiene insumos frecuentes guardados</p>
                    <p className="text-[11px] mt-1 text-slate-500">Haga clic en el icono de corazón en cualquier producto para guardarlo aquí.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {wishlist.map(productId => {
                      const prod = products.find(p => p.id === productId);
                      if (!prod) return null;
                      return (
                        <div key={prod.id} className="p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between hover:shadow-xs transition-shadow">
                          <div>
                            <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 mb-2">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => toggleWishlist(prod.id)}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-rose-500 hover:bg-white cursor-pointer shadow-xs"
                                title="Quitar de frecuentes"
                              >
                                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                              </button>
                            </div>

                            <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider block">
                              {prod.brand}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">
                              {prod.name}
                            </h4>
                            <div className="text-[11px] font-mono font-bold text-slate-800 mt-1">
                              ${prod.price.toLocaleString('es-MX')} MXN
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              addToCart(prod, 1);
                              setIsCartDrawerOpen(true);
                            }}
                            className="mt-3 w-full py-1.5 bg-slate-900 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Añadir al Carrito</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: PERFIL Y DATOS DE QUIRÓFANO / FACTURACIÓN */}
            {customerTab === 'perfil' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Datos Hospitalarios & Facturación Fiscal</h2>
                  <p className="text-xs text-slate-500">
                    Actualice su dirección de entrega a quirófano y sus datos fiscales para timbrado automático CFDI 4.0.
                  </p>
                </div>

                {profileSavedToast && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>¡Información médica y fiscal actualizada con éxito en su cuenta!</span>
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-6">
                  {/* Médico / Cirujano */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      1. Información del Médico Especialista
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Nombre Completo *</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Cédula Profesional</label>
                        <input
                          type="text"
                          value={profileForm.cedulaProfesional}
                          onChange={e => setProfileForm({ ...profileForm, cedulaProfesional: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Especialidad Quirúrgica</label>
                        <input
                          type="text"
                          value={profileForm.specialty}
                          onChange={e => setProfileForm({ ...profileForm, specialty: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Hospital / Clínica Principal</label>
                        <input
                          type="text"
                          value={profileForm.hospital}
                          onChange={e => setProfileForm({ ...profileForm, hospital: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Correo Electrónico</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Teléfono / WhatsApp</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dirección de Quirófano */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      2. Dirección de Entrega Hospitalaria
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-700 font-medium mb-1">Calle</label>
                        <input
                          type="text"
                          value={profileForm.street}
                          onChange={e => setProfileForm({ ...profileForm, street: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">No. Exterior / Interior</label>
                        <input
                          type="text"
                          value={profileForm.exteriorNumber}
                          onChange={e => setProfileForm({ ...profileForm, exteriorNumber: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Colonia</label>
                        <input
                          type="text"
                          value={profileForm.neighborhood}
                          onChange={e => setProfileForm({ ...profileForm, neighborhood: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Ciudad</label>
                        <input
                          type="text"
                          value={profileForm.city}
                          onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Estado</label>
                        <input
                          type="text"
                          value={profileForm.state}
                          onChange={e => setProfileForm({ ...profileForm, state: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-slate-700 font-medium mb-1">
                          Pabellón, Área o Quirófano para entrega inmediata
                        </label>
                        <input
                          type="text"
                          value={profileForm.hospitalWard}
                          onChange={e => setProfileForm({ ...profileForm, hospitalWard: e.target.value })}
                          placeholder="Ej: Quirófano 4, Torre de Especialidades (Entregar a Enf. Quirúrgica)"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Facturación Fiscal */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      3. Datos Fiscales para Factura (CFDI 4.0)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">RFC</label>
                        <input
                          type="text"
                          value={profileForm.rfc}
                          onChange={e => setProfileForm({ ...profileForm, rfc: e.target.value.toUpperCase() })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg uppercase font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Razón Social</label>
                        <input
                          type="text"
                          value={profileForm.taxName}
                          onChange={e => setProfileForm({ ...profileForm, taxName: e.target.value.toUpperCase() })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg uppercase focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-700 font-medium mb-1">Régimen Fiscal</label>
                        <input
                          type="text"
                          value={profileForm.taxRegime}
                          onChange={e => setProfileForm({ ...profileForm, taxRegime: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      Guardar Datos Hospitalarios
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Detalle de Pedido Quirúrgico: {selectedOrderDetails.id}
                </h3>
                <span className="text-[11px] text-slate-500">
                  {new Date(selectedOrderDetails.createdAt).toLocaleString('es-MX')}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">Médico Solicitante:</span>
                  <strong>{selectedOrderDetails.customer.name}</strong>
                  <div className="text-slate-500 text-[11px]">{selectedOrderDetails.customer.hospitalOrClinic}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Entrega en Quirófano:</span>
                  <div className="text-slate-800">{selectedOrderDetails.shippingAddress.hospitalWard || 'Recepción'}</div>
                  <div className="text-slate-500 text-[11px]">{selectedOrderDetails.shippingAddress.city}, {selectedOrderDetails.shippingAddress.state}</div>
                </div>
              </div>

              {selectedOrderDetails.deliveryPin && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <KeyRound className="w-4 h-4 text-emerald-600" />
                    <span>PIN Contra Entrega:</span>
                  </div>
                  <span className="font-mono font-black text-sm text-emerald-800 bg-white px-3 py-1 rounded border border-emerald-300">
                    {selectedOrderDetails.deliveryPin}
                  </span>
                </div>
              )}

              <div>
                <div className="font-bold text-slate-900 mb-2">Insumos del Pedido:</div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedOrderDetails.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div>
                        <div className="font-bold text-slate-800">{it.productName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">SKU: {it.sku} · Cantidad: {it.quantity}</div>
                      </div>
                      <div className="font-mono font-bold text-slate-900">
                        ${it.subtotal.toLocaleString('es-MX')} MXN
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline font-bold text-slate-900">
                <span>Total de la Orden (IVA 16% Inc.):</span>
                <span className="text-base text-cyan-800 font-black font-mono">
                  ${selectedOrderDetails.total.toLocaleString('es-MX')} MXN
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Nota</span>
              </button>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
