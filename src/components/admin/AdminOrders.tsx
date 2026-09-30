import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import {
  Search,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Printer,
  X,
  Building2,
  FileText,
  DollarSign,
  ShieldCheck,
  Phone,
  Mail,
  Send
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder } = useStore();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Tracking edit state for modal
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [carrierInput, setCarrierInput] = useState('DHL Express Quirúrgico Priority');

  const filteredOrders = orders.filter(o => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.hospitalOrClinic.toLowerCase().includes(q) ||
        o.billingInfo.rfc.toLowerCase().includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (filterStatus !== 'all' && o.orderStatus !== filterStatus) {
      return false;
    }

    return true;
  });

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setTrackingNumberInput(order.trackingNumber || '');
    setCarrierInput(order.carrier || 'DHL Express Quirúrgico Priority');
  };

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    updateOrderStatus(id, newStatus);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(prev => prev ? { ...prev, orderStatus: newStatus } : null);
    }
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    updateOrderStatus(
      selectedOrder.id,
      selectedOrder.orderStatus === 'pendiente' ? 'enviado' : selectedOrder.orderStatus,
      trackingNumberInput,
      carrierInput
    );
    setSelectedOrder(prev => prev ? {
      ...prev,
      trackingNumber: trackingNumberInput,
      carrier: carrierInput,
      orderStatus: prev.orderStatus === 'pendiente' ? 'enviado' : prev.orderStatus
    } : null);
  };

  const printOrderVoucher = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Seguimiento a Ventas y Pedidos Hospitalarios
          </h1>
          <p className="text-xs text-slate-500">
            Control de órdenes de compra, validación de pagos SPEI y asignación de guías de envío
          </p>
        </div>

        {/* Quick status count badges */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md font-semibold">
            {orders.filter(o => o.orderStatus === 'pendiente').length} Pendientes
          </span>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md font-semibold">
            {orders.filter(o => o.orderStatus === 'preparacion_quirurgica').length} En Quirófano
          </span>
          <span className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-md font-semibold">
            {orders.filter(o => o.orderStatus === 'enviado').length} Con Guía
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por Folio (LAP-2026-...), Dr., Hospital, RFC..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
        >
          <option value="all">Todos los Estados</option>
          <option value="pendiente">Pendiente de Pago / Validación</option>
          <option value="confirmado">Pago Confirmado</option>
          <option value="preparacion_quirurgica">En Preparación Quirúrgica</option>
          <option value="enviado">Enviado con Guía DHL / FedEx</option>
          <option value="entregado">Entregado en Quirófano</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <th className="p-3">Folio y Fecha</th>
                <th className="p-3">Cliente / Hospital</th>
                <th className="p-3">Artículos</th>
                <th className="p-3">Total MXN</th>
                <th className="p-3">Método y Pago</th>
                <th className="p-3">Estado del Pedido</th>
                <th className="p-3 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No hay ventas registradas que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Folio */}
                      <td className="p-3">
                        <div className="font-mono font-bold text-cyan-800">{order.id}</div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>

                      {/* Doctor / Hospital */}
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{order.customer.name}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-xs">
                          {order.customer.hospitalOrClinic} ({order.shippingAddress.city})
                        </div>
                      </td>

                      {/* Items */}
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">
                          {order.items.reduce((a, b) => a + b.quantity, 0)} pzas
                        </span>
                        <div className="text-[10px] text-slate-400 truncate max-w-40">
                          {order.items[0]?.productName}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="p-3 font-mono font-extrabold text-slate-900">
                        ${order.total.toLocaleString('es-MX')}
                      </td>

                      {/* Payment */}
                      <td className="p-3">
                        <div className="flex items-center gap-1.5 uppercase text-[10px] font-bold">
                          <span>{order.paymentMethod}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded ${
                              order.paymentStatus === 'pagado'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </td>

                      {/* Order status dropdown */}
                      <td className="p-3">
                        <select
                          value={order.orderStatus}
                          onChange={e => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                          className={`text-xs font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                            order.orderStatus === 'entregado'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : order.orderStatus === 'enviado'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : order.orderStatus === 'preparacion_quirurgica'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : order.orderStatus === 'cancelado'
                              ? 'bg-rose-50 text-rose-800 border-rose-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="confirmado">Confirmado</option>
                          <option value="preparacion_quirurgica">En Quirófano (Prep)</option>
                          <option value="enviado">Enviado con Guía</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleOpenDetail(order)}
                          className="p-1.5 text-cyan-700 hover:bg-cyan-50 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Order Dossier Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan-400 font-bold text-base">
                  {selectedOrder.id}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">
                  {new Date(selectedOrder.createdAt).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={printOrderVoucher}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg font-semibold cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Recibo</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Status and Logistics Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      Estado Actual del Envío Quirúrgico
                    </span>
                    <span className="text-sm font-extrabold uppercase text-cyan-900">
                      {selectedOrder.orderStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-600">Cambiar estado:</span>
                    <select
                      value={selectedOrder.orderStatus}
                      onChange={e => handleUpdateStatus(selectedOrder.id, e.target.value as OrderStatus)}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 cursor-pointer"
                    >
                      <option value="pendiente">Pendiente de Pago</option>
                      <option value="confirmado">Pago Confirmado</option>
                      <option value="preparacion_quirurgica">En Preparación Quirúrgica</option>
                      <option value="enviado">Enviado con Guía</option>
                      <option value="entregado">Entregado en Hospital</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>

                {/* Tracking Code Form */}
                <form onSubmit={handleSaveTracking} className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="text"
                      value={trackingNumberInput}
                      onChange={e => setTrackingNumberInput(e.target.value)}
                      placeholder="Número de Guía (ej. DHL-941829031)"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <select
                    value={carrierInput}
                    onChange={e => setCarrierInput(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="DHL Express Quirúrgico Priority">DHL Express Priority</option>
                    <option value="FedEx Medical Priority">FedEx Medical Priority</option>
                    <option value="Estafeta Hospitalaria">Estafeta Hospitalaria</option>
                    <option value="Mensajería Local Quirófano Directo">Mensajería Local Inmediata</option>
                  </select>

                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg cursor-pointer"
                  >
                    Guardar Guía
                  </button>
                </form>
              </div>

              {/* Client and Destination Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Doctor details */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-cyan-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    Médico / Comprador
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{selectedOrder.customer.name}</div>
                  <div className="text-slate-600">{selectedOrder.customer.hospitalOrClinic}</div>
                  <div className="text-slate-500">Cédula Profesional: {selectedOrder.customer.cedulaProfesional || 'En trámite'}</div>
                  <div className="flex items-center gap-2 text-slate-500 pt-1">
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{selectedOrder.customer.email}</span>
                  </div>
                </div>

                {/* Delivery and Ward */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-cyan-800 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    Dirección de Entrega Quirófano
                  </span>
                  <div className="font-semibold text-slate-800">
                    {selectedOrder.shippingAddress.street} #{selectedOrder.shippingAddress.exteriorNumber}
                  </div>
                  <div className="text-slate-600">
                    {selectedOrder.shippingAddress.neighborhood}, CP {selectedOrder.shippingAddress.zipCode}
                  </div>
                  <div className="text-slate-600 font-medium">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}
                  </div>
                  <div className="text-slate-700 bg-amber-50 p-2 rounded border border-amber-200 font-medium text-[11px] mt-1">
                    📍 {selectedOrder.shippingAddress.hospitalWard || 'Entregar en recepción médica'}
                  </div>
                </div>
              </div>

              {/* Billing Info CFDI */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-cyan-700" />
                  Datos Fiscales CFDI 4.0
                </span>
                {selectedOrder.billingInfo.requiresInvoice ? (
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>RFC: <strong className="font-mono">{selectedOrder.billingInfo.rfc}</strong></div>
                    <div>Razón Social: <strong>{selectedOrder.billingInfo.legalName}</strong></div>
                    <div>Régimen: <span>{selectedOrder.billingInfo.taxRegime}</span></div>
                    <div>Uso CFDI: <span>{selectedOrder.billingInfo.cfdiUse}</span></div>
                  </div>
                ) : (
                  <div className="text-slate-500 italic">No solicitó factura CFDI. Nota de venta médica simple.</div>
                )}
              </div>

              {/* Items Breakdown Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                      <th className="p-2.5">Insumo</th>
                      <th className="p-2.5">SKU</th>
                      <th className="p-2.5 text-center">Cant.</th>
                      <th className="p-2.5 text-right">Precio Unit.</th>
                      <th className="p-2.5 text-right">Importe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-semibold text-slate-800">{item.productName}</td>
                        <td className="p-2.5 font-mono text-cyan-800">{item.sku}</td>
                        <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                        <td className="p-2.5 text-right font-mono">${item.unitPrice.toLocaleString('es-MX')}</td>
                        <td className="p-2.5 text-right font-mono font-extrabold text-slate-900">
                          ${item.subtotal.toLocaleString('es-MX')} MXN
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono">${selectedOrder.subtotal.toLocaleString('es-MX')} MXN</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Descuento aplicado:</span>
                      <span className="font-mono">-${selectedOrder.discount.toLocaleString('es-MX')} MXN</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>IVA Trasladado (16%):</span>
                    <span className="font-mono">${selectedOrder.iva.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Envío Quirúrgico:</span>
                    <span className="font-mono">
                      {selectedOrder.shippingCost === 0 ? 'GRATIS' : `$${selectedOrder.shippingCost.toLocaleString('es-MX')} MXN`}
                    </span>
                  </div>
                  <div className="pt-2 border-t-2 border-slate-300 flex justify-between font-black text-sm text-slate-900">
                    <span>TOTAL:</span>
                    <span className="font-mono text-cyan-900 font-extrabold">
                      ${selectedOrder.total.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
