import React, { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  language: Language;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language,
}) => {
  const [email, setEmail] = useState('admin@resto.tn');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === 'admin@resto.tn' && password.trim() === 'admin123') {
      setError(null);
      onLoginSuccess();
      onClose();
    } else {
      setError(
        language === 'ar'
          ? 'بيانات الدخول غير صحيحة. استخدم البريد admin@resto.tn وكلمة المرور admin123'
          : 'Identifiants incorrects. Utilisez admin@resto.tn et mot de passe admin123'
      );
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@resto.tn');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-stone-100 relative">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="font-serif-luxury text-xl font-bold text-amber-100">
            {t.admin.loginTitle}
          </h2>
          <p className="text-stone-400 text-xs mt-1 leading-relaxed">
            {t.admin.loginSubtitle}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.admin.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.admin.passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Quick Demo Fill Helper */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer w-full justify-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.admin.demoLogin}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{t.admin.loginBtn}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
