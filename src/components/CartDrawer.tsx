import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Tag } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getFallbackImageForCategory } from '../utils/imageFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  language: Language;
  discount: number;
  onApplyCoupon: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  language,
  discount,
  onApplyCoupon,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const subtotalDT = items.reduce((sum, item) => sum + item.totalPriceDT, 0);
  const estimatedDeliveryDT = items.length === 0 ? 0 : 4.500;
  const discountAmountDT = (subtotalDT * discount) / 100;
  const grandTotalDT = Math.max(0, subtotalDT - discountAmountDT + estimatedDeliveryDT);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = onApplyCoupon(couponCode.trim());
    if (success) {
      setCouponMessage({
        type: 'success',
        text: language === 'ar' ? 'تم تطبيق كود الخصم بنجاح!' : 'Code promo appliqué avec succès !'
      });
    } else {
      setCouponMessage({
        type: 'error',
        text: language === 'ar' ? 'كود غير صحيح، جرب SAVE15' : 'Code invalide, essayez SAVE15'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      <div className={`fixed inset-y-0 ${language === 'ar' ? 'left-0' : 'right-0'} max-w-full flex pl-0 sm:pl-10 z-10`}>
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-stone-200 border-l">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                {t.cart.title}
              </h2>
              <span className="text-xs bg-stone-200 font-bold px-2 py-0.5 rounded-full text-stone-700 tabular-nums">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>
            
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-stone-800 font-semibold text-lg mb-1">{t.cart.empty}</h3>
                <p className="text-stone-500 text-xs sm:text-sm max-w-xs mb-6">{t.cart.emptyDesc}</p>
                <button
                  onClick={onClose}
                  className="bg-stone-900 text-stone-100 px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {t.cart.startShopping}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const prodName = item.product.name[language] || item.product.name.fr;
                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3">
                    <img
                      src={item.product.image}
                      alt={prodName}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = getFallbackImageForCategory(item.product.categoryId);
                      }}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury font-bold text-sm text-stone-900 truncate">
                          {prodName}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                          className="text-stone-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details Summary */}
                      <div className="text-[11px] text-stone-500 space-y-0.5 mt-0.5">
                        {item.selectedSize && (
                          <div>{item.selectedSize === 'large' ? 'Grand format' : 'Standard'}</div>
                        )}
                        {item.selectedMilk && (
                          <div>Lait : {item.selectedMilk}</div>
                        )}
                        {item.sweetness !== undefined && (
                          <div>Sucre : {item.sweetness}%</div>
                        )}
                        {item.selectedToppings && item.selectedToppings.length > 0 && (
                          <div className="text-amber-700">
                            +{item.selectedToppings.map(top => top.name[language] || top.name.fr).join(', ')}
                          </div>
                        )}
                        {item.specialInstructions && (
                          <div className="italic text-stone-400 truncate">"{item.specialInstructions}"</div>
                        )}
                      </div>

                      {/* Stepper & Price in Dinars */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1 border border-stone-200">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 rounded text-stone-600 hover:bg-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold w-4 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 rounded text-stone-600 hover:bg-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                          {item.totalPriceDT.toFixed(3)} <span className="text-xs text-amber-700">{t.currency}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer: Coupon & Totals in Dinars */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/80 space-y-4">
              
              {/* Promo Coupon Form */}
              <form onSubmit={handleCouponSubmit} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder={t.cart.couponPlaceholder}
                      className="w-full text-xs uppercase font-mono px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <Tag className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-stone-100 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap"
                  >
                    {t.cart.applyCoupon}
                  </button>
                </div>
                {couponMessage && (
                  <div className={`text-[11px] ${couponMessage.type === 'success' ? 'text-emerald-600 font-semibold' : 'text-red-500'}`}>
                    {couponMessage.text}
                  </div>
                )}
              </form>

              {/* Subtotal Breakdown in Dinars */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/80">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-mono font-semibold tabular-nums">{subtotalDT.toFixed(3)} {t.currency}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{t.cart.discount} ({discount}%)</span>
                    <span className="font-mono tabular-nums">-{discountAmountDT.toFixed(3)} {t.currency}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t.cart.deliveryFee}</span>
                  <span className="font-mono font-semibold tabular-nums">
                    {items.length === 0 ? '0.000 DT' : `${estimatedDeliveryDT.toFixed(3)} ${t.currency}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>{t.cart.total}</span>
                  <span className="font-mono text-base tabular-nums text-amber-700">{grandTotalDT.toFixed(3)} {t.currency}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer text-sm"
              >
                <span>{t.cart.checkoutBtn}</span>
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
