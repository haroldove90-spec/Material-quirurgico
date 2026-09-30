import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  FileCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Settings
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, setIsFormalQuoteOpen, setViewMode, setAdminTab } = useStore();

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background medical grid texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800/80 rounded-md px-3 py-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tienda Oficial Especializada en Cirugía Laparoscópica</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Precisión Quirúrgica y Suministros para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                Laparoscopía en México
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Abastecemos a hospitales privados, instituciones de salud y cirujanos especialistas con instrumental de 5mm, engrapadoras endoscópicas articuladas, clips de polímero Weck® Hem-o-lok y torres 4K.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('laparoscopia');
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                <span>Ver Instrumental Disponible</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsFormalQuoteOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>Cotización Formal para Hospital</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('admin');
                  setAdminTab('dashboard');
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg text-xs font-semibold border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4 text-cyan-400" />
                <span>Panel de Administración Activo</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>COFEPRIS Vigente</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Envíos Todo México</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Garantía Quirúrgica</span>
              </div>
            </div>
          </div>

          {/* Quick Category Feature Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedCategory('laparoscopia')}
              className="p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 transition-all text-left group cursor-pointer"
            >
              <div className="text-cyan-400 font-semibold text-xs mb-1">ACCESOS & PINZAS</div>
              <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Instrumental 5mm
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Maryland, Metzenbaum, Babcock y Trocares ópticos.
              </p>
            </button>

            <button
              onClick={() => setSelectedCategory('cierre_vasos')}
              className="p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 transition-all text-left group cursor-pointer"
            >
              <div className="text-emerald-400 font-semibold text-xs mb-1">CIERRE SEGURO</div>
              <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Clips Hem-o-lok®
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Polímero inerte Weck® y pinzas aplicadoras 10mm.
              </p>
            </button>

            <button
              onClick={() => setSelectedCategory('engrapado')}
              className="p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 transition-all text-left group cursor-pointer"
            >
              <div className="text-amber-400 font-semibold text-xs mb-1">CIRUGÍA BARIÁTRICA</div>
              <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Engrapado 60mm
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Grapadoras articuladas y recargas de titanio.
              </p>
            </button>

            <button
              onClick={() => setSelectedCategory('torres_equipos')}
              className="p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 transition-all text-left group cursor-pointer"
            >
              <div className="text-purple-400 font-semibold text-xs mb-1">EQUIPAMIENTO 4K</div>
              <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                Torres y Monitores
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Sistemas de video 4K UHD, insufladores y fuentes LED.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
