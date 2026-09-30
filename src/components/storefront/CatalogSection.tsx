import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, RotateCcw, PackageSearch } from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedSpecialty,
    setSelectedSpecialty,
    sortBy,
    setSortBy,
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique brands and specialties
  const availableBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
  const availableSpecialties = Array.from(new Set(products.map(p => p.specialty))).filter(Boolean);

  // Filter products
  const filteredProducts = products.filter(p => {
    // Only active products in customer storefront
    if (!p.isActive) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // Brand
    if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
      return false;
    }

    // Specialty
    if (selectedSpecialty !== 'all' && p.specialty !== selectedSpecialty) {
      return false;
    }

    // Stock
    if (onlyInStock && p.stock <= 0) {
      return false;
    }

    return true;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'precio_asc') return a.price - b.price;
    if (sortBy === 'precio_desc') return b.price - a.price;
    if (sortBy === 'nombre') return a.name.localeCompare(b.name);
    // destacados default
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return b.rating - a.rating;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedSpecialty('all');
    setOnlyInStock(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedSpecialty !== 'all' ||
    onlyInStock;

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Filter and Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Catálogo de Instrumental Quirúrgico
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Mostrando {sortedProducts.length} de {products.filter(p => p.isActive).length} insumos certificados disponibles
          </p>
        </div>

        {/* Sort and Mobile Filter Toggle */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros {hasActiveFilters && '(Activos)'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 cursor-pointer"
            >
              <option value="destacados">Destacados Quirófano</option>
              <option value="precio_asc">Precio: Menor a Mayor</option>
              <option value="precio_desc">Precio: Mayor a Menor</option>
              <option value="nombre">Nombre (A - Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
        {/* Sidebar Filters */}
        <aside className={`md:block space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Filter className="w-4 h-4 text-cyan-600" />
                <span>Filtros Clínicos</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-cyan-700 hover:text-cyan-900 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Limpiar</span>
                </button>
              )}
            </div>

            {/* Disponibilidad inmediata */}
            <div>
              <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500/20 border-slate-300"
                />
                <span>Solo Entrega Inmediata (En Stock)</span>
              </label>
            </div>

            {/* Marcas Quirúrgicas */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
                Marca / Fabricante
              </label>
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
              >
                <option value="all">Todas las marcas</option>
                {availableBrands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Especialidad Médica */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
                Especialidad Quirúrgica
              </label>
              <select
                value={selectedSpecialty}
                onChange={e => setSelectedSpecialty(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
              >
                <option value="all">Todas las especialidades</option>
                {availableSpecialties.map(spec => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Support Callout */}
            <div className="p-3.5 bg-cyan-50/70 border border-cyan-100 rounded-lg text-xs space-y-1.5">
              <div className="font-bold text-cyan-900">¿Requiere cotización hospitalaria?</div>
              <p className="text-cyan-800 leading-relaxed text-[11px]">
                Enviamos órdenes de compra con crédito a 30 días para comités de adquisiciones médicas.
              </p>
            </div>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <div className="md:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8 space-y-4">
              <PackageSearch className="w-12 h-12 text-slate-400 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  No se encontraron productos con estos criterios
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Pruebe ajustando los términos de búsqueda, cambiando la categoría o restableciendo los filtros.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
