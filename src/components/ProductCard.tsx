import React, { useState, useEffect } from 'react';
import { Clock, Star, Plus } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getFallbackImageForCategory } from '../utils/imageFallback';

interface ProductCardProps {
  product: Product;
  language: Language;
  onOpenProductModal: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onOpenProductModal,
  onQuickAdd,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasError, setHasError] = useState(false);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    setImgSrc(product.image);
    setHasError(false);
    setImageLoaded(false);
  }, [product.image]);

  const handleImageError = () => {
    const fallback = getFallbackImageForCategory(product.categoryId);
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    } else {
      setHasError(true);
    }
  };

  const name = product.name[language] || product.name.fr;
  const description = product.description[language] || product.description.fr;
  const isAvailable = product.isAvailable !== false;

  return (
    <article className={`group bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 ${
      isAvailable ? 'border-stone-200/90 hover:border-stone-300 hover:shadow-lg' : 'border-stone-200 opacity-60'
    }`}>
      
      {/* Product Image Slot */}
      <div 
        onClick={() => isAvailable && onOpenProductModal(product)}
        className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
      >
        {!imageLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-200 animate-pulse" />
        )}

        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400">
            <span className="font-serif-luxury text-base font-semibold text-stone-500 text-center px-4">
              {name}
            </span>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Badges */}
        {!isAvailable ? (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
            {t.product.outOfStock}
          </div>
        ) : product.isChefSpecial ? (
          <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm border border-stone-800">
            {language === 'ar' ? 'اختيار الشيف' : 'Coup de Cœur'}
          </div>
        ) : product.isPopular ? (
          <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {language === 'ar' ? 'الأكثر طلباً' : 'Populaire'}
          </div>
        ) : null}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="flex items-center gap-1 font-medium text-stone-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="tabular-nums font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-stone-500">
              <Clock className="w-3 h-3 text-stone-400" />
              <span className="tabular-nums">{product.prepTimeMinutes} {t.product.minutes}</span>
            </span>
            {product.calories && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="tabular-nums text-stone-500">{product.calories} {t.product.calories}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => isAvailable && onOpenProductModal(product)}
            className="font-serif-luxury text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-1 mb-1.5"
          >
            {name}
          </h3>

          {/* Description */}
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        </div>

        {/* Footer: Price in DT & Add/Customize CTA */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">
              {language === 'ar' ? 'السعر' : 'Prix'}
            </div>
            <div className="text-stone-950 font-bold text-base sm:text-lg font-mono tabular-nums">
              {product.priceDT.toFixed(3)} <span className="text-xs font-sans text-amber-700">{t.currency}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAvailable ? (
              <>
                <button
                  onClick={() => onOpenProductModal(product)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {t.product.customize}
                </button>

                <button
                  onClick={() => onQuickAdd(product)}
                  aria-label={t.product.addToCart}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-sm active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </>
            ) : (
              <span className="text-xs text-red-600 font-semibold italic">
                {t.product.outOfStock}
              </span>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};
