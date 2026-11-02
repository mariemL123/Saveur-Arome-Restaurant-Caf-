import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, AlertCircle, CheckCircle2, MessageSquareWarning, Send, ShieldAlert } from 'lucide-react';
import { Language, CustomerReclamation } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddReclamation: (rec: CustomerReclamation) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  language,
  onAddReclamation,
}) => {
  const t = TRANSLATIONS[language];
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [commandeRef, setCommandeRef] = useState('');
  const [motif, setMotif] = useState<'retard' | 'qualite' | 'erreur' | 'service' | 'autre'>('retard');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !telephone.trim() || !message.trim()) return;

    const now = new Date();
    const newRec: CustomerReclamation = {
      id: `rec-${Date.now()}`,
      nom: nom.trim(),
      telephone: telephone.trim(),
      commandeRef: commandeRef.trim() || undefined,
      motif,
      message: message.trim(),
      date: now.toLocaleDateString('fr-FR'),
      heure: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      statut: 'en_attente',
    };

    onAddReclamation(newRec);
    setIsSubmitted(true);
    setTimeout(() => {
      // Reset form
      setNom('');
      setTelephone('');
      setCommandeRef('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-stone-100 flex items-start justify-between border-b border-stone-800">
          <div>
            <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Saveur & Aroma
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-50">
              {t.contact.title}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-stone-100">
          
          {/* 1. Physical Location Details */}
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-stone-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>{t.contact.physicalLocationTitle}</span>
            </h3>
            
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {t.contact.physicalLocationDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Adresse de l'établissement
                </span>
                <p className="font-semibold text-xs sm:text-sm text-stone-900">
                  {t.contact.address}
                </p>
                <div className="text-xs text-stone-500 pt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.contact.openingHours}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.contact.directLine}</span>
                </span>
                <a
                  href="tel:+21671860000"
                  className="font-mono text-base font-bold text-amber-950 block hover:underline"
                >
                  +216 71 860 000
                </a>
                <p className="text-[11px] text-amber-800">
                  Accueil téléphonique, commandes à emporter et réservations de tables.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Direct Complaints Hotline Card */}
          <div className="pt-6 space-y-3">
            <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-100 text-red-700 shrink-0">
                  <MessageSquareWarning className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-red-950 mb-0.5">
                    {t.contact.hotlineReclamation}
                  </h4>
                  <p className="text-xs text-red-800 leading-relaxed max-w-md">
                    {t.contact.hotlineDesc}
                  </p>
                </div>
              </div>

              <a
                href="tel:+21622100200"
                className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white font-mono font-bold text-sm px-5 py-3 rounded-xl shadow-sm transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>+216 22 100 200</span>
              </a>
            </div>
          </div>

          {/* 3. Interactive Reclamation & Feedback Form */}
          <div className="pt-6 space-y-4">
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                {t.contact.formTitle}
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                {t.contact.formDesc}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Réclamation enregistrée avec succès</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {t.contact.successMessage}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline cursor-pointer"
                >
                  Déposer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                      placeholder="Ex: Mohamed Ben Ali"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      required
                      placeholder="+216 20 000 000"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.contact.orderRefLabel}
                    </label>
                    <input
                      type="text"
                      value={commandeRef}
                      onChange={(e) => setCommandeRef(e.target.value)}
                      placeholder="Ex: CMD-TN-2841"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.contact.reasonLabel}
                    </label>
                    <select
                      value={motif}
                      onChange={(e) => setMotif(e.target.value as any)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    >
                      <option value="retard">{t.contact.reasons.retard}</option>
                      <option value="qualite">{t.contact.reasons.qualite}</option>
                      <option value="erreur">{t.contact.reasons.erreur}</option>
                      <option value="service">{t.contact.reasons.service}</option>
                      <option value="autre">{t.contact.reasons.autre}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    placeholder="Expliquez-nous la situation afin que nous puissions agir immédiatement..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>{t.contact.submitBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
