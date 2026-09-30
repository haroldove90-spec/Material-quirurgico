import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminRegisterProduct } from './AdminRegisterProduct';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminCartManagement } from './AdminCartManagement';
import { AdminCoupons } from './AdminCoupons';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Users,
  ShoppingCart,
  Tag,
  Store,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { adminTab, setAdminTab, setViewMode, resetToDefaultData, orders, products, activeCarts } = useStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lowStockCount = products.filter(p => p.stock <= (p.minStockThreshold || p.minStockAlert || 5)).length;
  const pendingOrdersCount = orders.filter(o => o.orderStatus !== 'entregado' && o.orderStatus !== 'cancelado').length;

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Panel General',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />
    },
    {
      id: 'products' as const,
      label: 'Catálogo de Productos',
      icon: <Package className="w-5 h-5 shrink-0" />,
      badge: products.length,
      badgeColor: 'bg-slate-200 text-slate-800'
    },
    {
      id: 'register_product' as const,
      label: 'Registrar Producto',
      icon: <PlusCircle className="w-5 h-5 shrink-0" />
    },
    {
      id: 'orders' as const,
      label: 'Seguimiento a Ventas',
      icon: <ShoppingBag className="w-5 h-5 shrink-0" />,
      badge: pendingOrdersCount,
      badgeColor: pendingOrdersCount > 0 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
    },
    {
      id: 'customers' as const,
      label: 'Clientes Registrados',
      icon: <Users className="w-5 h-5 shrink-0" />
    },
    {
      id: 'carts' as const,
      label: 'Gestión de Carritos',
      icon: <ShoppingCart className="w-5 h-5 shrink-0" />,
      badge: activeCarts.length,
      badgeColor: 'bg-cyan-500 text-white'
    },
    {
      id: 'coupons' as const,
      label: 'Cupones & Ofertas',
      icon: <Tag className="w-5 h-5 shrink-0" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col md:flex-row">
      {/* FULLSCREEN LATERAL SIDEBAR MENU (DESKTOP & LARGE SCREENS) */}
      <aside
        className={`hidden md:flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300 z-30 sticky top-0 h-screen ${
          isSidebarCollapsed ? 'w-20' : 'w-68'
        }`}
      >
        {/* Brand & Sidebar Toggle */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-bold shrink-0 shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            {!isSidebarCollapsed && (
              <div className="truncate">
                <span className="text-base font-black tracking-tight text-white block">
                  LAPAROSCOPIC<span className="text-cyan-400">.MX</span>
                </span>
                <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                  Panel Admin
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isSidebarCollapsed ? 'Expandir menú lateral' : 'Colapsar menú lateral'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick KPI Strip when expanded */}
        {!isSidebarCollapsed && (
          <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800/80 text-[11px] flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ventas Activas: <strong className="text-white">{orders.length}</strong></span>
            </div>
            {lowStockCount > 0 && (
              <div className="flex items-center gap-1 text-amber-400" title="Productos con stock bajo">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="font-bold">{lowStockCount} alertas</span>
              </div>
            )}
          </div>
        )}

        {/* Nav Links */}
        <div className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {!isSidebarCollapsed ? 'Módulos Administrativos' : 'Menú'}
          </div>

          {navItems.map(item => {
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                } ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isSidebarCollapsed && item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      item.badgeColor || 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom actions & shortcuts */}
        <div className="p-3 border-t border-slate-800 space-y-2 bg-slate-950/40">
          {/* Switch to Customer Portal */}
          <button
            onClick={() => setViewMode('customer')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
            title="Ir al Portal de Cliente (Médico)"
          >
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            {!isSidebarCollapsed && <span>Portal de Cliente</span>}
          </button>

          {/* Switch to Storefront */}
          <button
            onClick={() => setViewMode('store')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
            title="Ver Tienda Pública"
          >
            <Store className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Ver Tienda</span>}
          </button>

          {/* Reset Demo Data button */}
          {!isSidebarCollapsed && (
            <button
              onClick={() => {
                if (window.confirm('¿Restablecer datos de muestra de Laparoscopic.mx?')) {
                  resetToDefaultData();
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer Datos Demo</span>
            </button>
          )}
        </div>
      </aside>

      {/* MOBILE / TABLET TOP HEADER */}
      <div className="md:hidden bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 bg-slate-800 rounded-lg text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white">
              LAPAROSCOPIC<span className="text-cyan-400">.MX</span>
            </span>
            <span className="text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
              ADMIN
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('store')}
            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Tienda</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 animate-in slide-in-from-top-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
            Navegación Admin
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setAdminTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left ${
                  adminTab === item.id
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setViewMode('customer');
                setIsMobileMenuOpen(false);
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Portal Cliente</span>
            </button>
            <button
              onClick={() => {
                resetToDefaultData();
                setIsMobileMenuOpen(false);
              }}
              className="text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer Demo</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN ADMIN WORKSPACE (RIGHT SIDE) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Breadcrumb & Quick Action Bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Administración</span>
            <span>/</span>
            <span className="font-bold text-slate-900 capitalize">
              {navItems.find(n => n.id === adminTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[11px] text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sistema en Línea · Servidor México</span>
            </div>

            <button
              onClick={() => setViewMode('customer')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Ver como Cliente</span>
            </button>
          </div>
        </div>

        {/* Active Tab Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8">
          {adminTab === 'dashboard' && <AdminDashboard />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'register_product' && <AdminRegisterProduct />}
          {adminTab === 'orders' && <AdminOrders />}
          {adminTab === 'customers' && <AdminCustomers />}
          {adminTab === 'carts' && <AdminCartManagement />}
          {adminTab === 'coupons' && <AdminCoupons />}
        </main>
      </div>
    </div>
  );
};
