import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

/**
 * Normalizes text by lowercasing and removing accents/diacritics
 */
export const normalizeSearchText = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

/**
 * Smart multilingual & concept-aware search matcher
 */
export const doesProductMatchQuery = (product: Product, query: string, _language: Language): boolean => {
  const cleanQ = normalizeSearchText(query);
  if (!cleanQ) return true;

  const queryTokens = cleanQ.split(/\s+/).filter(Boolean);

  // 1. Concept: Drinks / Boissons / مشروبات
  const drinkKeywords = [
    'boisson', 'boissons', 'drink', 'drinks', 'beverage', 'beverages',
    'boire', 'glace', 'glacé', 'glacee', 'glacée', 'chaud', 'chaude',
    'مشروب', 'مشروبات', 'مشروب بارد', 'مشروبات باردة', 'مشروب ساخن', 'مشروبات ساخنة',
    'قهوة', 'شاي', 'عصير', 'عصائر', 'كوكتيل', 'ليموناضة'
  ];
  const isDrinkQuery = drinkKeywords.some(k => cleanQ.includes(k) || k.includes(cleanQ));
  if (isDrinkQuery && (
    product.categoryId === 'boissons_froides' ||
    product.categoryId === 'boissons_chaudes' ||
    product.categoryId === 'jus_cocktails'
  )) {
    return true;
  }

  // 2. Concept: Food / Plats / وجبات / أطباق
  const foodKeywords = [
    'plat', 'plats', 'nourriture', 'food', 'manger', 'repas', 'dejeuner', 'diner',
    'cuisine', 'gourmet', 'sandwich', 'repas chaud', 'salade', 'viande', 'boeuf',
    'وجبة', 'وجبات', 'طبق', 'أطباق', 'اطباق', 'طعام', 'أكل', 'اكل', 'ماكلة', 'سندويش'
  ];
  const isFoodQuery = foodKeywords.some(k => cleanQ.includes(k) || k.includes(cleanQ));
  if (isFoodQuery && (product.categoryId === 'burgers_plats' || product.categoryId === 'pizzas')) {
    return true;
  }

  // 3. Concept: Desserts / Sweets / حلويات
  const dessertKeywords = [
    'dessert', 'desserts', 'sucre', 'sucres', 'sweet', 'sweets', 'gateau', 'gateaux',
    'patisserie', 'patisseries', 'chocolat', 'tarte', 'tartelette', 'glace',
    'حلويات', 'حلو', 'تحلية', 'كعك', 'شكلاطة', 'شوكولاتة'
  ];
  const isDessertQuery = dessertKeywords.some(k => cleanQ.includes(k) || k.includes(cleanQ));
  if (isDessertQuery && product.categoryId === 'desserts') {
    return true;
  }

  // 4. Concept: Burgers / برجر
  const burgerKeywords = ['burger', 'burgers', 'smash', 'wagyu', 'cheeseburger', 'sandwich', 'برجر', 'همبرغر'];
  if (burgerKeywords.some(k => cleanQ.includes(k) || k.includes(cleanQ)) && product.categoryId === 'burgers_plats') {
    return true;
  }

  // 5. Concept: Pizzas / بيتزا
  const pizzaKeywords = ['pizza', 'pizzas', 'napolitaine', 'margherita', 'truffe', 'bufala', 'بيتزا'];
  if (pizzaKeywords.some(k => cleanQ.includes(k) || k.includes(cleanQ)) && product.categoryId === 'pizzas') {
    return true;
  }

  // 6. Concept: Coffee / Café / قهوة
  const coffeeKeywords = ['cafe', 'cafes', 'coffee', 'espresso', 'latte', 'cappuccino', 'قهوة', 'اسبريسو'];
  if (coffeeKeywords.some(k => cleanQ.includes(k) || k.includes(cleanQ))) {
    const isCoffeeProduct = [
      normalizeSearchText(product.name.fr),
      normalizeSearchText(product.name.en),
      product.name.ar,
      normalizeSearchText(product.description.fr),
      normalizeSearchText(product.description.en),
      product.description.ar
    ].some(txt => 
      txt.includes('cafe') || 
      txt.includes('coffee') || 
      txt.includes('espresso') || 
      txt.includes('latte') || 
      txt.includes('cappuccino') || 
      txt.includes('قهوة')
    );
    if (isCoffeeProduct) return true;
  }

  // 7. Concept: Tea / Thé / شاي
  const teaKeywords = ['the', 'thes', 'tea', 'infusion', 'menthe', 'pignon', 'pignons', 'شاي', 'تاي'];
  if (teaKeywords.some(k => cleanQ.includes(k) || k.includes(cleanQ))) {
    const isTeaProduct = [
      normalizeSearchText(product.name.fr),
      normalizeSearchText(product.name.en),
      product.name.ar,
      normalizeSearchText(product.description.fr),
      normalizeSearchText(product.description.en),
      product.description.ar
    ].some(txt => 
      txt.includes('the') || 
      txt.includes('tea') || 
      txt.includes('infusion') || 
      txt.includes('شاي')
    );
    if (isTeaProduct) return true;
  }

  // 8. Concept: Juice / Jus / عصائر
  const juiceKeywords = ['jus', 'juice', 'smoothie', 'citronnade', 'detox', 'عصير', 'ليموناضة'];
  if (juiceKeywords.some(k => cleanQ.includes(k) || k.includes(cleanQ)) && product.categoryId === 'jus_cocktails') {
    return true;
  }

  // 9. Full Product Text Corpus Search
  const catIdClean = normalizeSearchText(product.categoryId.replace(/_/g, ' '));
  const categoryLabels = [
    catIdClean,
    normalizeSearchText(TRANSLATIONS.fr.menu.categories[product.categoryId] || ''),
    normalizeSearchText(TRANSLATIONS.en.menu.categories[product.categoryId] || ''),
    TRANSLATIONS.ar.menu.categories[product.categoryId] || '',
  ].join(' ');

  const productCorpus = [
    normalizeSearchText(product.name.fr),
    normalizeSearchText(product.name.en),
    product.name.ar,
    normalizeSearchText(product.description.fr),
    normalizeSearchText(product.description.en),
    product.description.ar,
    categoryLabels,
    product.availableSizes?.map(s => `${normalizeSearchText(s.name.fr)} ${s.name.ar} ${normalizeSearchText(s.name.en)}`).join(' ') || '',
    product.extraToppings?.map(t => `${normalizeSearchText(t.name.fr)} ${t.name.ar} ${normalizeSearchText(t.name.en)}`).join(' ') || ''
  ].join(' ');

  if (productCorpus.includes(cleanQ)) {
    return true;
  }

  // Token-by-token matching (supporting plural/singular s)
  return queryTokens.every(token => {
    if (productCorpus.includes(token)) return true;
    if (token.endsWith('s') && productCorpus.includes(token.slice(0, -1))) return true;
    if (productCorpus.includes(token + 's')) return true;
    return false;
  });
};
