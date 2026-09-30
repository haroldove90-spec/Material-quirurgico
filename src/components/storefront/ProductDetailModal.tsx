import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingCart,
  ShieldCheck,
  CheckCircle,
  Truck,
  MessageCircle,
  AlertTriangle,
  Building2,
  FileText
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartDrawerOpen } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isOutOfStock = selectedProduct.stock === 0;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartDrawerOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Laparoscopic.mx, me interesa cotizar el producto: ${selectedProduct.name} (SKU: ${selectedProduct.sku}). ¿Tienen disponibilidad inmediata para envío hospitalario?`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/80 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Clinical Badges Column */}
          <div className="bg-slate-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-2xs">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded flex items-center justify-between">
                <span>Registro Sanitario</span>
                <span className="font-mono text-cyan-300 font-semibold">{selectedProduct.cofePristReg}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Esterilización: <strong>{selectedProduct.sterilization}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Envío express a quirófano en todo el país</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Aceptamos compras institucionales hospitalarias</span>
              </div>
            </div>
          </div>

          {/* Product Dossier Details Column */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Header metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-bold text-cyan-700 uppercase tracking-wide">
                  {selectedProduct.brand}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-400">SKU: {selectedProduct.sku}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {selectedProduct.name}
              </h2>

              <p className="text-xs text-slate-600 mt-2 italic">
                {selectedProduct.presentation}
              </p>

              {/* Price & Stock */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Precio Unitario</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold text-slate-900">
                      ${selectedProduct.price.toLocaleString('es-MX')}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">MXN</span>
                  </div>
                  <div className="text-[10px] text-slate-400">+ 16% IVA desglose en factura</div>
                </div>

                <div className="text-right">
                  {isOutOfStock ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Agotado
                    </span>
                  ) : (
                    <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{selectedProduct.stock} pzas en stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
                  Descripción Técnica
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Technical Features */}
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                    Especificaciones Quirúrgicas
                  </h4>
                  <ul className="space-y-1">
                    {selectedProduct.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-cyan-600 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity + Add to Cart + WhatsApp */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-40 cursor-pointer text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-slate-800 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    disabled={quantity >= selectedProduct.stock || isOutOfStock}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-40 cursor-pointer text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {isOutOfStock
                      ? 'Sin Existencias'
                      : `Agregar (${(selectedProduct.price * quantity).toLocaleString('es-MX')} MXN)`}
                  </span>
                </button>
              </div>

              {/* WhatsApp direct consult */}
              <a
                href={`https://wa.me/523336128900?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar con Asesor Biomédico por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
