import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Printer, Download, ShieldCheck, Building2, Stethoscope } from 'lucide-react';

export const FormalQuoteModal: React.FC = () => {
  const { isFormalQuoteOpen, setIsFormalQuoteOpen, cart, subtotal, discountAmount, iva, shippingCost, total } = useStore();
  const [hospitalName, setHospitalName] = useState('Hospital General / Privado de Especialidades');
  const [doctorName, setDoctorName] = useState('Dr. Cirujano Especialista');
  const [quoteFolio] = useState(() => `COT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);

  if (!isFormalQuoteOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Action Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold">Generador de Cotización Formal Quirúrgica</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={() => setIsFormalQuoteOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-800 bg-white" id="formal-quote-doc">
          {/* Document Header with Logo and Folio */}
          <div className="flex justify-between items-start border-b-2 border-cyan-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-800 flex items-center justify-center text-white">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900">
                  LAPAROSCOPIC<span className="text-cyan-700">.MX</span>
                </h1>
                <p className="text-[11px] text-slate-500">PMI Servicios Quirúrgicos S.A. de C.V.</p>
                <p className="text-[10px] text-slate-400">RFC: PSQ180424MQ8 · Zapopan, Jalisco, México</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Folio de Cotización</div>
              <div className="text-base font-black font-mono text-cyan-800">{quoteFolio}</div>
              <div className="text-[11px] text-slate-500">Fecha: {currentDate}</div>
              <div className="text-[10px] text-amber-800 font-semibold mt-0.5">Válida por 15 días naturales</div>
            </div>
          </div>

          {/* Client inputs for customization */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">
                Hospital / Institución Destino:
              </label>
              <input
                type="text"
                value={hospitalName}
                onChange={e => setHospitalName(e.target.value)}
                className="w-full text-xs font-semibold bg-white border border-slate-300 rounded px-2 py-1 text-slate-800"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">
                Atención a (Cirujano / Compras):
              </label>
              <input
                type="text"
                value={doctorName}
                onChange={e => setDoctorName(e.target.value)}
                className="w-full text-xs font-semibold bg-white border border-slate-300 rounded px-2 py-1 text-slate-800"
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-2.5">SKU</th>
                  <th className="p-2.5">Descripción del Insumo Quirúrgico</th>
                  <th className="p-2.5 text-center">Cant.</th>
                  <th className="p-2.5 text-right">Precio Unit. (MXN)</th>
                  <th className="p-2.5 text-right">Importe (MXN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-slate-400">
                      No hay insumos en el carrito. Agregue productos antes de generar la cotización.
                    </td>
                  </tr>
                ) : (
                  cart.map(item => (
                    <tr key={item.product.id}>
                      <td className="p-2.5 font-mono text-cyan-800 font-semibold">{item.product.sku}</td>
                      <td className="p-2.5">
                        <div className="font-semibold text-slate-900">{item.product.name}</div>
                        <div className="text-[10px] text-slate-500 italic">
                          {item.product.presentation} · Reg. COFEPRIS: {item.product.cofePristReg}
                        </div>
                      </td>
                      <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                      <td className="p-2.5 text-right font-mono">${item.product.price.toLocaleString('es-MX')}</td>
                      <td className="p-2.5 text-right font-mono font-bold">
                        ${(item.product.price * item.quantity).toLocaleString('es-MX')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Subtotal & Taxes breakdown */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">${subtotal.toLocaleString('es-MX')} MXN</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Descuento aplicado:</span>
                  <span className="font-mono">-${discountAmount.toLocaleString('es-MX')} MXN</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>I.V.A. (16%):</span>
                <span className="font-mono">${iva.toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Flete Hospitalario Asegurado:</span>
                <span className="font-mono">{shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-MX')} MXN`}</span>
              </div>
              <div className="pt-2 border-t-2 border-slate-300 flex justify-between font-black text-sm text-slate-900">
                <span>TOTAL NETO:</span>
                <span className="font-mono text-cyan-900 font-extrabold">${total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>
          </div>

          {/* Commercial & Technical Terms */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 uppercase">Términos Comerciales y Garantía:</div>
            <div>• Precios en Moneda Nacional (MXN) con desglose de IVA para efectos de facturación CFDI 4.0.</div>
            <div>• Tiempos de entrega: 24 a 48 horas hábiles en CDMX, Guadalajara y Monterrey; 48 a 72 horas resto de la República.</div>
            <div>• Todos los insumos cuentan con Registro Sanitario vigente ante COFEPRIS y trazabilidad de lote estéril.</div>
            <div>• Datos bancarios: BBVA Bancomer · CLABE: 0123 2000 1849 2011 88 · Cuenta: 0184 9201 18.</div>
          </div>

          {/* Biomedical signatures */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200 text-center text-[10px]">
            <div>
              <div className="w-36 border-b border-slate-400 mx-auto mb-1"></div>
              <div className="font-bold text-slate-800">Ing. Biomédico Marco A. Navarro</div>
              <div className="text-slate-500">Asesor de Instrumental Quirúrgico Laparoscopic.mx</div>
            </div>
            <div>
              <div className="w-36 border-b border-slate-400 mx-auto mb-1"></div>
              <div className="font-bold text-slate-800">Sello y Firma de Recepción Hospitalaria</div>
              <div className="text-slate-500">Comité de Adquisiciones / Quirófanos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
