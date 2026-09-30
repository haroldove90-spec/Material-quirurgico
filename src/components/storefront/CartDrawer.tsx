import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingCart,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertCircle,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    iva,
    shippingCost,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutModalOpen,
    setIsFormalQuoteOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-5 h-5 text-cyan-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">Carrito de Insumos</h2>
                <p className="text-[11px] text-slate-500">
                  {cart.length === 0
                    ? '0 artículos seleccionados'
                    : `${cart.reduce((a, b) => a + b.quantity, 0)} piezas en orden`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">El carrito está vacío</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore nuestro catálogo de instrumental y seleccione los insumos requeridos para su quirófano.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-cyan-700 transition-colors cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span>Productos ({cart.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-cyan-800 font-semibold truncate">
                            {item.product.sku}
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-slate-500">
                            ${item.product.price.toLocaleString('es-MX')} MXN c/u
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded-md bg-white">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 font-bold disabled:opacity-30"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-xs font-extrabold text-slate-900">
                            ${(item.product.price * item.quantity).toLocaleString('es-MX')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-3 border-t border-slate-200">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="font-bold">{appliedCoupon.code}</span>
                          <span className="text-emerald-700 ml-1">
                            ({appliedCoupon.percentage}% de descuento)
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                      >
                        Quitar
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={e => setCouponInput(e.target.value)}
                          placeholder="Cupón (ej. SURGEON10)"
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <div className="text-[11px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{couponError}</span>
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400">
                        Prueba: <span className="font-mono text-cyan-700">SURGEON10</span> (10% en +$5,000) o <span className="font-mono text-cyan-700">HOSPITAL15</span>
                      </div>
                    </form>
                  )}
                </div>

                {/* Free Shipping Progress bar */}
                <div className="p-3 bg-cyan-50/80 border border-cyan-200/80 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-cyan-950 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-cyan-700" />
                      {subtotal >= 5000
                        ? '¡Envío Quirúrgico Gratis a Todo México!'
                        : `Agregue $${(5000 - subtotal).toLocaleString('es-MX')} más para envío gratis`}
                    </span>
                  </div>
                  <div className="w-full bg-cyan-200/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-600 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Descuento ({appliedCoupon?.percentage}%)</span>
                    <span>-${discountAmount.toLocaleString('es-MX')} MXN</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>IVA Trasladado (16%)</span>
                  <span>${iva.toLocaleString('es-MX')} MXN</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Envío Asegurado Quirúrgico</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-semibold">GRATIS</span>
                    ) : (
                      `$${shippingCost.toLocaleString('es-MX')} MXN`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-extrabold text-slate-900">
                  <span>Total a Pagar</span>
                  <span className="text-lg text-slate-900">
                    ${total.toLocaleString('es-MX')} <span className="text-xs font-semibold">MXN</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Proceder a la Compra</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setIsFormalQuoteOpen(true);
                  }}
                  className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Descargar Cotización Formal</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                <span>Factura CFDI 4.0 inmediata | Pago seguro SPEI o Tarjeta</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
