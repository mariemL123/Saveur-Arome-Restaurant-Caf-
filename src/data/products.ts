import { Product } from '../types';
import heroBannerImg from '../assets/images/hero_food_beverage_banner_1793605291539.jpg';
import specialtyLatteImg from '../assets/images/product_specialty_latte_1793605292368.jpg';
import citrusMojitoImg from '../assets/images/product_citrus_mojito_1793605293434.jpg';
import wagyuBurgerImg from '../assets/images/product_wagyu_burger_1793605293043.jpg';
import trufflePizzaImg from '../assets/images/product_truffle_pizza_1793605293667.jpg';

export const HERO_BANNER_IMAGE = heroBannerImg;

export const PRODUCTS: Product[] = [
  // 1. BOISSONS FROIDES & CAFÉS GLACÉS
  {
    id: 'prod-latte-caramel',
    name: {
      fr: 'Spanish Latte Caramel Glacé',
      ar: 'سبانيش كراميل لاتيه مثلج',
      en: 'Iced Spanish Caramel Latte'
    },
    description: {
      fr: 'Double espresso pur arabica, lait soyeux condensé, filet de caramel artisanal et crème onctueuse sur glaçons.',
      ar: 'إسبريسو غني مستخلص من حبوب بن أرابيكا ممزوج بحليب مكثف محلى وكراميل ذهبي مع رغوة كريمية باردة.',
      en: 'Specialty double shot espresso with velvety condensed milk swirl, artisanal caramel drizzle, and chilled foam.'
    },
    categoryId: 'boissons_froides',
    priceDT: 9.500,
    calories: 280,
    prepTimeMinutes: 5,
    rating: 4.9,
    reviewsCount: 148,
    image: specialtyLatteImg,
    isPopular: true,
    isChefSpecial: true,
    isAvailable: true,
    hasMilkChoice: true,
    hasSweetnessChoice: true,
    hasIceChoice: true,
    availableSizes: [
      { id: 'standard', name: { fr: 'Format Moyen (350ml)', ar: 'وسط (350 مل)', en: 'Regular (12oz)' }, priceModifierDT: 0 },
      { id: 'large', name: { fr: 'Grand Format (480ml)', ar: 'كبير (480 مل)', en: 'Large (16oz)' }, priceModifierDT: 2.500 }
    ],
    extraToppings: [
      { id: 'extra_shot', name: { fr: 'Shot espresso supplémentaire', ar: 'شوت إسبريسو إضافي', en: 'Extra Espresso Shot' }, priceDT: 2.000 },
      { id: 'caramel_drizzle', name: { fr: 'Nappage caramel beurre salé', ar: 'كراميل مملح إضافي', en: 'Salted Caramel Drizzle' }, priceDT: 1.500 },
      { id: 'whipped_cream', name: { fr: 'Chantilly maison', ar: 'كريمة خفق طازجة', en: 'Fresh Whipped Cream' }, priceDT: 1.000 }
    ]
  },
  {
    id: 'prod-matcha-cloud',
    name: {
      fr: 'Kyoto Matcha Cérémonial Glacé',
      ar: 'ماتشا كلاود الياباني المثلج',
      en: 'Kyoto Ceremonial Iced Matcha Cloud'
    },
    description: {
      fr: 'Matcha de grade cérémonial importé de Kyoto, fouetté au chasen avec lait d’avoine bio et mousse vanille nuage.',
      ar: 'شاي ماتشا احتفالي مستورد مباشرة من كيوتو، مخفوق مع حليب الشوفان البارد ورغوة الفانيليا الخفيفة.',
      en: 'First-harvest ceremonial grade matcha whisked with cold organic oat milk and topped with sweet vanilla cloud foam.'
    },
    categoryId: 'boissons_froides',
    priceDT: 11.000,
    calories: 190,
    prepTimeMinutes: 5,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    isPopular: true,
    isAvailable: true,
    hasMilkChoice: true,
    hasSweetnessChoice: true,
    hasIceChoice: true,
    availableSizes: [
      { id: 'standard', name: { fr: 'Standard (350ml)', ar: 'وسط (350 مل)', en: 'Regular (12oz)' }, priceModifierDT: 0 },
      { id: 'large', name: { fr: 'Grand (480ml)', ar: 'كبير (480 مل)', en: 'Large (16oz)' }, priceModifierDT: 2.500 }
    ],
    extraToppings: [
      { id: 'dirty_shot', name: { fr: 'Shot espresso (Dirty Matcha)', ar: 'شوت إسبريسو ديرتي ماتشا', en: 'Dirty Espresso Shot' }, priceDT: 2.000 }
    ]
  },

  // 2. JUS FRAIS & COCKTAILS MAISON
  {
    id: 'prod-citronnade-amandes',
    name: {
      fr: 'Citronnade Tunisienne aux Amandes & Menthe',
      ar: 'ليموناضة تونسية تقليدية باللوز والنعناع',
      en: 'Traditional Tunisian Lemonade with Almonds'
    },
    description: {
      fr: 'Citronnade artisanale fraîchement préparée selon la tradition tunisienne, parfumée à l’eau de fleur d’oranger, servie avec amandes émondées torréfiées et menthe fraîche.',
      ar: 'عصير ليمون بلدي طبيعي محضر على الطريقة التونسية الأصيلة بماء الزهر، يقدم مع لوز مفروم محمص وأوراق النعناع.',
      en: 'Authentic handmade Tunisian lemonade with orange blossom water, garnished with roasted blanched almonds and fresh mint.'
    },
    categoryId: 'jus_cocktails',
    priceDT: 7.500,
    calories: 160,
    prepTimeMinutes: 4,
    rating: 4.95,
    reviewsCount: 178,
    image: citrusMojitoImg,
    isPopular: true,
    isChefSpecial: true,
    isAvailable: true,
    hasSweetnessChoice: true,
    hasIceChoice: true,
    availableSizes: [
      { id: 'standard', name: { fr: 'Verre 350ml', ar: 'كأس 350 مل', en: 'Glass (350ml)' }, priceModifierDT: 0 },
      { id: 'large', name: { fr: 'Carafe 500ml', ar: 'كبير 500 مل', en: 'Carafe (500ml)' }, priceModifierDT: 3.000 }
    ],
    extraToppings: [
      { id: 'extra_amandes', name: { fr: 'Supplément Amandes émondées', ar: 'لوز إضافي محمص', en: 'Extra Roasted Almonds' }, priceDT: 1.800 }
    ]
  },
  {
    id: 'prod-green-detox',
    name: {
      fr: 'Jus Vert Détox Pressé à Froid',
      ar: 'عصير ديتوكس أخضر معصور على البارد',
      en: 'Cold-Pressed Green Glow Detox'
    },
    description: {
      fr: 'Pressé minute sans conservateur ni sucre ajouté : pomme verte, concombre croquant, céleri branche, gingembre frais et citron.',
      ar: 'عصير طبيعي 100% بدون سكر مضاف: تفاح أخضر، خيار، كرفس، زنجبيل طازج ولمسة ليمون.',
      en: '100% pure cold-pressed nectar of green apple, crisp cucumber, celery, fresh root ginger, and zesty lemon.'
    },
    categoryId: 'jus_cocktails',
    priceDT: 8.000,
    calories: 110,
    prepTimeMinutes: 4,
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    isAvailable: true,
    hasIceChoice: true
  },

  // 3. BOISSONS CHAUDES
  {
    id: 'prod-the-pignons',
    name: {
      fr: 'Thé Vert Tunisien à la Menthe & Pignons',
      ar: 'شاي تونسي أحمر أو أخضر بالنعناع والبندق (Pignons)',
      en: 'Royal Tunisian Mint Tea with Pine Nuts'
    },
    description: {
      fr: 'Infusion de thé traditionnelle servie fumante avec une généreuse poignée de pignons de pin de première qualité et menthe sauvage.',
      ar: 'شاي تقليدي مسبك على أصوله يقدم مع كمية وفيرة من البندق التونسي (حبات الصنوبر الفاخرة) والنعناع الطازج.',
      en: 'Traditional steeped tea served piping hot with a generous scoop of premium royal pine nuts (pignons) and fresh mint.'
    },
    categoryId: 'boissons_chaudes',
    priceDT: 6.500,
    calories: 85,
    prepTimeMinutes: 6,
    rating: 4.96,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    isChefSpecial: true,
    isAvailable: true,
    hasSweetnessChoice: true,
    extraToppings: [
      { id: 'extra_pignons', name: { fr: 'Double dose de Pignons', ar: 'دوبل بندق تونسي', en: 'Double Pine Nuts' }, priceDT: 3.000 }
    ]
  },
  {
    id: 'prod-cappuccino-artisan',
    name: {
      fr: 'Cappuccino Mousse de Velours',
      ar: 'كابتشينو برغوة الحليب المخملية',
      en: 'Artisan Velvet Cappuccino'
    },
    description: {
      fr: 'Espresso dense et mousse de lait fouettée à la micro-vapeur avec latte art et poudre de cacao amer.',
      ar: 'إسبريسو غني مع رغوة حليب ناعمة مرسومة باحتراف ومزينة ببودرة الكاكاو الفاخر.',
      en: 'Rich espresso with micro-foamed velvety milk, delicate latte art, and organic cocoa dust.'
    },
    categoryId: 'boissons_chaudes',
    priceDT: 5.500,
    calories: 130,
    prepTimeMinutes: 4,
    rating: 4.85,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    hasMilkChoice: true
  },

  // 4. BURGERS & PLATS GOURMETS
  {
    id: 'prod-wagyu-burger',
    name: {
      fr: 'Burger Wagyu Gourmet à la Truffe',
      ar: 'برجر واغيو الكمأة الفاخر',
      en: 'Artisan Wagyu Truffle Burger'
    },
    description: {
      fr: 'Steak de bœuf Wagyu grillé sur flamme (180g), cheddar anglais affiné fondu, oignons confits au miel, sauce aïoli à la truffe sur bun brioché toasté.',
      ar: 'شريحة لحم واغيو مشوية على اللهب مع جبن شيدر إنجليزي معتق، بصل مكرمل بالعسل، وصلصة الكمأة في خبز بريوش طازج.',
      en: 'Flame-grilled prime Wagyu beef patty, aged vintage cheddar, slow-caramelized onions, and black truffle aioli in a toasted brioche bun.'
    },
    categoryId: 'burgers_plats',
    priceDT: 26.000,
    calories: 780,
    prepTimeMinutes: 18,
    rating: 4.98,
    reviewsCount: 220,
    image: wagyuBurgerImg,
    isPopular: true,
    isChefSpecial: true,
    isAvailable: true,
    availableSizes: [
      { id: 'standard', name: { fr: 'Steak Simple (180g)', ar: 'شريحة فردية (180غ)', en: 'Single Patty (180g)' }, priceModifierDT: 0 },
      { id: 'large', name: { fr: 'Double Wagyu (360g)', ar: 'شريحة مزدوجة (360غ)', en: 'Double Wagyu (360g)' }, priceModifierDT: 9.000 }
    ],
    extraToppings: [
      { id: 'frites_maison', name: { fr: 'Frites fraîches maison & sauce maison', ar: 'بطاطا مقلية طازجة وصوص', en: 'House French Fries' }, priceDT: 4.500 },
      { id: 'bacon_boeuf', name: { fr: 'Bacon de bœuf fumé croustillant', ar: 'بيكون بقري مدخن ومقرمش', en: 'Crispy Beef Bacon' }, priceDT: 3.500 },
      { id: 'extra_fromage', name: { fr: 'Cheddar affiné supplémentaire', ar: 'جبن شيدر إضافي', en: 'Extra Melted Cheddar' }, priceDT: 2.500 }
    ]
  },
  {
    id: 'prod-smash-burger',
    name: {
      fr: 'Double Smash Cheeseburger Signature',
      ar: 'دابل سماش تشيز برجر كلاسيك',
      en: 'Signature Double Smash Cheeseburger'
    },
    description: {
      fr: 'Deux steaks de bœuf Black Angus écrasés minute sur plaque en fonte, double cheddar fondu, cornichons fins et sauce secrète umami.',
      ar: 'شريحتان من اللحم البقري الأنجوس المضغوط على صفيح ساخن لحواف مقرمشة، مع دابل جبن، مخلل، وصلصة سرية.',
      en: 'Two seared beef patties smashed crispy on a griddle, melted double American cheese, dill pickles, and house secret sauce.'
    },
    categoryId: 'burgers_plats',
    priceDT: 19.500,
    calories: 720,
    prepTimeMinutes: 12,
    rating: 4.88,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true,
    extraToppings: [
      { id: 'jalapenos', name: { fr: 'Piments jalapeños épicés', ar: 'فلفل هلابينو حار', en: 'Spicy Jalapeños' }, priceDT: 1.500 },
      { id: 'frites_maison', name: { fr: 'Portion frites fraîches', ar: 'بطاطا مقلية', en: 'Side Fries' }, priceDT: 4.500 }
    ]
  },
  {
    id: 'prod-avocado-salmon',
    name: {
      fr: 'Brioche Toastée Saumon Fumé & Avocat',
      ar: 'توست بريوش الأفوكادو والسلمون المدخن',
      en: 'Smoked Salmon & Hass Avocado Brioche'
    },
    description: {
      fr: 'Pain brioché beurré et toasté, purée d’avocat Hass au citron de Tunisie, saumon fumé de Norvège, œuf mollet coulant et aneth fraîche.',
      ar: 'شريحة بريوش مخبوزة بالزبدة، مغطاة بأفوكادو مهروس، شرائح سلمون مدخن، بيضة مسلوقة وكريمة الشبت.',
      en: 'Toasted butter brioche slice, smashed lime avocado, Norwegian smoked salmon, soft boiled egg, and fresh dill.'
    },
    categoryId: 'burgers_plats',
    priceDT: 21.000,
    calories: 520,
    prepTimeMinutes: 12,
    rating: 4.87,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  },

  // 5. PIZZAS ARTISANALES AU FEU DE BOIS
  {
    id: 'prod-truffle-pizza',
    name: {
      fr: 'Pizza Napolitaine Truffe Noire & Bufala',
      ar: 'بيتزا نابوليتانا بالكمأة السوداء والموزاريلا',
      en: 'Neapolitan Black Truffle Pizza'
    },
    description: {
      fr: 'Pâte artisanale fermentée 48h, cuite au four à bois en pierre, mozzarella di bufala AOP fondante, crème de truffe noire et basilic frais.',
      ar: 'عجينة مخمرة ببطء لمدة 48 ساعة ومخبوزة في فرن الحطب الحجري، مع جبن موزاريلا دي بوفالا، كريمة الكمأة وزيت الزيتون.',
      en: 'Slow-fermented 48h artisan dough wood-fired, creamy mozzarella di bufala, black truffle cream, and fresh garden basil.'
    },
    categoryId: 'pizzas',
    priceDT: 28.000,
    calories: 890,
    prepTimeMinutes: 20,
    rating: 4.98,
    reviewsCount: 310,
    image: trufflePizzaImg,
    isPopular: true,
    isChefSpecial: true,
    isVegetarian: true,
    isAvailable: true,
    availableSizes: [
      { id: 'standard', name: { fr: 'Individuelle (28cm)', ar: 'شخصي (28 سم)', en: 'Personal (11")' }, priceModifierDT: 0 },
      { id: 'large', name: { fr: 'Grande / Partage (35cm)', ar: 'عائلي (35 سم)', en: 'Sharing (14")' }, priceModifierDT: 8.000 }
    ],
    extraToppings: [
      { id: 'burrata_entiere', name: { fr: 'Burrata entière crémeuse (125g)', ar: 'كرة بوراتا إيطالية كاملة', en: 'Whole Fresh Burrata' }, priceDT: 7.000 },
      { id: 'roquette', name: { fr: 'Roquette fraîche & crème balsamique', ar: 'جرجير طازج وصلصة بلسمك', en: 'Fresh Arugula' }, priceDT: 2.000 }
    ]
  },
  {
    id: 'prod-margherita-dop',
    name: {
      fr: 'Pizza Margherita Verace D.O.P',
      ar: 'بيتزا مارغريتا كلاسيكية D.O.P',
      en: 'Wood-Fired Margherita Classica D.O.P'
    },
    description: {
      fr: 'Sauce tomate San Marzano gorgée de soleil, fior di latte fondant, huile d’olive extra vierge et feuilles de basilic frais.',
      ar: 'صلصة طماطم سان مارزانو، جبنة فيور دي لاتي الطازجة، زيت زيتون بكر ممتاز وأوراق الريحان العطرية.',
      en: 'Authentic San Marzano tomato sauce, fresh artisan fior di latte cheese, extra virgin olive oil, and sweet basil.'
    },
    categoryId: 'pizzas',
    priceDT: 17.500,
    calories: 740,
    prepTimeMinutes: 15,
    rating: 4.92,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    isAvailable: true
  },

  // 6. DESSERTS & DOUCEURS
  {
    id: 'prod-croissant-pistachio',
    name: {
      fr: 'Tartelette Pistache de Sicile & Framboises',
      ar: 'تارت الفستق الحلبي وتوت العليق الطازج',
      en: 'French Pistachio & Fresh Raspberry Tart'
    },
    description: {
      fr: 'Pâte sablée pur beurre croustillante, ganache onctueuse et praliné à la pistache, framboises fraîches et éclats torréfiés.',
      ar: 'قاعدة بسكويت سابليه مقرمشة محشوة بكريمة برالينيه الفستق الحلبي، مغطاة بحبات توت العليق الطازجة ورقائق الفستق.',
      en: 'Crispy butter sablé crust filled with rich pistachio praline cream, topped with fresh raspberries.'
    },
    categoryId: 'desserts',
    priceDT: 12.000,
    calories: 360,
    prepTimeMinutes: 3,
    rating: 4.96,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    isChefSpecial: true,
    isAvailable: true
  },
  {
    id: 'prod-chocolate-lava',
    name: {
      fr: 'Fondant Cœur Coulant Chocolat Noir & Glace',
      ar: 'فوندان الشوكولاتة الداكنة بقلب ذائب وآيس كريم',
      en: 'Belgian Molten Chocolate Lava Cake'
    },
    description: {
      fr: 'Gâteau fondant cuit minute au chocolat noir 70%, cœur intensément coulant, servi avec une boule de glace vanille bourbon.',
      ar: 'كعكة شوكولاتة داكنة 70% تخبز فورياً، بقلب شوكولاتة ذائب يقدم مع كرة آيس كريم فانيليا.',
      en: 'Warm 70% dark Belgian cocoa cake with molten liquid center, served with authentic vanilla gelato.'
    },
    categoryId: 'desserts',
    priceDT: 11.500,
    calories: 480,
    prepTimeMinutes: 10,
    rating: 4.94,
    reviewsCount: 188,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    isAvailable: true
  }
];
