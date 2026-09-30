import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Package,
  PlusCircle,
  Truck,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { orders, products, customers, activeCarts, setAdminTab, setViewMode } = useStore();

  // Metrics calculations
  const totalSales = orders
    .filter(o => o.orderStatus !== 'cancelado')
    .reduce((acc, o) => acc + o.total, 0);

  const pendingOrders = orders.filter(o => o.orderStatus === 'pendiente' || o.orderStatus === 'confirmado' || o.orderStatus === 'preparacion_quirurgica');
  
  const lowStockProducts = products.filter(p => p.stock <= p.minStockThreshold);

  const activeCartsCount = activeCarts.length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-cyan-950 p-6 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/80 mb-2">
            <span>Panel de Administración Activo</span>
            <span>·</span>
            <span>Laparoscopic.mx</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Control General de Tienda Quirúrgica
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Supervise inventario estéril, dé seguimiento a pedidos hospitalarios y administre clientes y carritos en tiempo real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAdminTab('register_product')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Registrar Producto</span>
          </button>
          <button
            onClick={() => setViewMode('store')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs transition-colors cursor-pointer border border-slate-700"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>Ver Tienda Pública</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Sales */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Ventas Acumuladas</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            ${totalSales.toLocaleString('es-MX')}{' '}
            <span className="text-xs font-semibold text-slate-400">MXN</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Facturación de {orders.length} órdenes registradas</span>
          </div>
        </div>

        {/* KPI 2: Pending Orders */}
        <div
          onClick={() => setAdminTab('orders')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2 cursor-pointer hover:border-cyan-500/50 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pedidos en Seguimiento</span>
            <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {pendingOrders.length}{' '}
            <span className="text-xs font-semibold text-slate-400">órdenes activas</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-cyan-700 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Por preparar / despachar en quirófano</span>
          </div>
        </div>

        {/* KPI 3: Low stock alerts */}
        <div
          onClick={() => setAdminTab('products')}
          className={`p-5 rounded-xl border shadow-2xs space-y-2 cursor-pointer transition-colors ${
            lowStockProducts.length > 0
              ? 'bg-amber-50/60 border-amber-300 hover:border-amber-400'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Alertas Stock Crítico</span>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${lowStockProducts.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {lowStockProducts.length}{' '}
            <span className="text-xs font-semibold text-slate-500">insumos críticos</span>
          </div>
          <div className="text-[11px] text-amber-800 font-medium">
            {lowStockProducts.length > 0 ? 'Requieren resurtido con fabricante' : 'Niveles de inventario óptimos'}
          </div>
        </div>

        {/* KPI 4: Customers & Active Carts */}
        <div
          onClick={() => setAdminTab('customers')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2 cursor-pointer hover:border-cyan-500/50 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Clientes y Carritos</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {customers.length}{' '}
            <span className="text-xs font-semibold text-slate-400">médicos / hospitales</span>
          </div>
          <div className="text-[11px] text-slate-600">
            {activeCartsCount} carritos con insumos pendientes
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Ventas y Pedidos Recientes</h3>
              <p className="text-[11px] text-slate-500">Seguimiento de compras hospitalarias en tiempo real</p>
            </div>
            <button
              onClick={() => setAdminTab('orders')}
              className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos los pedidos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                  <th className="p-3">Folio</th>
                  <th className="p-3">Médico / Hospital</th>
                  <th className="p-3">Insumos</th>
                  <th className="p-3">Total (MXN)</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentOrders.map(order => {
                  let statusBadge = (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {order.orderStatus}
                    </span>
                  );
                  if (order.orderStatus === 'preparacion_quirurgica') {
                    statusBadge = (
                      <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200 flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3 text-blue-600" />
                        Preparando
                      </span>
                    );
                  } else if (order.orderStatus === 'enviado') {
                    statusBadge = (
                      <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded text-[10px] font-bold border border-purple-200 flex items-center gap-1 w-fit">
                        <Truck className="w-3 h-3 text-purple-600" />
                        En Tránsito
                      </span>
                    );
                  } else if (order.orderStatus === 'entregado') {
                    statusBadge = (
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200 flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Entregado
                      </span>
                    );
                  } else if (order.orderStatus === 'pendiente') {
                    statusBadge = (
                      <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-200 flex items-center gap-1 w-fit">
                        Pendiente
                      </span>
                    );
                  }

                  return (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-cyan-800">{order.id}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{order.customer.name}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-48">
                          {order.customer.hospitalOrClinic}
                        </div>
                      </td>
                      <td className="p-3">
                        {order.items.reduce((a, b) => a + b.quantity, 0)} piezas
                      </td>
                      <td className="p-3 font-mono font-extrabold text-slate-900">
                        ${order.total.toLocaleString('es-MX')}
                      </td>
                      <td className="p-3">{statusBadge}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setAdminTab('orders')}
                          className="px-2 py-1 text-[11px] font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded transition-colors cursor-pointer"
                        >
                          Gestionar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Critical Stock & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Critical Stock Box */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Stock Crítico Quirófano</span>
              </div>
              <button
                onClick={() => setAdminTab('products')}
                className="text-[11px] text-cyan-700 font-semibold hover:underline"
              >
                Ajustar inventario
              </button>
            </div>

            {lowStockProducts.length === 0 ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs">
                Todos los insumos tienen inventario suficiente para responder a cirugías.
              </div>
            ) : (
              <div className="space-y-2.5">
                {lowStockProducts.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-900 truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">SKU: {item.sku}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                        {item.stock} pzas
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Acciones Administrativas Rápidas
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => setAdminTab('register_product')}
                className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-800 font-semibold flex items-center justify-between border border-slate-200 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-600" />
                  <span>Alta de Nuevo Instrumental</span>
                </span>
                <span className="text-slate-400">→</span>
              </button>

              <button
                onClick={() => setAdminTab('carts')}
                className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-800 font-semibold flex items-center justify-between border border-slate-200 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-cyan-600" />
                  <span>Ver Carritos Activos y Abandonados</span>
                </span>
                <span className="text-slate-400">→</span>
              </button>

              <button
                onClick={() => setAdminTab('customers')}
                className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-800 font-semibold flex items-center justify-between border border-slate-200 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-600" />
                  <span>Directorio de Médicos y Hospitales</span>
                </span>
                <span className="text-slate-400">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
