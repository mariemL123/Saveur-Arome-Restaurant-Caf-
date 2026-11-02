import React, { useState } from 'react';
import { X, ChefHat, Bike, CheckCircle2, Clock, MapPin, Phone, Banknote, LogOut, Plus, Trash2, Edit2, Check, AlertCircle, ToggleLeft, ToggleRight, MessageSquareWarning, Package } from 'lucide-react';
import { Order, OrderStatus, Language, Product, CategoryId, CustomerReclamation } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getFallbackImageForCategory } from '../utils/imageFallback';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  products: Product[];
  onAddProduct: (newProd: Product) => void;
  onUpdateProduct: (updatedProd: Product) => void;
  onDeleteProduct: (prodId: string) => void;
  onToggleProductAvailability: (prodId: string) => void;
  reclamations: CustomerReclamation[];
  onUpdateReclamationStatus: (recId: string, status: 'en_attente' | 'resolue') => void;
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onLogout,
  orders,
  onUpdateOrderStatus,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onToggleProductAvailability,
  reclamations,
  onUpdateReclamationStatus,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'reclamations'>('orders');
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');
  
  // Menu Item Modal state (Add / Edit)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for menu item
  const [formNameFr, setFormNameFr] = useState('');
  const [formNameAr, setFormNameAr] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryId>('burgers_plats');
  const [formPriceDT, setFormPriceDT] = useState<string>('18.500');
  const [formDescFr, setFormDescFr] = useState('');
  const [formDescAr, setFormDescAr] = useState('');
  const [formPrepTime, setFormPrepTime] = useState<number>(15);
  const [formImage, setFormImage] = useState<string>('/src/assets/images/product_wagyu_burger_1793605293043.jpg');

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  // KPIs
  const totalRevenueDT = orders.reduce((sum, ord) => sum + ord.totalDT, 0);
  const activeOrdersCount = orders.filter(ord => ord.status !== 'livree' && ord.status !== 'annulee').length;
  const pendingReclamationsCount = reclamations.filter(r => r.statut === 'en_attente').length;

  const filteredOrders = orders.filter(ord => {
    if (orderFilter === 'all') return true;
    return ord.status === orderFilter;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormNameFr('');
    setFormNameAr('');
    setFormCategory('burgers_plats');
    setFormPriceDT('18.500');
    setFormDescFr('');
    setFormDescAr('');
    setFormPrepTime(15);
    setFormImage('/src/assets/images/product_wagyu_burger_1793605293043.jpg');
    setIsItemModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormNameFr(prod.name.fr);
    setFormNameAr(prod.name.ar);
    setFormCategory(prod.categoryId);
    setFormPriceDT(prod.priceDT.toFixed(3));
    setFormDescFr(prod.description.fr);
    setFormDescAr(prod.description.ar);
    setFormPrepTime(prod.prepTimeMinutes);
    setFormImage(prod.image);
    setIsItemModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(formPriceDT) || 10.000;

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: {
          fr: formNameFr,
          ar: formNameAr || formNameFr,
          en: formNameFr,
        },
        description: {
          fr: formDescFr,
          ar: formDescAr || formDescFr,
          en: formDescFr,
        },
        categoryId: formCategory,
        priceDT: priceNum,
        prepTimeMinutes: formPrepTime,
        image: formImage.trim() || editingProduct.image,
      };
      onUpdateProduct(updated);
    } else {
      const newProd: Product = {
        id: `prod-custom-${Date.now()}`,
        name: {
          fr: formNameFr,
          ar: formNameAr || formNameFr,
          en: formNameFr,
        },
        description: {
          fr: formDescFr,
          ar: formDescAr || formDescFr,
          en: formDescFr,
        },
        categoryId: formCategory,
        priceDT: priceNum,
        prepTimeMinutes: formPrepTime,
        rating: 5.0,
        reviewsCount: 1,
        image: formImage.trim() || '/src/assets/images/product_wagyu_burger_1793605293043.jpg',
        isAvailable: true,
      };
      onAddProduct(newProd);
    }
    setIsItemModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-stone-100 rounded-3xl shadow-2xl overflow-hidden border border-stone-300 max-h-[95vh] flex flex-col">
        
        {/* Admin Header */}
        <div className="p-6 bg-stone-900 text-stone-100 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                Console Restaurant & Gestion
              </span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-50">
              {t.admin.dashboardTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>{t.admin.logoutBtn}</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Commandes, Menu, Réclamations) */}
        <div className="p-3 bg-stone-200/80 border-b border-stone-300 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>{t.admin.tabOrders}</span>
              {activeOrdersCount > 0 && (
                <span className="bg-amber-500 text-stone-950 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'menu'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>{t.admin.tabMenu}</span>
              <span className="bg-stone-200 text-stone-700 font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reclamations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'reclamations'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <MessageSquareWarning className="w-4 h-4 text-amber-400" />
              <span>{t.admin.tabReclamations}</span>
              {pendingReclamationsCount > 0 && (
                <span className="bg-red-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingReclamationsCount}
                </span>
              )}
            </button>
          </div>

          {activeTab === 'menu' && (
            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs transition-colors cursor-pointer shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{t.admin.addNewItem}</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: SUIVI DES COMMANDES */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Financial KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <div className="text-xs text-stone-500 font-semibold mb-1">
                    {t.admin.todayRevenue}
                  </div>
                  <div className="font-mono text-2xl font-bold text-emerald-800 tabular-nums">
                    {totalRevenueDT.toFixed(3)} <span className="text-sm font-sans text-stone-600">{t.currency}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <div className="text-xs text-stone-500 font-semibold mb-1">
                    {t.admin.activeOrders}
                  </div>
                  <div className="font-mono text-2xl font-bold text-amber-800 tabular-nums">
                    {activeOrdersCount} <span className="text-sm font-sans text-stone-500">en cuisine / route</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <div className="text-xs text-stone-500 font-semibold mb-1">
                    {t.admin.avgTicket}
                  </div>
                  <div className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                    {(orders.length > 0 ? totalRevenueDT / orders.length : 0).toFixed(3)} <span className="text-sm font-sans text-stone-600">{t.currency}</span>
                  </div>
                </div>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: t.admin.filterAll },
                  { id: 'recue', label: t.admin.filterRecue },
                  { id: 'en_cuisine', label: t.admin.filterCuisine },
                  { id: 'en_livraison', label: t.admin.filterLivraison },
                  { id: 'livree', label: t.admin.filterLivree },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderFilter(st.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      orderFilter === st.id
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-300'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Order Cards */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 text-stone-400">
                    <ChefHat className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-stone-600">Aucune commande dans ce filtre</p>
                  </div>
                ) : (
                  filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-base text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                            {ord.reference}
                          </span>
                          <span className="text-xs text-stone-500 font-mono">
                            {ord.date} à {ord.heure}
                          </span>
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          ord.status === 'recue' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                          ord.status === 'en_cuisine' ? 'bg-orange-100 text-orange-900 border-orange-300' :
                          ord.status === 'en_livraison' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                          'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}>
                          {ord.status === 'recue' ? 'Nouvelle Reçue' : ord.status === 'en_cuisine' ? 'En Cuisine' : ord.status === 'en_livraison' ? 'En Livraison' : 'Livrée & Encaissée'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                        {/* Customer & Location */}
                        <div className="md:col-span-5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                          <div className="font-bold text-stone-900 flex items-center justify-between">
                            <span>{ord.customer.nomComplet}</span>
                            <a href={`tel:${ord.customer.telephone}`} className="text-amber-700 font-mono flex items-center gap-1 hover:underline">
                              <Phone className="w-3.5 h-3.5" />
                              {ord.customer.telephone}
                            </a>
                          </div>
                          <div className="text-stone-700 font-medium flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{ord.customer.location.gouvernorat} — {ord.customer.location.delegation}</span>
                          </div>
                          <div className="text-stone-500 pl-4">{ord.customer.location.adresse}</div>
                          {ord.customer.location.pointRepere && (
                            <div className="text-[11px] text-stone-500 italic pl-4">Repère : {ord.customer.location.pointRepere}</div>
                          )}
                          <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500">
                            Paiement : <strong>{ord.modePaiement === 'especes_livraison' ? 'Espèces au livreur' : 'Carte TPE'}</strong>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="md:col-span-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                          <div className="font-bold text-stone-900">Articles ({ord.items.length})</div>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {ord.items.map((it) => (
                              <div key={it.id} className="flex justify-between text-[11px]">
                                <span>{it.quantity}x {it.product.name[language] || it.product.name.fr}</span>
                                <span className="font-mono font-semibold">{it.totalPriceDT.toFixed(3)} {t.currency}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-stone-200 font-bold flex justify-between">
                            <span>Total :</span>
                            <span className="font-mono text-amber-800">{ord.totalDT.toFixed(3)} {t.currency}</span>
                          </div>
                        </div>

                        {/* Status Transition Actions */}
                        <div className="md:col-span-3 flex flex-col justify-center gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                          {ord.status === 'recue' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'en_cuisine', 'Lancement en cuisine')}
                              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                            >
                              <ChefHat className="w-4 h-4" />
                              <span>{t.admin.actionPassToCuisine}</span>
                            </button>
                          )}
                          {ord.status === 'en_cuisine' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'en_livraison', 'Assigné au coursier')}
                              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                            >
                              <Bike className="w-4 h-4" />
                              <span>{t.admin.actionPassToLivraison}</span>
                            </button>
                          )}
                          {ord.status === 'en_livraison' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'livree', 'Commande livrée et payée')}
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{t.admin.actionMarkLivree}</span>
                            </button>
                          )}
                          {ord.status === 'livree' && (
                            <div className="text-center p-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200">
                              ✓ Livrée & Encaissée
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 2: GESTION DU MENU & PRODUITS */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 text-xs">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Gestion des Plats et Boissons</h3>
                  <p className="text-stone-500">Ajoutez, modifiez les prix en Dinars ou désactivez les articles temporairement en rupture de stock.</p>
                </div>
                <button
                  onClick={openAddModal}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.addNewItem}</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">Plat / Boisson</th>
                      <th className="p-3.5">Catégorie</th>
                      <th className="p-3.5">Prix (DT)</th>
                      <th className="p-3.5">Disponibilité</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map((prod) => {
                      const isAvail = prod.isAvailable !== false;
                      return (
                        <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="p-3.5 flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name.fr}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = getFallbackImageForCategory(prod.categoryId);
                              }}
                              className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-stone-900 text-sm">{prod.name.fr}</div>
                              <div className="text-[11px] text-stone-400">{prod.name.ar}</div>
                            </div>
                          </td>

                          <td className="p-3.5 text-stone-600 font-medium capitalize">
                            {prod.categoryId.replace('_', ' ')}
                          </td>

                          <td className="p-3.5 font-mono font-bold text-amber-800 text-sm">
                            {prod.priceDT.toFixed(3)} {t.currency}
                          </td>

                          <td className="p-3.5">
                            <button
                              onClick={() => onToggleProductAvailability(prod.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border transition-colors ${
                                isAvail
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-red-50 text-red-800 border-red-300'
                              }`}
                            >
                              <span className={`w-2 h-2 rounded-full ${isAvail ? 'bg-emerald-600' : 'bg-red-600'}`} />
                              <span>{isAvail ? 'En stock' : 'Rupture'}</span>
                            </button>
                          </td>

                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => openEditModal(prod)}
                              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                              title="Modifier"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(prod.id)}
                              className="p-2 rounded-lg bg-stone-100 hover:bg-red-100 text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: RECLAMATIONS CLIENTS */}
          {activeTab === 'reclamations' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs">
                <h3 className="font-bold text-stone-900 text-sm">Suivi des Réclamations & Service Client</h3>
                <p className="text-stone-500">Consultez les réclamations déposées par les clients pour les rappeler ou résoudre leurs signalements.</p>
              </div>

              {reclamations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 text-stone-400">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-stone-700">Aucune réclamation enregistrée</p>
                  <p className="text-xs text-stone-400 mt-0.5">Toutes les réclamations client déposées apparaîtront ici.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reclamations.map((rec) => {
                    const isPending = rec.statut === 'en_attente';
                    return (
                      <div
                        key={rec.id}
                        className={`p-5 rounded-3xl border transition-all ${
                          isPending ? 'bg-white border-red-200 shadow-sm' : 'bg-stone-50 border-stone-200 opacity-75'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-stone-900 text-sm">{rec.nom}</span>
                            <a href={`tel:${rec.telephone}`} className="text-amber-700 font-mono font-bold flex items-center gap-1 hover:underline">
                              <Phone className="w-3.5 h-3.5" />
                              {rec.telephone}
                            </a>
                            {rec.commandeRef && (
                              <span className="bg-stone-100 px-2 py-0.5 rounded font-mono text-stone-600">
                                Réf: {rec.commandeRef}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-stone-400 font-mono text-[11px]">{rec.date} à {rec.heure}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isPending ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {isPending ? 'À traiter' : 'Résolue'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 text-xs text-stone-700 leading-relaxed">
                          <span className="font-bold text-stone-900 block mb-1">
                            Motif : {rec.motif === 'retard' ? 'Retard de livraison' : rec.motif === 'qualite' ? 'Qualité / Température du plat' : rec.motif === 'erreur' ? 'Erreur de commande' : rec.motif}
                          </span>
                          <p className="bg-stone-50 p-3 rounded-xl border border-stone-200 italic text-stone-600">
                            "{rec.message}"
                          </p>
                        </div>

                        <div className="pt-3 flex justify-end gap-2 text-xs">
                          {isPending ? (
                            <button
                              onClick={() => onUpdateReclamationStatus(rec.id, 'resolue')}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer transition-colors"
                            >
                              Marquer comme Résolue & Client contacté
                            </button>
                          ) : (
                            <button
                              onClick={() => onUpdateReclamationStatus(rec.id, 'en_attente')}
                              className="px-3 py-1.5 bg-stone-200 text-stone-700 font-semibold rounded-lg cursor-pointer"
                            >
                              Rouvrir
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Fermer la console
          </button>
        </div>

      </div>

      {/* Sub-Modal: Add or Edit Menu Product */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-60 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
            
            <div className="p-5 bg-stone-900 text-stone-100 flex items-center justify-between">
              <h3 className="font-serif-luxury text-lg font-bold">
                {editingProduct ? t.admin.editItem : t.admin.addNewItem}
              </h3>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="p-1 text-stone-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.admin.itemFormNameFr}</label>
                  <input
                    type="text"
                    value={formNameFr}
                    onChange={(e) => setFormNameFr(e.target.value)}
                    required
                    placeholder="Ex: Burger Gourmet..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.admin.itemFormNameAr}</label>
                  <input
                    type="text"
                    value={formNameAr}
                    onChange={(e) => setFormNameAr(e.target.value)}
                    placeholder="اسم الصنف بالعربي..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.admin.itemFormCategory}</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-medium"
                  >
                    <option value="boissons_chaudes">Cafés Chauds & Thés</option>
                    <option value="boissons_froides">Cafés Glacés</option>
                    <option value="jus_cocktails">Jus Frais & Citronnades</option>
                    <option value="burgers_plats">Burgers & Plats</option>
                    <option value="pizzas">Pizzas Napolitaines</option>
                    <option value="desserts">Desserts & Pâtisseries</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.admin.itemFormPrice}</label>
                  <input
                    type="text"
                    value={formPriceDT}
                    onChange={(e) => setFormPriceDT(e.target.value)}
                    required
                    placeholder="18.500"
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t.admin.itemFormDescFr}</label>
                <textarea
                  value={formDescFr}
                  onChange={(e) => setFormDescFr(e.target.value)}
                  required
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.admin.itemFormPrep}</label>
                  <input
                    type="number"
                    value={formPrepTime}
                    onChange={(e) => setFormPrepTime(parseInt(e.target.value) || 10)}
                    min={1}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.admin.itemFormImage}</label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="URL ou chemin..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold cursor-pointer"
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl cursor-pointer"
                >
                  {t.admin.saveItem}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
