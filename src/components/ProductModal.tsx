import React, { useState } from 'react';
import { X, Star, Clock, Check, Plus, Minus } from 'lucide-react';
import { Product, Language, CustomizationOption, CartItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getFallbackImageForCategory } from '../utils/imageFallback';

interface ProductModalProps {
  product: Product;
  language: Language;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  language,
  onClose,
  onAddToCart,
}) => {
  const t = TRANSLATIONS[language];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'standard' | 'large'>('standard');
  const [selectedMilk, setSelectedMilk] = useState<string>('entier');
  const [sweetness, setSweetness] = useState<number>(50);
  const [iceLevel, setIceLevel] = useState<'sans' | 'leger' | 'standard' | 'extra'>('standard');
  const [selectedToppings, setSelectedToppings] = useState<CustomizationOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const name = product.name[language] || product.name.fr;
  const description = product.description[language] || product.description.fr;

  // Calculate total price in DT based on customizations
  const sizeMod = product.availableSizes?.find(s => s.id === selectedSize)?.priceModifierDT || 0;
  const milkMod = (selectedMilk === 'avoine' || selectedMilk === 'amande') ? 1.500 : 0;
  const toppingsMod = selectedToppings.reduce((sum, top) => sum + top.priceDT, 0);
  const unitPriceDT = product.priceDT + sizeMod + milkMod + toppingsMod;
  const totalPriceDT = unitPriceDT * quantity;

  const toggleTopping = (topping: CustomizationOption) => {
    if (selectedToppings.some(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity,
      selectedSize: product.availableSizes ? selectedSize : undefined,
      selectedMilk: product.hasMilkChoice ? selectedMilk : undefined,
      sweetness: product.hasSweetnessChoice ? sweetness : undefined,
      iceLevel: product.hasIceChoice ? iceLevel : undefined,
      selectedToppings: selectedToppings.length > 0 ? selectedToppings : undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      unitPriceDT,
      totalPriceDT,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[92vh] flex flex-col">
        
        {/* Header Bar with Close Button */}
        <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden shrink-0">
          <img
            src={product.image}
            alt={name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = getFallbackImageForCategory(product.categoryId);
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-black/30" />
          
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 bg-stone-900/80 hover:bg-stone-950 text-white p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs text-amber-300 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-stone-300">({product.reviewsCount} avis)</span>
              </span>
              <span>·</span>
              <span className="tabular-nums">{product.prepTimeMinutes} {t.product.minutes}</span>
              {product.calories && (
                <>
                  <span>·</span>
                  <span className="tabular-nums">{product.calories} {t.product.calories}</span>
                </>
              )}
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold leading-tight">
              {name}
            </h2>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-stone-100">
          
          {/* Description */}
          <p className="text-stone-600 text-sm leading-relaxed">
            {description}
          </p>

          {/* Size Selection */}
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div className="pt-4 space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t.product.size}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.availableSizes.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedSize === size.id
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-stone-900">
                        {size.name[language] || size.name.fr}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {size.priceModifierDT === 0 ? 'Prix de base' : `+${size.priceModifierDT.toFixed(3)} ${t.currency}`}
                      </div>
                    </div>
                    {selectedSize === size.id && (
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options for Drinks */}
          {product.hasMilkChoice && (
            <div className="pt-4 space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t.product.milkChoice}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'entier', label: language === 'ar' ? 'حليب طبيعي كامل' : 'Lait entier bio', extra: 0 },
                  { id: 'avoine', label: language === 'ar' ? 'حليب شوفان (+1.500 د.ت)' : 'Lait d’avoine (+1.500 DT)', extra: 1.5 },
                  { id: 'amande', label: language === 'ar' ? 'حليب لوز (+1.500 د.ت)' : 'Lait d’amande (+1.500 DT)', extra: 1.5 },
                  { id: 'ecreme', label: language === 'ar' ? 'حليب خفيف' : 'Lait écrémé', extra: 0 },
                ].map((milk) => (
                  <button
                    key={milk.id}
                    type="button"
                    onClick={() => setSelectedMilk(milk.id)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                      selectedMilk === milk.id
                        ? 'border-amber-500 bg-amber-500 text-stone-950 shadow-sm'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300 bg-white'
                    }`}
                  >
                    {milk.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness Slider / Choices */}
          {product.hasSweetnessChoice && (
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-stone-900">
                  {t.product.sweetness}
                </label>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {sweetness}%
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 25, 50, 100].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSweetness(level)}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      sweetness === level
                        ? 'border-amber-500 bg-amber-500 text-stone-950'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {level === 0 ? (language === 'ar' ? 'بدون سكر' : 'Sans sucre') : `${level}%`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Toppings in Dinars */}
          {product.extraToppings && product.extraToppings.length > 0 && (
            <div className="pt-4 space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t.product.toppings}
              </label>
              <div className="space-y-2">
                {product.extraToppings.map((topping) => {
                  const isChecked = selectedToppings.some(t => t.id === topping.id);
                  return (
                    <div
                      key={topping.id}
                      onClick={() => toggleTopping(topping)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-amber-500 bg-amber-50/50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-amber-500 border-amber-600 text-stone-950' : 'border-stone-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-sm font-medium text-stone-800">
                          {topping.name[language] || topping.name.fr}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-stone-600 tabular-nums">
                        +{topping.priceDT.toFixed(3)} {t.currency}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="pt-4 space-y-2">
            <label className="block text-sm font-bold text-stone-900">
              {t.product.specialNotes}
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={t.product.specialNotesPlaceholder}
              rows={2}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
            />
          </div>

        </div>

        {/* Modal Bottom Bar: Stepper & Add Button */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4 shrink-0">
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-2 py-1.5 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-stone-900 text-sm tabular-nums w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-between bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <span>{t.product.addToCart}</span>
            <span className="font-mono tabular-nums text-base">
              {totalPriceDT.toFixed(3)} {t.currency}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
