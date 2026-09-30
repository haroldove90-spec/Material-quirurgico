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
  ChevronDown,
  Stethoscope,
  X,
  UserCheck,
  PackageCheck
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
      {/* Top Clinical Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              COFEPRIS Registros Vigentes
            </span>
            <span className="hidden md:inline text-slate-600">·</span>
            <span className="hidden md:inline text-slate-400">
              Distribuidor Autorizado Weck® / Teleflex / Scope QX / Purple Surgical
            </span>
            <span className="hidden lg:inline text-slate-600">·</span>
            <span className="hidden lg:inline text-emerald-400">
              Envíos Refrigerados y Asegurados a todo México
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <a
              href="tel:+523336128900"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>(33) 3612-8900</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">·</span>

            {/* Customer Portal Shortcut */}
            <button
              onClick={() => {
                setViewMode('customer');
                setCustomerTab('mis_compras');
              }}
              className="hidden sm:flex items-center gap-1 text-cyan-300 hover:text-white transition-colors cursor-pointer font-medium"
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
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded font-medium text-xs transition-colors bg-cyan-600 text-white hover:bg-cyan-500 cursor-pointer shadow-2xs"
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

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('store')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-900 flex items-center justify-center text-white shadow-md shadow-cyan-900/10 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    LAPAROSCOPIC<span className="text-cyan-600">.MX</span>
                  </span>
                  <span className="text-[10px] font-semibold text-cyan-800 bg-cyan-50 border border-cyan-200 rounded px-1.5 py-0.2">
                    MÉXICO
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Instrumental y Equipamiento Quirúrgico
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar with Live Dropdown */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Buscar por pinza, trocar, grapas, Weck, SKU..."
                className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-cyan-500 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Suggestions dropdown */}
            {isSearchFocused && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden z-50">
                <div className="p-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Resultados encontrados ({filteredSuggestions.length})
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {filteredSuggestions.map(product => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsSearchFocused(false);
                      }}
                      className="w-full p-2.5 text-left hover:bg-cyan-50/60 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-900 truncate">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span>SKU: {product.sku}</span>
                          <span>·</span>
                          <span className="font-mono text-cyan-700 font-semibold">
                            ${product.price.toLocaleString('es-MX')} MXN
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Actions: Cotizar + Cart + Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFormalQuoteOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>Cotizador Hospital</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white transition-all shadow-sm cursor-pointer"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold bg-white text-cyan-900 rounded-full">
                  {cartCount}
                </span>
              )}
              {total > 0 && (
                <span className="text-xs font-medium text-cyan-100 hidden md:inline border-l border-cyan-600 pl-2">
                  ${total.toLocaleString('es-MX')}
                </span>
              )}
            </button>

            {/* Customer Portal & Admin Toggles */}
            <div className="border-l border-slate-200 pl-3 hidden sm:flex items-center gap-2">
              <button
                onClick={() => {
                  setViewMode('customer');
                  setCustomerTab('mis_compras');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer"
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
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                title="Ir al panel de administración"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-cyan-600" />
                <span>Admin Tienda</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar instrumental, trocar, clips..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-slate-800"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
