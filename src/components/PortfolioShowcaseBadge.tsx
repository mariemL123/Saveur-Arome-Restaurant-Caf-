import React, { useState } from 'react';
import { Briefcase, Eye, ShieldCheck, ChevronRight, X, ChefHat, Sparkles, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface PortfolioShowcaseBadgeProps {
  language: Language;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
  onLogout: () => void;
}

export const PortfolioShowcaseBadge: React.FC<PortfolioShowcaseBadgeProps> = ({
  language,
  isAdminLoggedIn,
  onOpenAdmin,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-3 left-3 z-30 bg-stone-900/90 hover:bg-stone-900 text-stone-300 hover:text-white p-2 rounded-xl shadow-lg border border-stone-700/80 backdrop-blur-sm text-xs flex items-center gap-1.5 transition-all cursor-pointer opacity-70 hover:opacity-100"
        title="Ouvrir les outils de présentation projet"
      >
        <Briefcase className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-[11px] font-bold">Démo Projet</span>
      </button>
    );
  }

  return (
    <aside aria-label="Présentation projet démo" className="fixed bottom-3 left-3 z-30 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 bg-stone-900/95 hover:bg-stone-900 text-stone-100 px-3.5 py-2.5 rounded-2xl shadow-xl border border-stone-700/90 backdrop-blur-md transition-all cursor-pointer hover:border-amber-500/50"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>Démo Projet Resto</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-stone-400">
              {isAdminLoggedIn ? 'Connecté Gérant' : 'Client & Back-office'}
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-stone-900/98 text-stone-100 rounded-3xl shadow-2xl border border-stone-700/90 backdrop-blur-lg p-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-amber-100 uppercase tracking-wide">
                  Présentation Offre Projet
                </h3>
                <p className="text-[11px] text-stone-400">
                  Exemple de site e-commerce de restauration
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              title="Réduire"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Value Highlights for Client Pitch */}
          <div className="py-3 space-y-2 text-xs text-stone-300">
            <div className="flex items-start gap-2 bg-stone-800/60 p-2.5 rounded-xl border border-stone-700/50">
              <Eye className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-100 block">Vue Client Épurée :</span>
                <span className="text-[11px] text-stone-400">
                  Le client final ne voit aucun bouton administrateur. Recherche en haut, menu groupé déroulant et commande directe en Dinars Tunisiens (DT).
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-stone-800/60 p-2.5 rounded-xl border border-stone-700/50">
              <ChefHat className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-100 block">Espace Restaurant Dédié :</span>
                <span className="text-[11px] text-stone-400">
                  Gestion des commandes en cuisine/livraison, modification de la carte, stocks et suivi des réclamations clients.
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            {!isAdminLoggedIn ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin();
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ChefHat className="w-4 h-4" />
                <span>Tester l’Espace Admin Restaurant</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Ouvrir Console Resto</span>
                </button>
                <button
                  onClick={onLogout}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Déconnexion
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500">
              <span>Raccourci : <kbd className="px-1 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-400">Ctrl+Shift+A</kbd> ou <kbd className="px-1 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-400">#admin</kbd></span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsDismissed(true);
                }}
                className="text-stone-400 hover:text-stone-200 underline cursor-pointer"
              >
                Masquer ce badge
              </button>
            </div>
          </div>

        </div>
      )}
    </aside>
  );
};
