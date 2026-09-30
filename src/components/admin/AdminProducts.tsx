import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory } from '../../types';
import {
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  AlertTriangle,
  Check,
  X,
  Shield,
  Layers
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const {
    products,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleProductActive,
    toggleProductFeatured,
    setAdminTab
  } = useStore();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStock, setFilterStock] = useState<string>('all');

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter products
  const filtered = products.filter(p => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterCategory !== 'all' && p.category !== filterCategory) {
      return false;
    }

    if (filterStock === 'low' && (p.stock > p.minStockThreshold || p.stock === 0)) return false;
    if (filterStock === 'out' && p.stock > 0) return false;
    if (filterStock === 'in' && p.stock === 0) return false;

    return true;
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Administración del Catálogo Quirúrgico
          </h1>
          <p className="text-xs text-slate-500">
            {products.length} productos en inventario · {products.filter(p => p.isActive).length} publicados en tienda pública
          </p>
        </div>

        <button
          onClick={() => setAdminTab('register_product')}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Registrar Nuevo Producto</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre, SKU, marca..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        {/* Category filter */}
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
        >
          <option value="all">Todas las Categorías</option>
          <option value="laparoscopia">Instrumental Laparoscópico</option>
          <option value="engrapado">Engrapado Quirúrgico</option>
          <option value="cierre_vasos">Cierre Vascular (Hem-o-lok)</option>
          <option value="consumibles">Consumibles & Endo Bags</option>
          <option value="torres_equipos">Torres & Equipos 4K</option>
        </select>

        {/* Stock filter */}
        <select
          value={filterStock}
          onChange={e => setFilterStock(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
        >
          <option value="all">Todo el Inventario</option>
          <option value="in">En Stock Normal</option>
          <option value="low">Stock Crítico (Bajo)</option>
          <option value="out">Sin Existencias (Agotado)</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <th className="p-3">Insumo / Instrumental</th>
                <th className="p-3">SKU & Registro</th>
                <th className="p-3">Precio MXN</th>
                <th className="p-3">Inventario Físico</th>
                <th className="p-3">Estado en Tienda</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No se encontraron productos coincidentes en el inventario.
                  </td>
                </tr>
              ) : (
                filtered.map(product => {
                  const isLow = product.stock <= product.minStockThreshold && product.stock > 0;
                  const isOut = product.stock === 0;

                  return (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Product details */}
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-11 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0 max-w-xs sm:max-w-md">
                            <div className="flex items-center gap-1.5 text-[10px] text-cyan-800 font-bold uppercase">
                              <span>{product.brand}</span>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-500 font-normal">{product.specialty}</span>
                            </div>
                            <div className="font-bold text-slate-900 truncate">
                              {product.name}
                            </div>
                            <div className="text-[10px] text-slate-500 italic truncate">
                              {product.presentation}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU & COFEPRIS */}
                      <td className="p-3 font-mono">
                        <div className="font-bold text-slate-800">{product.sku}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Shield className="w-3 h-3 text-cyan-600" />
                          <span>{product.cofePristReg}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-3 font-mono font-bold text-slate-900">
                        ${product.price.toLocaleString('es-MX')} MXN
                        {product.comparePrice && (
                          <div className="text-[10px] text-slate-400 line-through">
                            ${product.comparePrice.toLocaleString('es-MX')}
                          </div>
                        )}
                      </td>

                      {/* Stock with quick +/- buttons */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 overflow-hidden">
                            <button
                              onClick={() => updateStock(product.id, product.stock - 1)}
                              className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 font-bold"
                              title="Restar una unidad"
                            >
                              -
                            </button>
                            <span className="px-2 font-mono font-bold text-xs text-slate-900 min-w-7 text-center">
                              {product.stock}
                            </span>
                            <button
                              onClick={() => updateStock(product.id, product.stock + 1)}
                              className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 font-bold"
                              title="Sumar una unidad"
                            >
                              +
                            </button>
                          </div>

                          {isOut ? (
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                              Agotado
                            </span>
                          ) : isLow ? (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                              Bajo
                            </span>
                          ) : null}
                        </div>
                      </td>

                      {/* Active toggle */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleProductActive(product.id)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                              product.isActive
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            {product.isActive ? (
                              <>
                                <Eye className="w-3 h-3 text-emerald-600" />
                                <span>Público</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 text-slate-400" />
                                <span>Oculto</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => toggleProductFeatured(product.id)}
                            className={`p-1 rounded cursor-pointer transition-colors ${
                              product.isFeatured
                                ? 'text-amber-500 hover:text-amber-600'
                                : 'text-slate-300 hover:text-slate-400'
                            }`}
                            title={product.isFeatured ? 'Destacado' : 'Marcar como destacado'}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingProduct({ ...product })}
                            className="p-1.5 text-cyan-700 hover:bg-cyan-50 rounded-md transition-colors cursor-pointer"
                            title="Editar especificaciones y precio"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(product.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">¿Eliminar producto?</h3>
            </div>
            <p className="text-xs text-slate-600">
              Esta acción dará de baja el insumo quirúrgico de la base de datos de Laparoscopic.mx.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Editar Insumo Quirúrgico: {editingProduct.sku}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Nombre Comercial del Producto *</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    value={editingProduct.sku}
                    onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Marca / Fabricante *</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Precio Unitario ($ MXN) *</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Precio de Comparación / Original ($ MXN)</label>
                  <input
                    type="number"
                    value={editingProduct.comparePrice || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, comparePrice: Number(e.target.value) || undefined })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Actual (piezas) *</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Umbral Mínimo Alerta Stock *</label>
                  <input
                    type="number"
                    value={editingProduct.minStockThreshold}
                    onChange={e => setEditingProduct({ ...editingProduct, minStockThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registro COFEPRIS *</label>
                  <input
                    type="text"
                    value={editingProduct.cofePristReg}
                    onChange={e => setEditingProduct({ ...editingProduct, cofePristReg: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Presentación Comercial *</label>
                  <input
                    type="text"
                    value={editingProduct.presentation}
                    onChange={e => setEditingProduct({ ...editingProduct, presentation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">URL de la Imagen del Producto</label>
                  <input
                    type="url"
                    value={editingProduct.image}
                    onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Descripción Quirúrgica</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
