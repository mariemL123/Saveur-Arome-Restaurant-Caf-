import React from 'react';
import { ShieldCheck, Clock, MapPin, Phone, Mail, Lock, MessageSquareWarning } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
  onScrollToMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenContact,
  onOpenAdmin,
  onScrollToMenu,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand & Story */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-serif-luxury text-2xl font-bold text-amber-100 block">
              {t.brandName}
            </span>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              {t.brandTagline}. {language === 'ar'
                ? 'مطعم ومقهى راقي يقدم المشروبات المختصة والأطباق المحضرة يدوياً بمكونات طازجة يومياً مع توصيل فوري وإمكانية زيارتنا على عين المكان.'
                : 'Restaurant et atelier gastronomique dédié à l’art culinaire et aux cafés d’exception, livrés à domicile ou à déguster sur place.'}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider mb-4">
              {language === 'ar' ? 'التنقل' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onScrollToMenu} className="hover:text-amber-200 transition-colors cursor-pointer">
                  {t.nav.menu}
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1.5 text-amber-300 font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.nav.contact}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Fulfillment */}
          <div>
            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider mb-4">
              {language === 'ar' ? 'أوقات العمل والتوصيل' : 'Horaires d’Ouverture'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'كامل أيام الأسبوع : 08h00 صباحاً - 23h30 ليلاً'
                    : '7j/7 : 08h00 - 23h30 en continu'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'خدمة التوصيل : من 11h30 إلى 23h00'
                    : 'Service Livraison : 11h30 - 23h00'}
                </span>
              </li>
              <li className="flex items-start gap-2 text-stone-300 pt-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Normes d’hygiène et traçabilité certifiées</span>
              </li>
            </ul>
          </div>

          {/* Direct Support & Reclamation Phone Hotline */}
          <div>
            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider mb-4">
              {language === 'ar' ? 'الاتصال والشكاوى' : 'Contact & Réclamations'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[11px] text-stone-400 block">Commandes & Réservations :</span>
                  <a href="tel:+21671860000" className="font-mono tabular-nums text-stone-200 hover:underline">
                    +216 71 860 000
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                <MessageSquareWarning className="w-4 h-4 text-red-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-red-300 font-bold block uppercase tracking-wider">
                    Ligne Directe Réclamations :
                  </span>
                  <a href="tel:+21622100200" className="font-mono font-bold text-stone-100 hover:underline">
                    +216 22 100 200
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2 text-stone-400 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Rue du Lac Windermere, Les Berges du Lac 2, Tunis</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Saveur & Aroma. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>Paiement en Dinars Tunisiens (DT)</span>
            <span>·</span>
            <span>Service Réclamations Réactif</span>
            <span>·</span>
            <span>Sécurisé SSL</span>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-600 hover:text-stone-400 transition-colors inline-flex items-center gap-1 cursor-pointer text-[11px] hover:underline"
              title="Accès réservé au personnel du restaurant"
            >
              <Lock className="w-3 h-3 text-stone-600" />
              <span>{language === 'ar' ? 'دخول الموظفين' : 'Portail Personnel'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
