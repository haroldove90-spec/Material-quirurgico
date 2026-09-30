import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Store,
  Search,
  PackageCheck,
  ShoppingCart,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    cartCount,
    setIsCartDrawerOpen,
    setCustomerTab,
    setAdminTab
  } = useStore();

  const handleNavClick = (target: 'store' | 'search' | 'customer' | 'cart' | 'admin') => {
    if (target === 'cart') {
      setIsCartDrawerOpen(true);
      return;
    }

    if (target === 'search') {
      setViewMode('store');
      // Scroll to catalog search
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (target === 'customer') {
      setViewMode('customer');
      setCustomerTab('mis_compras');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'admin') {
      setViewMode('admin');
      setAdminTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'store') {
      setViewMode('store');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  return (
    <nav
      aria-label="Navegación móvil tipo app"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5 safe-area-bottom"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {/* Tienda */}
        <button
          onClick={() => handleNavClick('store')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            viewMode === 'store'
              ? 'text-cyan-700 font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <Store className={`w-5 h-5 ${viewMode === 'store' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">Tienda</span>
        </button>

        {/* Buscar */}
        <button
          onClick={() => handleNavClick('search')}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-slate-500 hover:text-slate-900 transition-all font-medium cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Buscar</span>
        </button>

        {/* Mis Compras (Portal Cliente) */}
        <button
          onClick={() => handleNavClick('customer')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative ${
            viewMode === 'customer'
              ? 'text-cyan-700 font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <PackageCheck className={`w-5 h-5 ${viewMode === 'customer' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">Mis Compras</span>
          {viewMode === 'customer' && (
            <span className="w-1 h-1 rounded-full bg-cyan-600 absolute top-0.5 right-6" />
          )}
        </button>

        {/* Carrito */}
        <button
          onClick={() => handleNavClick('cart')}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-slate-500 hover:text-slate-900 transition-all font-medium cursor-pointer relative"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Carrito</span>
        </button>

        {/* Admin */}
        <button
          onClick={() => handleNavClick('admin')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            viewMode === 'admin'
              ? 'text-cyan-700 font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${viewMode === 'admin' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">Admin</span>
        </button>
      </div>
    </nav>
  );
};
