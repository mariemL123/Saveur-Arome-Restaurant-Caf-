import React, { useState } from 'react';
import { X, Truck, Clock, Store, ShieldCheck, Banknote, CreditCard, ChevronRight, ChevronLeft, MapPin, Check } from 'lucide-react';
import { CartItem, DeliveryType, PaymentMethodId, Language, Order } from '../types';
import { TRANSLATIONS, TUNISIA_LOCATIONS } from '../data/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  language: Language;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  language,
  onOrderComplete,
}) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState<1 | 2>(1);

  // Delivery & Location in Tunisia
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryType>('express');
  const [scheduledSlot, setScheduledSlot] = useState('Aujourd’hui, 19:30 - 20:15');
  const [selectedGov, setSelectedGov] = useState<string>('Tunis');
  const [selectedZone, setSelectedZone] = useState<string>('Les Berges du Lac 2 (Zone Restaurant)');
  const [adresse, setAdresse] = useState('Résidence Les Palmiers, Rue du Lac Windermere, Appt 3B');
  const [pointRepere, setPointRepere] = useState('Près de la Clinique du Lac');
  const [nomComplet, setNomComplet] = useState('Mariem Laurent');
  const [telephone, setTelephone] = useState('+216 22 456 789');
  const [instructionsLivreur, setInstructionsLivreur] = useState('Sonner au 3ème étage, code d’entrée 4589');

  // Payment
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>('especes_livraison');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentGovObj = TUNISIA_LOCATIONS.find(g => g.gouvernorat === selectedGov) || TUNISIA_LOCATIONS[0];

  const subtotalDT = items.reduce((sum, item) => sum + item.totalPriceDT, 0);
  const deliveryFeeDT = selectedDelivery === 'sur_place' ? 0 : (selectedDelivery === 'programmee' ? 3.000 : 4.500);
  const discountAmountDT = (subtotalDT * discount) / 100;
  const grandTotalDT = Math.max(0, subtotalDT - discountAmountDT + deliveryFeeDT);

  const handleGovChange = (govName: string) => {
    setSelectedGov(govName);
    const gov = TUNISIA_LOCATIONS.find(g => g.gouvernorat === govName);
    if (gov && gov.zones.length > 0) {
      setSelectedZone(gov.zones[0]);
    }
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const now = new Date();
      const reference = `CMD-TN-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        reference,
        date: now.toLocaleDateString('fr-FR'),
        heure: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        customer: {
          nomComplet,
          telephone,
          location: {
            gouvernorat: selectedGov,
            delegation: selectedZone,
            adresse,
            pointRepere: pointRepere.trim() || undefined,
          },
          instructionsLivreur: instructionsLivreur.trim() || undefined,
        },
        items: [...items],
        modeLivraison: selectedDelivery,
        creneauHoraire: selectedDelivery === 'programmee' ? scheduledSlot : undefined,
        modePaiement: selectedPayment,
        sousTotalDT: subtotalDT,
        fraisLivraisonDT: deliveryFeeDT,
        remiseDT: discountAmountDT,
        totalDT: grandTotalDT,
        status: 'recue',
        historiqueStatus: [
          {
            status: 'recue',
            timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: 'Commande transmise avec succès au restaurant',
          }
        ]
      };

      onOrderComplete(newOrder);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                🇹🇳 Tunisie · {selectedGov}
              </span>
              <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                {t.checkout.title}
              </h2>
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {step === 1 ? t.checkout.step1 : t.checkout.step2}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress tabs */}
        <div className="flex border-b border-stone-200 bg-stone-100/60 text-xs font-semibold">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
              step === 1 ? 'border-amber-600 text-amber-900 bg-white font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.checkout.step1}
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
              step === 2 ? 'border-amber-600 text-amber-900 bg-white font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.checkout.step2}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {step === 1 ? (
            /* STEP 1: FULFILLMENT & TUNISIA LOCALIZATION */
            <div className="space-y-6">
              
              {/* Delivery Mode Choice */}
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-3">
                  {t.checkout.deliveryTypeTitle}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'express',
                      title: t.checkout.expressTitle,
                      desc: t.checkout.expressDesc,
                      price: '4.500 DT',
                      icon: <Truck className="w-5 h-5" />
                    },
                    {
                      id: 'programmee',
                      title: t.checkout.scheduledTitle,
                      desc: t.checkout.scheduledDesc,
                      price: '3.000 DT',
                      icon: <Clock className="w-5 h-5" />
                    },
                    {
                      id: 'sur_place',
                      title: t.checkout.pickupTitle,
                      desc: t.checkout.pickupDesc,
                      price: 'Gratuit',
                      icon: <Store className="w-5 h-5" />
                    }
                  ].map((m) => {
                    const isSelected = selectedDelivery === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedDelivery(m.id as any)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/20'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 text-stone-600'}`}>
                            {m.icon}
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-900 tabular-nums">
                            {m.price}
                          </span>
                        </div>
                        <div className="font-semibold text-xs text-stone-900 mb-1 leading-tight">
                          {m.title}
                        </div>
                        <div className="text-[11px] text-stone-500 leading-tight">
                          {m.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scheduled Time slot */}
              {selectedDelivery === 'programmee' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                  <label className="block text-xs font-bold text-amber-900">
                    Sélectionnez le créneau horaire souhaité :
                  </label>
                  <select
                    value={scheduledSlot}
                    onChange={(e) => setScheduledSlot(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-amber-300 bg-white font-medium"
                  >
                    <option value="Aujourd’hui, 12:30 - 13:15">Aujourd’hui, 12:30 - 13:15 (Déjeuner)</option>
                    <option value="Aujourd’hui, 19:30 - 20:15">Aujourd’hui, 19:30 - 20:15 (Dîner)</option>
                    <option value="Aujourd’hui, 20:30 - 21:15">Aujourd’hui, 20:30 - 21:15</option>
                    <option value="Demain midi, 12:45 - 13:30">Demain midi, 12:45 - 13:30</option>
                  </select>
                </div>
              )}

              {/* Exact Location in Tunisia */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Précisez votre localisation exacte en Tunisie :</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-600 mb-1 font-semibold">{t.checkout.gouvernoratLabel}</label>
                    <select
                      value={selectedGov}
                      onChange={(e) => handleGovChange(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-amber-500"
                    >
                      {TUNISIA_LOCATIONS.map((gov) => (
                        <option key={gov.gouvernorat} value={gov.gouvernorat}>
                          {gov.gouvernorat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1 font-semibold">{t.checkout.delegationLabel}</label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-amber-500"
                    >
                      {currentGovObj.zones.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedDelivery !== 'sur_place' && (
                  <>
                    <div>
                      <label className="block text-xs text-stone-600 mb-1 font-semibold">{t.checkout.adresseLabel}</label>
                      <input
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        placeholder="Ex: Rue du Lac Windermere, Résidence Les Palmiers, Étage 3..."
                        required
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-600 mb-1 font-semibold">{t.checkout.pointRepereLabel}</label>
                      <input
                        type="text"
                        value={pointRepere}
                        onChange={(e) => setPointRepere(e.target.value)}
                        placeholder="Ex: En face de la banque, à côté du café..."
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Recipient Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-600 mb-1 font-semibold">{t.checkout.nomLabel}</label>
                  <input
                    type="text"
                    value={nomComplet}
                    onChange={(e) => setNomComplet(e.target.value)}
                    required
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1 font-semibold">{t.checkout.telLabel}</label>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="+216 20 000 000"
                    required
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-white font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-600 mb-1 font-semibold">{t.checkout.instructionsLabel}</label>
                <input
                  type="text"
                  value={instructionsLivreur}
                  onChange={(e) => setInstructionsLivreur(e.target.value)}
                  placeholder="Ex: Code d’entrée, laisser à l’accueil, sonner deux fois..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

            </div>
          ) : (
            /* STEP 2: PAYMENT METHOD & CONFIRMATION */
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-3">
                  {t.checkout.paymentMethodTitle}
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      id: 'especes_livraison',
                      title: t.checkout.codTitle,
                      desc: t.checkout.codDesc,
                      icon: <Banknote className="w-5 h-5 text-emerald-700" />
                    },
                    {
                      id: 'carte_tpe_livraison',
                      title: t.checkout.cardCodTitle,
                      desc: t.checkout.cardCodDesc,
                      icon: <CreditCard className="w-5 h-5 text-blue-700" />
                    }
                  ].map((p) => {
                    const isSelected = selectedPayment === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPayment(p.id as any)}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/20 shadow-sm'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 text-stone-600'}`}>
                            {p.icon}
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-stone-900">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-stone-500">
                              {p.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Information: Paiement en ligne non configuré */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2 mt-3">
                  <span className="font-bold text-amber-800 shrink-0">ℹ️ Règlement :</span>
                  <span>
                    {language === 'ar'
                      ? 'الدفع الإلكتروني عبر الإنترنت غير مفعل حالياً. يتم الدفع مباشرة عند الاستلام نقداً أو عبر جهاز TPE البنكي مع عون التوصيل.'
                      : 'Le paiement en ligne n’est pas configuré. Le règlement s’effectue exclusivement à la livraison : en espèces ou par carte bancaire sur le terminal TPE sans contact du livreur.'}
                  </span>
                </div>
              </div>

              {/* Order Recap in Dinars */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="font-bold text-stone-900 text-sm mb-2">
                  Récapitulatif de la Facture (en Dinars Tunisiens) :
                </div>
                
                <div className="flex justify-between text-stone-600">
                  <span>Sous-total des plats :</span>
                  <span className="font-mono font-semibold tabular-nums">{subtotalDT.toFixed(3)} {t.currency}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Remise appliquée :</span>
                    <span className="font-mono tabular-nums">-{discountAmountDT.toFixed(3)} {t.currency}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>Frais de livraison ({selectedGov}) :</span>
                  <span className="font-mono font-semibold tabular-nums">
                    {selectedDelivery === 'sur_place' ? 'Gratuit (Retrait sur place)' : `${deliveryFeeDT.toFixed(3)} ${t.currency}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-stone-950 pt-3 border-t border-stone-200">
                  <span>Total à payer au livreur :</span>
                  <span className="font-mono text-amber-700 tabular-nums">
                    {grandTotalDT.toFixed(3)} {t.currency}
                  </span>
                </div>
              </div>

              {/* Recap of Delivery Location */}
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-amber-950">
                <span className="font-bold block mb-0.5">Destination de livraison :</span>
                <span>{nomComplet} · {telephone}</span>
                <div className="font-medium mt-0.5">
                  {selectedGov}, {selectedZone} — {adresse}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="px-4 py-3 text-xs font-semibold rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              Retour à l’adresse
            </button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-xl transition-all cursor-pointer text-xs sm:text-sm"
            >
              <span>Continuer vers le Paiement</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="flex-1 max-w-sm flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
            >
              {isSubmitting ? (
                <span>{t.checkout.processing}</span>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t.checkout.placeOrderBtn} ({grandTotalDT.toFixed(3)} {t.currency})</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
