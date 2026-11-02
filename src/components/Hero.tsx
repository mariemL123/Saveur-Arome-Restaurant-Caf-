import React, { useState } from 'react';
import { ArrowDown, PhoneCall, Clock, Utensils, Banknote, Sparkles, ChefHat } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { HERO_BANNER_IMAGE } from '../data/products';

interface HeroProps {
  language: Language;
  onScrollToMenu: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onScrollToMenu,
  onOpenContact,
}) => {
  const t = TRANSLATIONS[language];

  // Robust banner image fallback cascade:
  // 1. Bundled Vite asset (HERO_BANNER_IMAGE)
  // 2. Direct static public path (/images/hero_food_beverage_banner_1793605291539.jpg)
  // 3. High-res Unsplash culinary showcase
  const [bannerSrc, setBannerSrc] = useState<string>(HERO_BANNER_IMAGE || '/images/hero_food_beverage_banner_1793605291539.jpg');
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  const handleImageError = () => {
    if (fallbackAttempt === 0) {
      setFallbackAttempt(1);
      setBannerSrc('/images/hero_food_beverage_banner_1793605291539.jpg');
    } else if (fallbackAttempt === 1) {
      setFallbackAttempt(2);
      setBannerSrc('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80');
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-stone-100/80 via-white to-stone-50 text-stone-900 overflow-hidden border-b border-stone-200">
      
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-stone-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-18">
        
        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Elegant Kicker */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.hero.kicker}</span>
            </div>

            {/* Display Headline */}
            <h1 
              className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-black text-stone-950 leading-[1.1] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.hero.title}
            </h1>

            {/* Body Description */}
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToMenu}
                className="inline-flex items-center gap-2.5 bg-stone-950 hover:bg-amber-600 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{t.hero.ctaMenu}</span>
                <ArrowDown className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-800 border-2 border-stone-200 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl transition-all active:scale-95 cursor-pointer whitespace-nowrap shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-amber-600" />
                <span>{t.hero.ctaContact}</span>
              </button>
            </div>

            {/* Three Value Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-stone-200/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-900">{t.hero.stats.prep}</div>
                  <div className="text-[11px] text-stone-500 leading-tight">{t.hero.stats.prepDesc}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-900">{t.hero.stats.quality}</div>
                  <div className="text-[11px] text-stone-500 leading-tight">{t.hero.stats.qualityDesc}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <Banknote className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-900">{t.hero.stats.payment}</div>
                  <div className="text-[11px] text-stone-500 leading-tight">{t.hero.stats.paymentDesc}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-stone-200/80 aspect-[4/3] lg:aspect-[1/1] bg-stone-900">
              {/* Shimmer loading skeleton */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-amber-950 flex flex-col items-center justify-center p-6 text-center animate-pulse">
                  <ChefHat className="w-12 h-12 text-amber-500/70 mb-3" />
                  <span className="font-serif-luxury text-white text-lg font-bold">Saveur & Aroma</span>
                  <span className="text-amber-200/70 text-xs mt-1">Gastronomie & Cafés de terroir</span>
                </div>
              )}

              <img
                src={bannerSrc}
                alt="Gastronomie et boissons d'exception"
                referrerPolicy="no-referrer"
                loading="eager"
                onLoad={() => setIsLoaded(true)}
                onError={handleImageError}
                className={`w-full h-full object-cover transform hover:scale-105 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Culinary Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-100 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                    SA
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Atelier Saveur & Aroma</div>
                    <div className="text-[10px] text-stone-500 font-medium">Cuisine d'auteur & Cafés de terroir</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  En service
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
