import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Stethoscope, ShieldCheck, Phone, Mail, MapPin, LayoutDashboard, Truck, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setViewMode, setAdminTab, setSelectedCategory, setIsFormalQuoteOpen } = useStore();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Banner highlights */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Registros Sanitarios COFEPRIS</div>
              <div className="text-[11px] text-slate-400">Insumos 100% regulados y vigentes</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Envíos Urgentes a Quirófano</div>
              <div className="text-[11px] text-slate-400">Guías express a cualquier hospital</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Facturación Médica CFDI 4.0</div>
              <div className="text-[11px] text-slate-400">Emisión automática con RFC del SAT</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Soporte por Biomédicos</div>
              <div className="text-[11px] text-slate-400">Asesoría especializada 24/7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-700 flex items-center justify-center text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="text-base font-black text-white tracking-tight">
              LAPAROSCOPIC<span className="text-cyan-400">.MX</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Especialistas en instrumental quirúrgico laparoscópico, endosutura, engrapado endoscópico y suministros médicos en México.
          </p>
          <div className="text-[10px] text-slate-500 font-mono">
            Operado por PMI Servicios Quirúrgicos S.A. de C.V.
          </div>
        </div>

        {/* Categories column */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
            Líneas Quirúrgicas
          </h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <button
                onClick={() => setSelectedCategory('laparoscopia')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Pinzas Laparoscópicas 5mm
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('engrapado')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Engrapadoras Quirúrgicas 60mm
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('cierre_vasos')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Clips de Polímero Hem-o-lok®
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('consumibles')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Endo Bags y Antiempañantes
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('torres_equipos')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Torres de Laparoscopía 4K UHD
              </button>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
            Atención Hospitalaria
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>(33) 3612-8900 / (55) 8432-1100</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>ventas@laparoscopic.mx</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Zapopan, Jalisco & CDMX, México</span>
            </li>
            <li className="pt-1">
              <button
                onClick={() => setIsFormalQuoteOpen(true)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline cursor-pointer"
              >
                Solicitar Cotización Formal
              </button>
            </li>
          </ul>
        </div>

        {/* Portals entry */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-xs">
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Accesos Directos por Rol</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Administración completa de productos y seguimiento a ventas, o acceso a compras del médico/cliente.
          </p>

          <button
            onClick={() => {
              setViewMode('customer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Portal Médico / Mis Compras</span>
          </button>

          <button
            onClick={() => {
              setViewMode('admin');
              setAdminTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Abrir Panel de Control Admin</span>
          </button>
        </div>
      </div>

      {/* Copyright bottom */}
      <div className="border-t border-slate-900 py-4 px-4 sm:px-6 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Laparoscopic.mx. Todos los derechos reservados. Cumplimiento con la regulación sanitaria mexicana de dispositivos médicos de la Ley General de Salud.
      </div>
    </footer>
  );
};
