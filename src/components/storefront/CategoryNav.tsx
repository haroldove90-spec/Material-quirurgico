import React, { useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';
import {
  Scissors,
  Layers,
  Sparkles,
  Package,
  Monitor,
  LayoutGrid,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface CategoryItem {
  id: ProductCategory | 'all';
  label: string;
  icon: React.ReactNode;
}

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: CategoryItem[] = [
    {
      id: 'all',
      label: 'Todo el Catálogo',
      icon: <LayoutGrid className="w-4 h-4 shrink-0" />
    },
    {
      id: 'laparoscopia',
      label: 'Instrumental 5mm & Accesos',
      icon: <Scissors className="w-4 h-4 shrink-0" />
    },
    {
      id: 'engrapado',
      label: 'Engrapado Quirúrgico',
      icon: <Layers className="w-4 h-4 shrink-0" />
    },
    {
      id: 'cierre_vasos',
      label: 'Cierre Vascular (Hem-o-lok®)',
      icon: <Sparkles className="w-4 h-4 shrink-0" />
    },
    {
      id: 'consumibles',
      label: 'Consumibles & Endo Bags',
      icon: <Package className="w-4 h-4 shrink-0" />
    },
    {
      id: 'torres_equipos',
      label: 'Torres & Equipos 4K',
      icon: <Monitor className="w-4 h-4 shrink-0" />
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 relative select-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative">
        {/* Horizontal scroll container with smooth momentum and no ugly scrollbar */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 px-1 sm:px-0 no-scrollbar scroll-smooth"
        >
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50/70 border border-slate-100'
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
