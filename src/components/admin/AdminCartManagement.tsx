import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ActiveCart } from '../../types';
import {
  ShoppingCart,
  Clock,
  MessageCircle,
  FileText,
  Trash2,
  CheckCircle,
  PlusCircle,
  X,
  AlertCircle,
  Building
} from 'lucide-react';

export const AdminCartManagement: React.FC = () => {
  const { activeCarts, removeActiveCart, createActiveCart, createOrder, products, setIsFormalQuoteOpen } = useStore();

  const [isNewCartModalOpen, setIsNewCartModalOpen] = useState(false);
  const [selectedItemsForCart, setSelectedItemsForCart] = useState<{ productId: string; quantity: number }[]>([
    { productId: products[0]?.id || '', quantity: 1 }
  ]);
  const [newCartData, setNewCartData] = useState({
    customerName: 'Dr. Roberto Sandoval',
    customerEmail: 'rsandoval@quirofanos.mx',
    customerPhone: '+52 33 8910 2233',
    hospital: 'Hospital Puerta de Hierro Sur'
  });

  const handleConvertCartToOrder = (cart: ActiveCart) => {
    // Generate order items
    const orderItems = cart.items.map(it => {
      const prod = products.find(p => p.name === it.productName) || products[0];
      return {
        productId: prod.id,
        productName: it.productName,
        sku: prod.sku,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        subtotal: it.quantity * it.unitPrice,
        image: prod.image
      };
    });

    const subtotal = cart.total;
    const iva = Math.round(subtotal * 0.16);
    const total = subtotal + iva;

    createOrder({
      customer: {
        name: cart.customerName,
        email: cart.customerEmail || 'ventas@laparoscopic.mx',
        phone: cart.customerPhone || '+52 33 0000 0000',
        hospitalOrClinic: cart.hospital || 'Hospital General',
        specialty: 'Cirugía General y Laparoscópica'
      },
      shippingAddress: {
        street: 'Av. Empresarial',
        exteriorNumber: '100',
        neighborhood: 'Zona Médica',
        city: 'Guadalajara',
        state: 'Jalisco',
        zipCode: '44100',
        hospitalWard: 'Convertido desde Gestión de Carrito de Compras'
      },
      billingInfo: {
        requiresInvoice: false,
        rfc: 'XAXX010101000',
        legalName: cart.customerName.toUpperCase(),
        taxRegime: '612 - Personas Físicas',
        cfdiUse: 'G03 - Gastos en general',
        email: cart.customerEmail || 'ventas@laparoscopic.mx'
      },
      items: orderItems,
      subtotal,
      discount: 0,
      iva,
      shippingCost: 0,
      total,
      paymentMethod: 'spei',
      paymentStatus: 'pendiente',
      orderStatus: 'confirmado',
      carrier: 'DHL Express Quirúrgico Priority',
      notes: `Pedido convertido desde carrito asistido (ID: ${cart.id})`
    });

    removeActiveCart(cart.id);
  };

  const handleCreateAssistedCart = (e: React.FormEvent) => {
    e.preventDefault();

    const items = selectedItemsForCart.map(sel => {
      const prod = products.find(p => p.id === sel.productId) || products[0];
      return {
        productName: prod.name,
        quantity: sel.quantity,
        unitPrice: prod.price
      };
    });

    const total = items.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0);

    createActiveCart({
      customerName: newCartData.customerName,
      customerEmail: newCartData.customerEmail,
      customerPhone: newCartData.customerPhone,
      hospital: newCartData.hospital,
      items,
      total,
      status: 'activo'
    });

    setIsNewCartModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Gestión de Carritos de Compras Activos y Abandonados
          </h1>
          <p className="text-xs text-slate-500">
            Supervise carritos con insumos seleccionados por cirujanos, recupere ventas y cotice de forma asistida
          </p>
        </div>

        <button
          onClick={() => setIsNewCartModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Crear Carrito / Cotización Asistida</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-slate-500">Carritos en Seguimiento</div>
          <div className="text-2xl font-black text-slate-900">{activeCarts.length}</div>
          <div className="text-xs text-cyan-700 font-medium">Sesiones con insumos en espera</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-slate-500">Valor Total en Carritos</div>
          <div className="text-2xl font-black text-slate-900">
            ${activeCarts.reduce((acc, c) => acc + c.total, 0).toLocaleString('es-MX')}{' '}
            <span className="text-xs font-semibold text-slate-400">MXN</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium">Oportunidad de cierre hospitalario</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase text-slate-500">Tasa de Recuperación</div>
          <div className="text-2xl font-black text-slate-900">82%</div>
          <div className="text-xs text-slate-500">Vía contacto directo de asesor biomédico</div>
        </div>
      </div>

      {/* Carts List Grid */}
      <div className="space-y-4">
        {activeCarts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-400 space-y-3">
            <ShoppingCart className="w-12 h-12 mx-auto text-slate-300" />
            <h3 className="text-sm font-bold text-slate-700">No hay carritos abandonados actualmente</h3>
            <p className="text-xs max-w-sm mx-auto">
              Todos los pedidos han sido convertidos o no hay sesiones con insumos desatendidos.
            </p>
          </div>
        ) : (
          activeCarts.map(cart => {
            const recoveryMsg = encodeURIComponent(
              `Estimado/a ${cart.customerName}, le saluda Laparoscopic.mx. Vemos que tiene en su carrito: ${cart.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')} por un total de $${cart.total.toLocaleString('es-MX')} MXN para ${cart.hospital || 'su hospital'}. ¿Desea que le agendemos la entrega a quirófano con crédito hospitalario o factura CFDI?`
            );

            return (
              <div
                key={cart.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{cart.customerName}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            cart.status === 'activo'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {cart.status === 'activo' ? 'Sesión Activa' : 'Carrito Abandonado'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3 h-3 text-cyan-600" />
                        <span>{cart.hospital}</span>
                        <span>·</span>
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{cart.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Valor del Carrito
                    </span>
                    <span className="text-base font-extrabold font-mono text-slate-900">
                      ${cart.total.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>

                {/* Items in cart */}
                <div className="space-y-1.5 text-xs">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Insumos Quirúrgicos en Carrito ({cart.items.reduce((a, b) => a + b.quantity, 0)} piezas):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cart.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between"
                      >
                        <div className="font-semibold text-slate-800 truncate pr-2">
                          {item.quantity}x {item.productName}
                        </div>
                        <div className="font-mono font-bold text-slate-700 shrink-0">
                          ${(item.quantity * item.unitPrice).toLocaleString('es-MX')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    {cart.customerPhone && (
                      <a
                        href={`https://wa.me/${cart.customerPhone.replace(/[^0-9]/g, '')}?text=${recoveryMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Recuperar por WhatsApp</span>
                      </a>
                    )}

                    <button
                      onClick={() => handleConvertCartToOrder(cart)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Convertir en Pedido Quirúrgico</span>
                    </button>
                  </div>

                  <button
                    onClick={() => removeActiveCart(cart.id)}
                    className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Descartar Carrito</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New Assisted Cart Modal */}
      {isNewCartModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Armar Carrito Asistido para Hospital</h3>
              <button
                onClick={() => setIsNewCartModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssistedCart} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre del Cirujano o Comprador *</label>
                <input
                  type="text"
                  value={newCartData.customerName}
                  onChange={e => setNewCartData({ ...newCartData, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hospital / Clínica</label>
                  <input
                    type="text"
                    value={newCartData.hospital}
                    onChange={e => setNewCartData({ ...newCartData, hospital: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp de Contacto</label>
                  <input
                    type="text"
                    value={newCartData.customerPhone}
                    onChange={e => setNewCartData({ ...newCartData, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Insumo a Cotizar / Cargar</label>
                <select
                  value={selectedItemsForCart[0]?.productId}
                  onChange={e => setSelectedItemsForCart([{ productId: e.target.value, quantity: 1 }])}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ${p.price.toLocaleString('es-MX')} MXN
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsNewCartModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold cursor-pointer"
                >
                  Crear Carrito Activo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
