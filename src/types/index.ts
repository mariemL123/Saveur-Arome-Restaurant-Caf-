export type Language = 'fr' | 'ar' | 'en';

export type CategoryId = 
  | 'boissons_froides'
  | 'boissons_chaudes'
  | 'jus_cocktails'
  | 'burgers_plats'
  | 'pizzas'
  | 'desserts';

export interface LocalizedString {
  fr: string;
  ar: string;
  en: string;
}

export interface CustomizationOption {
  id: string;
  name: LocalizedString;
  priceDT: number;
}

export interface Product {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  categoryId: CategoryId;
  priceDT: number; // in Tunisian Dinars
  calories?: number;
  prepTimeMinutes: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isChefSpecial?: boolean;
  isAvailable?: boolean;
  hasMilkChoice?: boolean;
  hasSweetnessChoice?: boolean;
  hasIceChoice?: boolean;
  availableSizes?: {
    id: 'standard' | 'large';
    name: LocalizedString;
    priceModifierDT: number;
  }[];
  extraToppings?: CustomizationOption[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: 'standard' | 'large';
  selectedMilk?: string;
  sweetness?: number;
  iceLevel?: 'sans' | 'leger' | 'standard' | 'extra';
  selectedToppings?: CustomizationOption[];
  specialInstructions?: string;
  unitPriceDT: number;
  totalPriceDT: number;
}

export type DeliveryType = 'express' | 'programmee' | 'sur_place';

export interface TunisiaLocation {
  gouvernorat: string;
  delegation: string;
  adresse: string;
  codePostal?: string;
  pointRepere?: string;
}

export interface CustomerInfo {
  nomComplet: string;
  telephone: string;
  email?: string;
  location: TunisiaLocation;
  instructionsLivreur?: string;
}

export type PaymentMethodId = 'especes_livraison' | 'carte_tpe_livraison' | 'carte_en_ligne' | 'd17_flouci';

export type OrderStatus = 'recue' | 'en_cuisine' | 'en_livraison' | 'livree' | 'annulee';

export interface Order {
  id: string;
  reference: string;
  date: string;
  heure: string;
  customer: CustomerInfo;
  items: CartItem[];
  modeLivraison: DeliveryType;
  creneauHoraire?: string;
  modePaiement: PaymentMethodId;
  sousTotalDT: number;
  fraisLivraisonDT: number;
  remiseDT: number;
  totalDT: number;
  status: OrderStatus;
  historiqueStatus: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface CustomerReclamation {
  id: string;
  nom: string;
  telephone: string;
  commandeRef?: string;
  motif: 'retard' | 'qualite' | 'erreur' | 'service' | 'autre';
  message: string;
  date: string;
  heure: string;
  statut: 'en_attente' | 'resolue';
}
