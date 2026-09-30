import React from 'react';
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
  ChevronRight
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { adminTab, setAdminTab, setViewMode, resetToDefaultData, orders, products, activeCarts } = useStore();

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Panel General',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'products' as const,
      label: 'Catálogo de Productos',
      icon: <Package className="w-4 h-4" />,
      badge: products.length
    },
    {
      id: 'register_product' as const,
      label: 'Registrar Producto',
      icon: <PlusCircle className="w-4 h-4" />
    },
    {
      id: 'orders' as const,
      label: 'Seguimiento a Ventas',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: orders.filter(o => o.orderStatus !== 'entregado' && o.orderStatus !== 'cancelado').length
    },
    {
      id: 'customers' as const,
      label: 'Clientes Registrados',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'carts' as const,
      label: 'Gestión de Carritos',
      icon: <ShoppingCart className="w-4 h-4" />,
      badge: activeCarts.length
    },
    {
      id: 'coupons' as const,
      label: 'Cupones & Ofertas',
      icon: <Tag className="w-4 h-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white">
                  LAPAROSCOPIC<span className="text-cyan-400">.MX</span>
                </span>
                <span className="text-[10px] font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
                  ADMINISTRADOR ACTIVO
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reset data button for easy testing */}
            <button
              onClick={() => {
                if (window.confirm('¿Restablecer datos de muestra de Laparoscopic.mx?')) {
                  resetToDefaultData();
                }
              }}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Restaurar base de datos a valores iniciales"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restablecer Datos Demo</span>
            </button>

            {/* Switch to customer store view */}
            <button
              onClick={() => setViewMode('store')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Ver Tienda (Cliente)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Active Tab Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Navigation Sidebar */}
        <aside className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 space-y-1 sticky top-20">
          <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Navegación Administrativa
          </div>

          {navItems.map(item => {
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 mt-2 px-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-cyan-800 font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              <span>Rol Administrador Activo</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Permite registrar productos, cambiar stock, supervisar pedidos, clientes y carritos.
            </p>
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="md:col-span-9">
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
