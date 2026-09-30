import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export const FloatingCart: React.FC = () => {
  const { cartCount, total, setIsCartDrawerOpen, viewMode } = useStore();

  if (cartCount === 0) return null;

  return (
    <aside 
      aria-label="Carrito de compras flotante"
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <button
        onClick={() => setIsCartDrawerOpen(true)}
        className="group flex items-center gap-3 bg-gradient-to-r from-cyan-700 via-cyan-800 to-blue-900 hover:from-cyan-600 hover:to-blue-800 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-xl shadow-cyan-950/25 border border-cyan-500/30 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label={`Ver carrito de compras con ${cartCount} artículos por un total de $${total.toLocaleString('es-MX')} MXN`}
      >
        {/* Pulsing Cart Icon Badge */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-white text-cyan-900 flex items-center justify-center font-bold shadow-xs">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-xs animate-pulse">
            {cartCount}
          </span>
        </div>

        {/* Text & Price */}
        <div className="text-left">
          <div className="text-[10px] font-bold text-cyan-200 uppercase tracking-wider leading-none">
            Insumos en Carrito
          </div>
          <div className="text-xs sm:text-sm font-black text-white font-mono mt-0.5">
            ${total.toLocaleString('es-MX')}{' '}
            <span className="text-[10px] font-medium text-cyan-300">MXN</span>
          </div>
        </div>

        <div className="w-6 h-6 rounded-full bg-cyan-900/60 group-hover:bg-cyan-700/80 flex items-center justify-center transition-colors">
          <ArrowRight className="w-3.5 h-3.5 text-cyan-200 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </button>
    </aside>
  );
};
