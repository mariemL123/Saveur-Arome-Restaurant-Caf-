import React from 'react';
import { X, CheckCircle2, Clock, MapPin, Printer } from 'lucide-react';
import { Order, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface OrderSuccessModalProps {
  order: Order | null;
  language: Language;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  language,
  onClose,
}) => {
  const t = TRANSLATIONS[language];

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[92vh] flex flex-col">
        
        {/* Banner with Order Confirmed Header */}
        <div className="p-6 bg-stone-900 text-stone-100 relative">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white p-2 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-100">
                {language === 'ar' ? 'تم تأكيد طلبك بنجاح!' : 'Votre commande a été transmise en cuisine !'}
              </h2>
              <div className="text-xs text-stone-400 flex items-center gap-2 mt-0.5">
                <span>Réf. <strong className="text-amber-300 font-mono">{order.reference}</strong></span>
                <span>·</span>
                <span>Livraison estimée : <strong className="text-stone-200">30 - 45 min</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Courier & Delivery Details */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center font-bold text-sm">
                TN
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Coursier Express Grand Tunis</div>
                <div className="text-[11px] text-stone-600">Sac isotherme maintien chaud/froid certifié</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              Paiement à la livraison
            </span>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div>
              <span className="font-bold text-stone-800 block mb-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Localisation de livraison en Tunisie :
              </span>
              <p className="font-semibold text-stone-900">{order.customer.nomComplet}</p>
              <p className="font-mono text-stone-700">{order.customer.telephone}</p>
              <p className="mt-1 font-medium text-stone-800">
                {order.customer.location.gouvernorat} — {order.customer.location.delegation}
              </p>
              <p className="text-stone-600">{order.customer.location.adresse}</p>
              {order.customer.location.pointRepere && (
                <p className="italic text-stone-500 mt-0.5">Repère : {order.customer.location.pointRepere}</p>
              )}
            </div>

            <div>
              <span className="font-bold text-stone-800 block mb-0.5">Mode de règlement :</span>
              <p className="font-semibold text-stone-900">
                {order.modePaiement === 'especes_livraison'
                  ? 'Paiement en espèces au livreur (Cash DT)'
                  : order.modePaiement === 'carte_tpe_livraison'
                  ? 'Carte bancaire via TPE sans contact au livreur'
                  : 'Paiement en ligne sécurisé'}
              </p>
              <p className="text-stone-500 mt-2">
                Suivi cuisine : <strong className="text-stone-800">En attente de prise en charge par le chef</strong>
              </p>
            </div>
          </div>

          {/* Itemized Order Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-stone-900">Détail des plats & boissons :</h4>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
              {order.items.map((it) => (
                <div key={it.id} className="p-3 bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">
                      {it.quantity}x
                    </span>
                    <div>
                      <span className="font-medium text-stone-900">
                        {it.product.name[language] || it.product.name.fr}
                      </span>
                      {it.selectedSize && (
                        <span className="text-[11px] text-stone-500 mx-1">
                          ({it.selectedSize})
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-stone-900 tabular-nums">
                    {it.totalPriceDT.toFixed(3)} {t.currency}
                  </span>
                </div>
              ))}

              <div className="p-3 bg-stone-50 space-y-1 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Sous-total :</span>
                  <span className="font-mono tabular-nums">{order.sousTotalDT.toFixed(3)} {t.currency}</span>
                </div>
                {order.remiseDT > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Remise :</span>
                    <span className="font-mono tabular-nums">-{order.remiseDT.toFixed(3)} {t.currency}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Frais de livraison :</span>
                  <span className="font-mono tabular-nums">
                    {order.fraisLivraisonDT === 0 ? 'Gratuit (Offert)' : `${order.fraisLivraisonDT.toFixed(3)} ${t.currency}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-200">
                  <span>Total à régler :</span>
                  <span className="font-mono text-amber-800 tabular-nums">{order.totalDT.toFixed(3)} {t.currency}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer le Reçu</span>
          </button>

          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-colors cursor-pointer ml-auto"
          >
            {language === 'ar' ? 'العودة إلى القائمة' : 'Retour à la Carte & Menus'}
          </button>
        </div>

      </div>
    </div>
  );
};
