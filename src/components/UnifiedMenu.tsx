import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product, Language, CategoryId } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CupSoda, Coffee, Flame, UtensilsCrossed, Pizza, Cake, ChevronDown, ChevronUp, X, Sparkles } from 'lucide-react';

interface UnifiedMenuProps {
  products: Product[];
  allProducts?: Product[];
  language: Language;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  selectedFilter?: string;
  onSelectFilter?: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenProductModal: (prod: Product) => void;
  onQuickAdd: (prod: Product) => void;
}

export const UnifiedMenu: React.FC<UnifiedMenuProps> = ({
  products,
  allProducts,
  language,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenProductModal,
  onQuickAdd,
}) => {
  const allProductsList = allProducts && allProducts.length > 0 ? allProducts : products;
  const t = TRANSLATIONS[language];

  // Accordion collapsed state for categories
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryDropdown = (catId: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const expandAll = () => {
    setCollapsedCategories({});
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    categoryDefinitions.forEach(c => {
      allCollapsed[c.id] = true;
    });
    setCollapsedCategories(allCollapsed);
  };

  const categoryDefinitions: { id: CategoryId; label: string; icon: React.ReactNode }[] = [
    { id: 'boissons_chaudes', label: t.menu.categories.boissons_chaudes, icon: <Coffee className="w-5 h-5" /> },
    { id: 'boissons_froides', label: t.menu.categories.boissons_froides, icon: <CupSoda className="w-5 h-5" /> },
    { id: 'jus_cocktails', label: t.menu.categories.jus_cocktails, icon: <Flame className="w-5 h-5" /> },
    { id: 'burgers_plats', label: t.menu.categories.burgers_plats, icon: <UtensilsCrossed className="w-5 h-5" /> },
    { id: 'pizzas', label: t.menu.categories.pizzas, icon: <Pizza className="w-5 h-5" /> },
    { id: 'desserts', label: t.menu.categories.desserts, icon: <Cake className="w-5 h-5" /> },
  ];

  // Filter categories to display
  const hasActiveSearch = searchQuery.trim().length > 0;
  const categoriesToDisplay = (hasActiveSearch || selectedCategory === 'all')
    ? categoryDefinitions
    : categoryDefinitions.filter(c => c.id === selectedCategory);

  return (
    <section id="menu-section" className="py-12 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'ar' ? 'قائمة الطعام والمشروبات' : 'La Carte du Resto'}</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-black text-stone-950 flex items-center gap-2">
              <span>{t.menu.title}</span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full font-mono">
                {products.length} {language === 'ar' ? 'صنف' : 'créations'}
              </span>
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              {language === 'ar'
                ? 'استمتع بأشهى المشروبات والأطباق المحضرة طازجة حسب الطلب.'
                : 'Explorez nos créations culinaires et boissons d’exception préparées à la minute.'}
            </p>
          </div>

          {/* Quick Accordion Controls & Search Badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {hasActiveSearch && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-medium text-amber-900">
                <span>{language === 'ar' ? 'بحث :' : 'Recherche :'} <strong>« {searchQuery} »</strong></span>
                <button
                  onClick={() => onSearchChange('')}
                  className="p-0.5 hover:bg-amber-200/60 rounded-full cursor-pointer text-amber-800"
                  title="Effacer recherche"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              title="Dérouler toutes les catégories"
            >
              <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'ar' ? 'فتح الكل' : 'Tout dérouler'}</span>
            </button>

            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              title="Replier toutes les catégories"
            >
              <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
              <span>{language === 'ar' ? 'طي الكل' : 'Tout replier'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Dropdown Selector for La Carte du Resto */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-1 max-w-md">
              <label htmlFor="category-select" className="text-xs font-bold text-stone-700 whitespace-nowrap">
                {language === 'ar' ? 'اختر من القائمة المنسدلة :' : 'Liste déroulante :'}
              </label>
              <div className="relative flex-1">
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => {
                    onSelectCategory(e.target.value as CategoryId | 'all');
                    if (searchQuery) onSearchChange('');
                  }}
                  className="w-full appearance-none bg-stone-100 hover:bg-stone-50 text-stone-900 font-bold text-xs sm:text-sm px-3.5 py-2.5 pr-9 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer transition-colors shadow-inner"
                >
                  <option value="all">
                    ✨ {t.menu.categories.all} ({allProductsList.length} {language === 'ar' ? 'صنف' : 'articles'})
                  </option>
                  {categoryDefinitions.map((c) => {
                    const count = allProductsList.filter(p => p.categoryId === c.id).length;
                    return (
                      <option key={c.id} value={c.id}>
                        {c.label} ({count} {language === 'ar' ? 'صنف' : 'articles'})
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {selectedCategory !== 'all' && (
              <button
                onClick={() => onSelectCategory('all')}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer self-start sm:self-auto"
              >
                {language === 'ar' ? '← عرض كل القائمة' : '← Voir toute la carte'}
              </button>
            )}
          </div>

          {/* Quick Category Chips for 1-click navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-stone-100">
            <button
              onClick={() => {
                onSelectCategory('all');
                if (searchQuery) onSearchChange('');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t.menu.categories.all} ({allProductsList.length})
            </button>
            {categoryDefinitions.map((c) => {
              const count = allProductsList.filter(p => p.categoryId === c.id).length;
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCategory(c.id);
                    if (searchQuery) onSearchChange('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <span>{c.label}</span>
                  <span className={`text-[10px] font-mono px-1 py-0.2 rounded-full ${isSelected ? 'bg-amber-600/30 text-stone-950 font-black' : 'bg-stone-200 text-stone-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories & Product Cards */}
        <div className="space-y-6">
          {categoriesToDisplay.map((cat) => {
            const catProducts = products.filter((p) => p.categoryId === cat.id);
            if (catProducts.length === 0) return null;

            // When searching, keep matching categories expanded by default
            const isCollapsed = !hasActiveSearch && !!collapsedCategories[cat.id];

            return (
              <div 
                key={cat.id} 
                className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden transition-all duration-300"
              >
                {/* Entête Déroulante Cliquable (Accordion Header) */}
                <button
                  onClick={() => toggleCategoryDropdown(cat.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors cursor-pointer select-none"
                  aria-expanded={!isCollapsed}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200/80">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                        <span>{cat.label}</span>
                      </h3>
                      <div className="text-xs text-stone-500 mt-0.5 font-medium">
                        {catProducts.length} {language === 'ar' ? 'أصناف في هذه القائمة' : 'créations dans cette catégorie'}
                      </div>
                    </div>
                  </div>

                  {/* Bouton Indicateur Dérouler / Replier */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-stone-500 hidden sm:inline">
                      {isCollapsed 
                        ? (language === 'ar' ? 'إظهار القائمة' : 'Dérouler la liste') 
                        : (language === 'ar' ? 'إخفاء القائمة' : 'Replier')}
                    </span>
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isCollapsed 
                        ? 'bg-stone-100 text-stone-600' 
                        : 'bg-amber-500 text-stone-950 font-bold rotate-180 shadow-md'
                    }`}>
                      <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                </button>

                {/* Contenu Déroulé : Grille des Plats */}
                {!isCollapsed && (
                  <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
                      {catProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          language={language}
                          onOpenProductModal={onOpenProductModal}
                          onQuickAdd={onQuickAdd}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty Search State */}
          {products.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto shadow-sm">
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <p className="text-stone-800 font-bold text-base mb-1">
                {language === 'ar'
                  ? `لم نجد أي طبق أو مشروب يطابق "${searchQuery}"`
                  : `Aucun produit ne correspond à « ${searchQuery} »`}
              </p>
              <p className="text-stone-500 text-xs mb-5">
                {language === 'ar'
                  ? 'جرب البحث بكلمات أخرى مثل "قهوة"، "برجر"، "بيتزا"، أو "عصير".'
                  : 'Essayez un mot comme « café », « thé », « burger », « pizza » ou « citronnade ».'}
              </p>
              <button
                onClick={() => {
                  onSelectCategory('all');
                  onSearchChange('');
                }}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                {language === 'ar' ? 'عرض القائمة كاملة' : 'Voir toute la carte'}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
