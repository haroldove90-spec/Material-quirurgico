import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';
import { MEDICAL_IMAGES } from '../../utils/productImages';
import { PlusCircle, Sparkles, Check, ArrowLeft, Image as ImageIcon, ShieldCheck, Stethoscope } from 'lucide-react';

export const AdminRegisterProduct: React.FC = () => {
  const { addProduct, setAdminTab } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'laparoscopia' as ProductCategory,
    brand: 'Scope QX',
    specialty: 'Cirugía General y Laparoscópica',
    price: 3500,
    comparePrice: 3900,
    stock: 12,
    minStockThreshold: 4,
    presentation: 'Pieza individual reusable en autoclave',
    diameterMm: 5,
    lengthMm: 330,
    cofePristReg: '2418C2024 SSA',
    sterilization: 'Reutilizable Autoclavable (134°C)' as any,
    description: '',
    featuresText: 'Mandíbula de acero quirúrgico templado\nRotación axial continua de 360 grados\nConexión aislada electroquirúrgica estándar monopolar\nPuerto Luer-Lock desmontable para lavado',
    image: MEDICAL_IMAGES.maryland,
    isFeatured: true,
    isActive: true
  });

  const handleGenerateSku = () => {
    const prefix = formData.category === 'laparoscopia' ? 'LAP' : formData.category === 'engrapado' ? 'ENG' : formData.category === 'cierre_vasos' ? 'CIE' : formData.category === 'consumibles' ? 'CON' : 'EQU';
    const rand = Math.floor(100 + Math.random() * 900);
    const code = `${prefix}-${formData.diameterMm || 5}-${rand}`;
    setFormData(prev => ({ ...prev, sku: code }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim()) return;

    const features = formData.featuresText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    addProduct({
      name: formData.name,
      sku: formData.sku.toUpperCase(),
      category: formData.category,
      brand: formData.brand,
      specialty: formData.specialty,
      price: Number(formData.price),
      comparePrice: formData.comparePrice ? Number(formData.comparePrice) : undefined,
      stock: Number(formData.stock),
      minStockThreshold: Number(formData.minStockThreshold),
      presentation: formData.presentation,
      diameterMm: formData.diameterMm ? Number(formData.diameterMm) : undefined,
      lengthMm: formData.lengthMm ? Number(formData.lengthMm) : undefined,
      cofePristReg: formData.cofePristReg,
      sterilization: formData.sterilization,
      description: formData.description || `Insumo quirúrgico especializado ${formData.name} para procedimientos de mínima invasión y quirófano.`,
      features,
      image: formData.image,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive
    });

    setAdminTab('products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminTab('products')}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Registrar Nuevo Insumo Quirúrgico
            </h1>
            <p className="text-xs text-slate-500">
              Alta formal de producto para el catálogo de la tienda Laparoscopic.mx
            </p>
          </div>
        </div>

        <button
          onClick={() => setAdminTab('products')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          Ver Catálogo Actual
        </button>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6 text-xs">
        {/* Section 1: Basic Identifiers */}
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-slate-900 uppercase tracking-wide">
            <Stethoscope className="w-4 h-4 text-cyan-600" />
            <span>1. Identificación y Clasificación Quirúrgica</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Nombre Completo del Producto *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Pinza Laparoscópica Biopsia 5mm x 330mm"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20 text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Código SKU *
                <button
                  type="button"
                  onClick={handleGenerateSku}
                  className="ml-2 text-[10px] text-cyan-700 hover:underline font-normal"
                >
                  (Generar auto)
                </button>
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value })}
                placeholder="LAP-5-829"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono uppercase focus:ring-2 focus:ring-cyan-500/20 text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Categoría Principal *</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20 text-xs cursor-pointer"
              >
                <option value="laparoscopia">Instrumental Laparoscópico (Pinzas / Accesos)</option>
                <option value="engrapado">Engrapado Quirúrgico (Grapadoras / Recargas)</option>
                <option value="cierre_vasos">Cierre de Vasos (Clips Hem-o-lok / Aplicadores)</option>
                <option value="consumibles">Consumibles & Accesorios (Endo Bags / Mallas)</option>
                <option value="torres_equipos">Torres de Laparoscopía & Equipos 4K</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Marca / Fabricante *</label>
              <input
                type="text"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Scope QX, Metzen Medical, Teleflex..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20 text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Especialidad Sugerida *</label>
              <input
                type="text"
                value={formData.specialty}
                onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                placeholder="Cirugía General, Bariátrica, Ginecología..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20 text-xs"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing and Inventory */}
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-slate-900 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>2. Precios e Inventario en Quirófano</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Precio de Venta ($ MXN) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Precio Regular / Tachado ($ MXN)</label>
              <input
                type="number"
                value={formData.comparePrice}
                onChange={e => setFormData({ ...formData, comparePrice: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Existencias Iniciales (Stock) *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alerta Stock Mínimo *</label>
              <input
                type="number"
                value={formData.minStockThreshold}
                onChange={e => setFormData({ ...formData, minStockThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Regulatory & Technical Specs */}
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-slate-900 uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <span>3. Datos Sanitarios y Ficha Técnica</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Registro Sanitario COFEPRIS *</label>
              <input
                type="text"
                value={formData.cofePristReg}
                onChange={e => setFormData({ ...formData, cofePristReg: e.target.value })}
                placeholder="2418C2024 SSA"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Esterilización *</label>
              <select
                value={formData.sterilization}
                onChange={e => setFormData({ ...formData, sterilization: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
              >
                <option value="Reutilizable Autoclavable (134°C)">Reutilizable Autoclavable (134°C)</option>
                <option value="Estéril Desechable (ETO)">Estéril Desechable (ETO)</option>
                <option value="No Estéril / Equipo">No Estéril / Equipo Electromédico</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Presentación Comercial *</label>
              <input
                type="text"
                value={formData.presentation}
                onChange={e => setFormData({ ...formData, presentation: e.target.value })}
                placeholder="Caja c/6 piezas, Pieza individual..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Diámetro (mm)</label>
              <input
                type="number"
                value={formData.diameterMm}
                onChange={e => setFormData({ ...formData, diameterMm: Number(e.target.value) })}
                placeholder="5"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Longitud de Vástago (mm)</label>
              <input
                type="number"
                value={formData.lengthMm}
                onChange={e => setFormData({ ...formData, lengthMm: Number(e.target.value) })}
                placeholder="330"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-cyan-600 focus:ring-cyan-500/20"
                />
                <span>Publicar en Tienda</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-cyan-600 focus:ring-cyan-500/20"
                />
                <span>Destacar en Portada</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Imagery & Features */}
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-slate-900 uppercase tracking-wide">
            <ImageIcon className="w-4 h-4 text-cyan-600" />
            <span>4. Imagen y Especificaciones Quirúrgicas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Seleccionar Foto Predefinida o Ingresar URL</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {/* Preset quick thumbnail pickers */}
              <div className="grid grid-cols-6 gap-2">
                {Object.entries(MEDICAL_IMAGES).slice(0, 6).map(([key, url]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: url })}
                    className={`aspect-square rounded-lg border overflow-hidden relative ${
                      formData.image === url ? 'ring-2 ring-cyan-600 border-transparent' : 'border-slate-200'
                    }`}
                  >
                    <img src={url} alt={key} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Especificaciones Técnicas (una por línea)
              </label>
              <textarea
                rows={4}
                value={formData.featuresText}
                onChange={e => setFormData({ ...formData, featuresText: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500/20 font-mono leading-relaxed"
                placeholder="Una especificación por renglón..."
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setAdminTab('products')}
            className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Dar de Alta Insumo en Tienda</span>
          </button>
        </div>
      </form>
    </div>
  );
};
