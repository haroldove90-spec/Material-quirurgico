import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Tag, PlusCircle, Check, X } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const { coupons, toggleCouponActive, addCoupon } = useStore();
  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState(10);
  const [minPurchase, setMinPurchase] = useState(3000);
  const [description, setDescription] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      percentage: Number(percentage),
      minPurchase: Number(minPurchase),
      active: true,
      description: description || `Descuento del ${percentage}% en compras mínimas de $${minPurchase}`
    });

    setCode('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Cupones y Promociones Quirúrgicas
        </h1>
        <p className="text-xs text-slate-500">
          Administre códigos de descuento promocionales para médicos y comités hospitalarios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create Coupon Form */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 uppercase">
            <PlusCircle className="w-4 h-4 text-cyan-600" />
            <span>Crear Nuevo Cupón</span>
          </div>

          <form onSubmit={handleAddCoupon} className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Código del Cupón *</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="PROMO2026"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg uppercase font-mono font-bold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">% Descuento *</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={percentage}
                  onChange={e => setPercentage(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mínimo ($ MXN)</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={minPurchase}
                  onChange={e => setMinPurchase(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Descripción / Restricción</label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Para médicos especialistas..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg cursor-pointer transition-colors"
            >
              Guardar Cupón
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="md:col-span-2 space-y-3">
          {coupons.map(coupon => (
            <div
              key={coupon.code}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-sm text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
                    {coupon.code}
                  </span>
                  <span className="font-bold text-slate-900">
                    {coupon.percentage}% de descuento
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                      coupon.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {coupon.active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">{coupon.description}</p>
                <div className="text-[10px] text-slate-400 font-mono">
                  Compra mínima: ${coupon.minPurchase.toLocaleString('es-MX')} MXN
                </div>
              </div>

              <button
                onClick={() => toggleCouponActive(coupon.code)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                  coupon.active
                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {coupon.active ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
