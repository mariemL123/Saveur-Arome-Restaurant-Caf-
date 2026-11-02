import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UnifiedMenu } from './components/UnifiedMenu';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ContactModal } from './components/ContactModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { PortfolioShowcaseBadge } from './components/PortfolioShowcaseBadge';
import { ChefHat, LogOut } from 'lucide-react';

import { Product, CartItem, Order, Language, CategoryId, OrderStatus, CustomerReclamation } from './types';
import { PRODUCTS } from './data/products';
import { doesProductMatchQuery } from './utils/search';

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  // Dynamic Product Catalog (Editable by Admin)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Grouped Menu Filtering states
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Seed Orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-seed-1',
      reference: 'CMD-TN-2841',
      date: '02/11/2026',
      heure: '12:45',
      customer: {
        nomComplet: 'Youssef Ben Salem',
        telephone: '+216 24 100 200',
        location: {
          gouvernorat: 'Tunis',
          delegation: 'Les Berges du Lac 2',
          adresse: 'Immeuble Le Corail, Rue de l’Île de Djerba, 2ème étage',
          pointRepere: 'En face de l’ambassade',
        },
        instructionsLivreur: 'Appeler avant de monter',
      },
      items: [
        {
          id: 'item-1',
          product: PRODUCTS[0],
          quantity: 2,
          selectedSize: 'large',
          unitPriceDT: 12.000,
          totalPriceDT: 24.000,
        },
        {
          id: 'item-2',
          product: PRODUCTS[6],
          quantity: 1,
          selectedSize: 'standard',
          unitPriceDT: 26.000,
          totalPriceDT: 26.000,
        }
      ],
      modeLivraison: 'express',
      modePaiement: 'especes_livraison',
      sousTotalDT: 50.000,
      fraisLivraisonDT: 0,
      remiseDT: 0,
      totalDT: 50.000,
      status: 'en_cuisine',
      historiqueStatus: [
        { status: 'recue', timestamp: '12:45', note: 'Commande reçue' },
        { status: 'en_cuisine', timestamp: '12:48', note: 'Prise en charge par le chef' },
      ]
    },
    {
      id: 'ord-seed-2',
      reference: 'CMD-TN-2840',
      date: '02/11/2026',
      heure: '12:20',
      customer: {
        nomComplet: 'Sarra Trabelsi',
        telephone: '+216 98 450 800',
        location: {
          gouvernorat: 'Tunis',
          delegation: 'La Marsa & Gammarth',
          adresse: 'Avenue Habib Bourguiba, Résidence Safsaf, Marsa Plage',
          pointRepere: 'À côté de la poste',
        },
        instructionsLivreur: 'Sonnette Trabelsi',
      },
      items: [
        {
          id: 'item-3',
          product: PRODUCTS[9],
          quantity: 1,
          selectedSize: 'large',
          unitPriceDT: 36.000,
          totalPriceDT: 36.000,
        },
        {
          id: 'item-4',
          product: PRODUCTS[2],
          quantity: 2,
          selectedSize: 'standard',
          unitPriceDT: 7.500,
          totalPriceDT: 15.000,
        }
      ],
      modeLivraison: 'express',
      modePaiement: 'carte_tpe_livraison',
      sousTotalDT: 51.000,
      fraisLivraisonDT: 0,
      remiseDT: 0,
      totalDT: 51.000,
      status: 'en_livraison',
      historiqueStatus: [
        { status: 'recue', timestamp: '12:20' },
        { status: 'en_cuisine', timestamp: '12:25' },
        { status: 'en_livraison', timestamp: '12:42', note: 'Avec coursier moto' },
      ]
    }
  ]);

  // Seed Customer Complaints (Réclamations)
  const [reclamations, setReclamations] = useState<CustomerReclamation[]>([
    {
      id: 'rec-1',
      nom: 'Karim Gharbi',
      telephone: '+216 55 120 340',
      commandeRef: 'CMD-TN-2838',
      motif: 'retard',
      message: 'Le livreur a pris 55 minutes au lieu de 35 min pour arriver à Ennasr 2. Merci de faire un geste commercial.',
      date: '02/11/2026',
      heure: '11:15',
      statut: 'en_attente',
    }
  ]);

  // Sync lang & dir
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Filter products for Unified Menu
  const filteredProducts = products.filter((prod) => {
    const hasSearch = searchQuery.trim().length > 0;

    // When the user searches globally from the top bar, match across all categories
    if (!hasSearch && selectedCategory !== 'all' && prod.categoryId !== selectedCategory) {
      return false;
    }

    if (hasSearch && !doesProductMatchQuery(prod, searchQuery, language)) {
      return false;
    }

    return true;
  });

  // Cart Handlers
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.product.id === newItem.product.id &&
          it.selectedSize === newItem.selectedSize &&
          it.selectedMilk === newItem.selectedMilk &&
          it.sweetness === newItem.sweetness &&
          it.iceLevel === newItem.iceLevel &&
          JSON.stringify(it.selectedToppings) === JSON.stringify(newItem.selectedToppings)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const exist = updated[existingIdx];
        const newQty = exist.quantity + newItem.quantity;
        updated[existingIdx] = {
          ...exist,
          quantity: newQty,
          totalPriceDT: exist.unitPriceDT * newQty,
        };
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      selectedSize: product.availableSizes ? 'standard' : undefined,
      selectedMilk: product.hasMilkChoice ? 'entier' : undefined,
      sweetness: product.hasSweetnessChoice ? 50 : undefined,
      iceLevel: product.hasIceChoice ? 'standard' : undefined,
      unitPriceDT: product.priceDT,
      totalPriceDT: product.priceDT,
    };
    handleAddToCart(newItem);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.quantity + delta;
            return newQty > 0
              ? { ...it, quantity: newQty, totalPriceDT: it.unitPriceDT * newQty }
              : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleApplyCoupon = (code: string): boolean => {
    const upper = code.toUpperCase().trim();
    if (upper === 'SAVE15') {
      setDiscount(15);
      return true;
    }
    if (upper === 'WELCOME10') {
      setDiscount(10);
      return true;
    }
    return false;
  };

  // Order Handlers
  const handleOrderComplete = (order: Order) => {
    setCurrentOrder(order);
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...ord,
            status,
            historiqueStatus: [
              ...ord.historiqueStatus,
              { status, timestamp: nowStr, note }
            ]
          };
        }
        return ord;
      })
    );
  };

  // Admin Menu Handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
  };

  const handleDeleteProduct = (prodId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
  };

  const handleToggleProductAvailability = (prodId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  // Complaints Handler
  const handleAddReclamation = (newRec: CustomerReclamation) => {
    setReclamations((prev) => [newRec, ...prev]);
  };

  const handleUpdateReclamationStatus = (recId: string, status: 'en_attente' | 'resolue') => {
    setReclamations((prev) =>
      prev.map((r) => (r.id === recId ? { ...r, statut: status } : r))
    );
  };

  // Open Admin handling
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminDashboardOpen(false);
  };

  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: CategoryId | 'all') => {
    setSelectedCategory(cat);
    if (searchQuery) {
      setSearchQuery('');
    }
  };

  // Keyboard shortcut (Ctrl+Shift+A) & URL Hash (#admin) detection for presenter/admin
  useEffect(() => {
    const checkHashOrQuery = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        handleOpenAdmin();
      }
    };
    checkHashOrQuery();
    window.addEventListener('hashchange', checkHashOrQuery);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHashOrQuery);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminLoggedIn]);

  const totalCartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Discreet Staff Management Bar (Visible ONLY when logged in as admin) */}
      {isAdminLoggedIn && (
        <div className="bg-stone-900 text-stone-200 border-b border-stone-800 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-sm z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-emerald-400">Espace Restaurant Restreint</span>
            <span className="text-stone-500 hidden sm:inline">|</span>
            <span className="text-stone-400 hidden sm:inline">Connecté : admin@resto.tn (Gérance)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminDashboardOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Ouvrir Console Restaurant</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-stone-800 hover:bg-stone-700 text-stone-300 px-2.5 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3 text-red-400" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Top Bar Header with Search & Dropdown Menu for La Carte */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
        onScrollToMenu={scrollToMenu}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        language={language}
        onScrollToMenu={scrollToMenu}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Unified & Grouped Menu Section (Focal Point of the App) */}
      <main className="flex-1">
        <UnifiedMenu
          products={filteredProducts}
          allProducts={products}
          language={language}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenProductModal={(p) => setActiveProduct(p)}
          onQuickAdd={handleQuickAdd}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onScrollToMenu={scrollToMenu}
      />

      {/* 1. Product Customization Modal */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          language={language}
          onClose={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 2. Slide-over Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        language={language}
        discount={discount}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* 3. Multi-Step Checkout Modal with Tunisia Localization & Payment */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={discount}
        language={language}
        onOrderComplete={handleOrderComplete}
      />

      {/* 4. Customer Order Confirmation Screen */}
      <OrderSuccessModal
        order={currentOrder}
        language={language}
        onClose={() => setCurrentOrder(null)}
      />

      {/* 5. Contact, Physical Location & Customer Complaints Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language={language}
        onAddReclamation={handleAddReclamation}
      />

      {/* 6. Protected Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        language={language}
      />

      {/* 7. Admin Console: Live Orders, Menu Management & Customer Complaints */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleLogout}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onToggleProductAvailability={handleToggleProductAvailability}
        reclamations={reclamations}
        onUpdateReclamationStatus={handleUpdateReclamationStatus}
        language={language}
      />

      {/* 8. Portfolio Showcase Demo Controller (Client pitch & Back-Office switcher) */}
      <PortfolioShowcaseBadge
        language={language}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={handleOpenAdmin}
        onLogout={handleLogout}
      />

    </div>
  );
}
