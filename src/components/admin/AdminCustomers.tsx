import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Customer } from '../../types';
import {
  Search,
  UserPlus,
  Phone,
  Mail,
  Building,
  DollarSign,
  ShoppingBag,
  MessageCircle,
  X,
  Stethoscope,
  ExternalLink
} from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { customers, addCustomer, orders, setAdminTab } = useStore();

  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // New customer form
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    hospitalOrClinic: '',
    specialty: 'Cirugía General y Laparoscópica',
    cedulaProfesional: '',
    rfc: '',
    city: 'Guadalajara',
    state: 'Jalisco',
    status: 'activo' as any
  });

  const filteredCustomers = customers.filter(c => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.hospitalOrClinic.toLowerCase().includes(q) ||
        c.specialty.toLowerCase().includes(q) ||
        (c.rfc && c.rfc.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) return;

    addCustomer({
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      hospitalOrClinic: newCustomer.hospitalOrClinic,
      specialty: newCustomer.specialty,
      cedulaProfesional: newCustomer.cedulaProfesional || 'En trámite',
      rfc: newCustomer.rfc,
      city: newCustomer.city,
      state: newCustomer.state,
      status: newCustomer.status
    });

    setIsAddModalOpen(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      hospitalOrClinic: '',
      specialty: 'Cirugía General y Laparoscópica',
      cedulaProfesional: '',
      rfc: '',
      city: 'Guadalajara',
      state: 'Jalisco',
      status: 'activo'
    });
  };

  const getCustomerOrders = (email: string) => {
    return orders.filter(o => o.customer.email.toLowerCase() === email.toLowerCase());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Directorio de Clientes Médicos e Institucionales
          </h1>
          <p className="text-xs text-slate-500">
            {customers.length} cirujanos, clínicas y jefaturas de quirófano registrados en Laparoscopic.mx
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Registrar Nuevo Cliente</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por médico, hospital, especialidad o RFC..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <th className="p-3">Médico / Comprador</th>
                <th className="p-3">Hospital / Clínica</th>
                <th className="p-3">Contacto</th>
                <th className="p-3">Especialidad & Cédula</th>
                <th className="p-3">Compras Realizadas</th>
                <th className="p-3">Total Acumulado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No se encontraron clientes registrados con ese criterio.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => {
                  const whatsappMsg = encodeURIComponent(
                    `Estimado/a ${customer.name}, le saluda Laparoscopic.mx. Queremos verificar si requiere reabastecimiento de insumos quirúrgicos para sus cirugías en ${customer.hospitalOrClinic}.`
                  );

                  return (
                    <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name */}
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{customer.name}</div>
                        {customer.rfc && (
                          <div className="text-[10px] font-mono text-slate-400">RFC: {customer.rfc}</div>
                        )}
                      </td>

                      {/* Hospital */}
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{customer.hospitalOrClinic}</div>
                        <div className="text-[10px] text-slate-500">{customer.city}, {customer.state}</div>
                      </td>

                      {/* Contact */}
                      <td className="p-3">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Phone className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{customer.email}</span>
                        </div>
                      </td>

                      {/* Specialty */}
                      <td className="p-3">
                        <div className="text-slate-800 font-medium">{customer.specialty}</div>
                        <div className="text-[10px] text-slate-400">Céd. {customer.cedulaProfesional}</div>
                      </td>

                      {/* Total orders */}
                      <td className="p-3">
                        <span className="font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded text-[11px]">
                          {customer.totalOrders} órdenes
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Última: {customer.lastOrderDate}
                        </div>
                      </td>

                      {/* Total spent */}
                      <td className="p-3 font-mono font-extrabold text-slate-900">
                        ${customer.totalSpent.toLocaleString('es-MX')} MXN
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                            title="Contactar por WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => setSelectedCustomer(customer)}
                            className="p-1.5 text-cyan-700 hover:bg-cyan-50 rounded-md transition-colors cursor-pointer"
                            title="Ver historial de pedidos"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Orders History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Historial de Compras: {selectedCustomer.name}
                </h3>
                <p className="text-[11px] text-slate-500">{selectedCustomer.hospitalOrClinic}</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {getCustomerOrders(selectedCustomer.email).length === 0 ? (
                <div className="p-6 text-center text-slate-400">
                  No se registran pedidos previos para este correo.
                </div>
              ) : (
                getCustomerOrders(selectedCustomer.email).map(order => (
                  <div key={order.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-cyan-800">{order.id}</span>
                      <span className="font-bold text-slate-900 font-mono">${order.total.toLocaleString('es-MX')} MXN</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Fecha: {new Date(order.createdAt).toLocaleDateString('es-MX')} · Estado:{' '}
                      <strong className="uppercase text-cyan-900">{order.orderStatus}</strong>
                    </div>
                    <div className="text-[10px] text-slate-600 truncate">
                      {order.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Alta de Médico o Institución Hospitalaria</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Completo del Médico / Titular *</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="Dr. Nombre Apellidos"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hospital / Clínica *</label>
                  <input
                    type="text"
                    value={newCustomer.hospitalOrClinic}
                    onChange={e => setNewCustomer({ ...newCustomer, hospitalOrClinic: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="Hospital Ángeles..."
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cédula Profesional</label>
                  <input
                    type="text"
                    value={newCustomer.cedulaProfesional}
                    onChange={e => setNewCustomer({ ...newCustomer, cedulaProfesional: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="Ej. 7841920"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teléfono (WhatsApp)</label>
                  <input
                    type="text"
                    value={newCustomer.phone}
                    onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="+52 33..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Especialidad</label>
                  <input
                    type="text"
                    value={newCustomer.specialty}
                    onChange={e => setNewCustomer({ ...newCustomer, specialty: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">RFC</label>
                  <input
                    type="text"
                    value={newCustomer.rfc}
                    onChange={e => setNewCustomer({ ...newCustomer, rfc: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs uppercase font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold cursor-pointer"
                >
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
