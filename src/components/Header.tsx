import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Lock, PhoneCall, ChefHat, ChevronDown, Search, X, Sparkles, Coffee, CupSoda, Flame, UtensilsCrossed, Pizza, Cake } from 'lucide-react';
import { Language, CategoryId } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onScrollToMenu: () => void;
  onSelectCategory: (cat: CategoryId | 'all') => void;
  selectedCategory: CategoryId | 'all';
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenContact,
  onOpenAdmin,
  isAdminLoggedIn,
  onScrollToMenu,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  // Close dropdown on outside click (supporting both desktop and mobile containers)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideDesktop = dropdownRef.current && dropdownRef.current.contains(target);
      const insideMobile = mobileDropdownRef.current && mobileDropdownRef.current.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsMenuDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuCategories: { id: CategoryId | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.menu.categories.all, icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'boissons_chaudes', label: t.menu.categories.boissons_chaudes, icon: <Coffee className="w-4 h-4 text-amber-600" /> },
    { id: 'boissons_froides', label: t.menu.categories.boissons_froides, icon: <CupSoda className="w-4 h-4 text-amber-600" /> },
    { id: 'jus_cocktails', label: t.menu.categories.jus_cocktails, icon: <Flame className="w-4 h-4 text-amber-600" /> },
    { id: 'burgers_plats', label: t.menu.categories.burgers_plats, icon: <UtensilsCrossed className="w-4 h-4 text-amber-600" /> },
    { id: 'pizzas', label: t.menu.categories.pizzas, icon: <Pizza className="w-4 h-4 text-amber-600" /> },
    { id: 'desserts', label: t.menu.categories.desserts, icon: <Cake className="w-4 h-4 text-amber-600" /> },
  ];

  const handleMenuButtonClick = () => {
    setIsMenuDropdownOpen((prev) => !prev);
    onScrollToMenu();
  };

  const handleCategoryClick = (catId: CategoryId | 'all') => {
    onSelectCategory(catId);
    onSearchChange(''); // Reset any active search so category items are immediately visible
    setIsMenuDropdownOpen(false);
    onScrollToMenu();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScrollToMenu();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-stone-900 border-b border-stone-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Bar */}
        <div className="h-20 flex items-center justify-between gap-4 sm:gap-6">
          
          {/* Brand Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left cursor-pointer group shrink-0"
          >
            <div className="font-serif-luxury text-2xl sm:text-3xl font-black tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors whitespace-nowrap">
              {t.brandName}
            </div>
            <div className="text-[10px] text-amber-700 font-bold uppercase tracking-widest hidden sm:block">
              {t.brandTagline}
            </div>
          </button>

          {/* SEARCH BAR AT THE VERY TOP (Le Menu Recherche en Haut) */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.hero.searchPlaceholder}
                className="w-full bg-stone-100 hover:bg-stone-50 text-stone-900 placeholder-stone-400 pl-10 pr-9 py-2.5 sm:py-3 rounded-2xl border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-xs sm:text-sm font-medium transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Effacer recherche"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* Navigation Links with Liste Déroulante for La Carte */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
            
            {/* Liste Déroulante de la Carte du Resto */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={handleMenuButtonClick}
                className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 py-2 font-bold text-stone-900 group"
              >
                <span>{t.nav.menu}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 group-hover:text-amber-600 ${isMenuDropdownOpen ? 'rotate-180 text-amber-600' : ''}`} />
              </button>

              {/* Popup Liste Déroulante */}
              {isMenuDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-white text-stone-900 border border-stone-200 rounded-3xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-black/5"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 px-3 py-1.5 border-b border-stone-100 flex items-center justify-between">
                    <span>{language === 'ar' ? 'أقسام القائمة المنسدلة' : 'Carte & Univers Gourmands'}</span>
                    <span className="text-stone-400 font-mono text-[9px]">▾ Liste</span>
                  </div>
                  <div className="space-y-1 pt-1.5">
                    {menuCategories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                              : 'hover:bg-stone-50 text-stone-700 hover:text-stone-950'
                          }`}
                        >
                          <span className={isSelected ? 'text-stone-950' : ''}>
                            {cat.icon}
                          </span>
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={onOpenContact}
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.nav.contact}</span>
            </button>

            {/* Admin Console (Visible ONLY when admin is logged in, hidden from clients) */}
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdmin}
                className="text-emerald-700 font-bold hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200"
              >
                <ChefHat className="w-4 h-4 text-emerald-600" />
                <span>Console Resto</span>
              </button>
            )}
          </nav>

          {/* Action Zone: Lang & Cart */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-stone-100 rounded-xl p-0.5 border border-stone-200 text-xs">
              <button
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  language === 'fr' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Français"
              >
                FR
              </button>
              <button
                onClick={() => onLanguageChange('ar')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  language === 'ar' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="العربية"
              >
                عربي
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  language === 'en' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label={t.nav.cart}
              className="relative flex items-center gap-2 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{t.nav.cart}</span>
              {cartCount > 0 && (
                <span className="bg-amber-500 text-stone-950 font-black text-xs rounded-full w-5 h-5 flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Quick Action Strip (Menu Déroulant, Contact, Admin) */}
        <div className="lg:hidden flex items-center justify-between pb-3 pt-1 border-t border-stone-100 text-xs font-semibold text-stone-700">
          <div className="relative" ref={mobileDropdownRef}>
            <button
              type="button"
              onClick={handleMenuButtonClick}
              className="flex items-center gap-1.5 font-bold text-stone-900 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <span>{t.nav.menu}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMenuDropdownOpen ? 'rotate-180 text-amber-600' : ''}`} />
            </button>
            {isMenuDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white text-stone-900 border border-stone-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ring-1 ring-black/5">
                {menuCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                        isSelected ? 'bg-amber-500 text-stone-950 font-bold' : 'hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {cat.icon}
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 hover:text-amber-800 text-stone-700 font-medium cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.nav.contact}</span>
            </button>
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 cursor-pointer text-emerald-700 font-bold px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <ChefHat className="w-3.5 h-3.5 text-emerald-600" />
                <span>Console</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
