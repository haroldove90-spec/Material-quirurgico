import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';
import {
  Scissors,
  Layers,
  Sparkles,
  Package,
  Monitor,
  LayoutGrid
} from 'lucide-react';

interface CategoryItem {
  id: ProductCategory | 'all';
  label: string;
  icon: React.ReactNode;
}

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const categories: CategoryItem[] = [
    {
      id: 'all',
      label: 'Todo el Catálogo',
      icon: <LayoutGrid className="w-4 h-4" />
    },
    {
      id: 'laparoscopia',
      label: 'Instrumental 5mm & Accesos',
      icon: <Scissors className="w-4 h-4" />
    },
    {
      id: 'engrapado',
      label: 'Engrapado Quirúrgico',
      icon: <Layers className="w-4 h-4" />
    },
    {
      id: 'cierre_vasos',
      label: 'Cierre Vascular (Hem-o-lok®)',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'consumibles',
      label: 'Consumibles & Endo Bags',
      icon: <Package className="w-4 h-4" />
    },
    {
      id: 'torres_equipos',
      label: 'Torres & Equipos 4K',
      icon: <Monitor className="w-4 h-4" />
    }
  ];

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
