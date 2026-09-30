import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, Eye, AlertTriangle, Check, Shield } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useStore();

  const isLowStock = product.stock <= product.minStockThreshold && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-2.5 bg-white text-slate-800 rounded-lg shadow-md hover:bg-slate-50 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-600" />
            <span>Ficha Técnica</span>
          </button>
        </div>

        {/* Feature status notice */}
        {product.isFeatured && (
          <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs tracking-wider uppercase">
            Destacado
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Brand and Spec metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1.5 flex-wrap">
            <span className="text-cyan-800 font-semibold uppercase">{product.brand}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            {product.diameterMm && (
              <>
                <span>{product.diameterMm}mm</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
              </>
            )}
            <span>{product.sterilization.split(' ')[0]}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* SKU & COFEPRIS notice */}
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono text-slate-500 font-medium">SKU: {product.sku}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Shield className="w-3 h-3 text-cyan-600" />
              {product.cofePristReg}
            </span>
          </div>

          {/* Presentation label */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-1 italic">
            {product.presentation}
          </p>
        </div>

        {/* Bottom Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  ${product.price.toLocaleString('es-MX')}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">MXN</span>
              </div>
              {product.comparePrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.comparePrice.toLocaleString('es-MX')}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            <div className="text-right text-[11px]">
              {isOutOfStock ? (
                <span className="text-rose-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Bajo Pedido
                </span>
              ) : isLowStock ? (
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Solo {product.stock} disp.
                </span>
              ) : (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  En Stock
                </span>
              )}
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-cyan-700 text-white shadow-xs'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sin Existencias' : 'Agregar al Carrito'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
