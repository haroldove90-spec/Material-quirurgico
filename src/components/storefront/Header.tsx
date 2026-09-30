import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingCart,
  Phone,
  FileText,
  ShieldCheck,
  LayoutDashboard,
  Store,
  Stethoscope,
  X,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    total,
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setAdminTab,
    setCustomerTab,
    setIsFormalQuoteOpen,
    products,
    setSelectedProduct,
    activeCustomer
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Search auto-suggestions
  const filteredSuggestions = searchQuery.trim()
    ? products
        .filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* 1. TOP UTILITY BAR (RESPONSIVE: SINGLE CLEAN LINE ON MOBILE, EXPANSIVE ON DESKTOP) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Mobile top bar layout (< md) */}
          <div className="flex md:hidden items-center justify-between w-full text-[11px]">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold truncate">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">COFEPRIS Registros Vigentes</span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href="tel:+523336128900"
                className="flex items-center gap-1 text-slate-300 hover:text-white"
              >
                <Phone className="w-3 h-3 text-cyan-400" />
                <span className="font-mono text-[10px]">(33) 3612-8900</span>
              </a>

              <button
                onClick={() => {
                  setViewMode(viewMode === 'admin' ? 'store' : 'admin');
                  if (viewMode === 'store') setAdminTab('dashboard');
                }}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-600 text-white cursor-pointer hover:bg-cyan-500 transition-colors"
              >
                {viewMode === 'admin' ? 'Ver Tienda' : 'Modo Admin'}
              </button>
            </div>
          </div>

          {/* Desktop top bar layout (>= md) */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                COFEPRIS Registros Vigentes
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 text-[11px]">
                Distribuidor Autorizado Weck® / Teleflex / Scope QX / Purple Surgical
              </span>
              <span className="hidden lg:inline text-slate-600">·</span>
              <span className="hidden lg:inline text-emerald-400 text-[11px]">
                Envíos Urgentes a Hospitales en México
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-xs">
              <a
                href="tel:+523336128900"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-medium">(33) 3612-8900</span>
              </a>
              <span className="text-slate-600">·</span>

              {/* Customer Portal Shortcut */}
              <button
                onClick={() => {
                  setViewMode('customer');
                  setCustomerTab('mis_compras');
                }}
                className="flex items-center gap-1 text-cyan-300 hover:text-white transition-colors cursor-pointer font-medium"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mis Compras ({activeCustomer?.name.split(' ')[1] || 'Médico'})</span>
              </button>

              <span className="text-slate-600">·</span>
              <button
                onClick={() => setIsFormalQuoteOpen(true)}
                className="flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Cotización Institucional</span>
              </button>

              <span className="text-slate-600">·</span>
              <button
                onClick={() => {
                  setViewMode(viewMode === 'admin' ? 'store' : 'admin');
                  if (viewMode === 'store') setAdminTab('dashboard');
                }}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded font-bold text-xs transition-colors bg-cyan-600 text-white hover:bg-cyan-500 cursor-pointer shadow-2xs"
              >
                {viewMode === 'store' ? (
                  <>
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Modo Administrador</span>
                  </>
                ) : (
                  <>
                    <Store className="w-3.5 h-3.5" />
                    <span>Ver Tienda (Cliente)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER ROW (NO OVERFLOW, PROPORTIONAL ON ALL SCREENS) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div className="min-w-0 flex-1 sm:flex-initial">
            <button
              onClick={() => setViewMode('store')}
              className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer max-w-full"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-900 flex items-center justify-center text-white shadow-md shadow-cyan-900/10 group-hover:scale-105 transition-transform shrink-0">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 truncate">
                    LAPAROSCOPIC<span className="text-cyan-600">.MX</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 rounded px-1 sm:px-1.5 py-0.2 shrink-0">
                    MÉXICO
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate hidden sm:block">
                  Instrumental y Equipamiento Quirúrgico Especializado
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar with Live Suggestions Dropdown */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Buscar por insumo, SKU, trocares, clips..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-800 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Desktop Suggestions */}
            {isSearchFocused && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100">
                <div className="p-2 text-[10px] font-bold uppercase text-slate-400 bg-slate-50">
                  Resultados sugeridos
                </div>
                {filteredSuggestions.map(p => (
                  <button
                    key={p.id}
                    onMouseDown={() => {
                      setSelectedProduct(p);
                      setSearchQuery('');
                    }}
                    className="w-full p-2.5 text-left flex items-center justify-between hover:bg-cyan-50/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <img src={p.image} alt={p.name} className="w-7 h-7 rounded object-cover border border-slate-100 shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{p.sku} · {p.brand}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-800 shrink-0 ml-2">
                      ${p.price.toLocaleString('es-MX')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Quote Button */}
            <button
              onClick={() => setIsFormalQuoteOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>Cotizador</span>
            </button>

            {/* Cart Trigger Button (Always fits comfortably on mobile and desktop) */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs font-semibold hidden md:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-4.5 h-4.5 sm:min-w-5 sm:h-5 px-1 text-[10px] sm:text-[11px] font-black bg-white text-cyan-900 rounded-full shadow-2xs">
                  {cartCount}
                </span>
              )}
              {total > 0 && (
                <span className="text-xs font-medium text-cyan-100 hidden xl:inline border-l border-cyan-600/80 pl-2">
                  ${total.toLocaleString('es-MX')}
                </span>
              )}
            </button>

            {/* Desktop Role Toggles */}
            <div className="border-l border-slate-200 pl-3 hidden sm:flex items-center gap-2">
              <button
                onClick={() => {
                  setViewMode('customer');
                  setCustomerTab('mis_compras');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors cursor-pointer"
                title="Acceder a Mis Compras y Datos Quirúrgicos"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Portal Médico</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('admin');
                  setAdminTab('dashboard');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                title="Ir al panel de administración"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-cyan-600" />
                <span>Admin Tienda</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. MOBILE SEARCH INPUT (CLEAN FULL WIDTH BELOW LOGO ON < MD) */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar instrumental, trocar, clips..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
