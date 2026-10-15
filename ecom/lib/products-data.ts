export interface ProductSpecification {
  gsm?: string;
  composition?: string;
  fit?: string;
  customization?: string[];
  weave?: string;
  washCare?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'HOODIES' | 'JACKETS' | 'T-SHIRTS' | 'POLOS' | 'TRACKSUITS' | 'TRACKPANTS' | 'SWEATERS' | 'BEANIES';
  subcategory: string;
  season: 'Winter' | 'Summer' | 'All Season';
  badge?: 'BESTSELLER' | 'NEW DROP' | 'HOT SELLER' | 'HEAVYWEIGHT' | 'LIMITED' | 'ORGANIC';
  price: number; // in INR ₹ for retail selling
  compareAtPrice: number; // Retail MSRP strikethrough
  stockCount: number;
  rating: number;
  reviewsCount: number;
  description: string;
  fabric: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  featured?: boolean;
  specifications: ProductSpecification;
  sku: string;
}

export const ECOM_PRODUCTS: Product[] = [
  // 1. T-SHIRTS
  {
    id: 'oversized-t-shirt-drop-shoulder',
    slug: 'oversized-t-shirt-drop-shoulder',
    name: 'Oversized T-Shirt (Drop Shoulder)',
    category: 'T-SHIRTS',
    subcategory: 'T-Shirts',
    season: 'All Season',
    badge: 'BESTSELLER',
    price: 699,
    compareAtPrice: 1199,
    stockCount: 140,
    rating: 4.9,
    reviewsCount: 84,
    description: 'Heavy-density combed cotton with an exaggerated drop-shoulder drape, wide ribbed collar, and relaxed streetwear fit engineered for high-end brand labeling.',
    fabric: '220–260 GSM 100% Super Combed Cotton Single Jersey',
    colors: [
      { name: 'Sage Olive', hex: '#63705d' },
      { name: 'Pitch Black', hex: '#111317' },
      { name: 'Slate Graphite', hex: '#2d3748' },
      { name: 'Chalk Off-White', hex: '#f7fafc' },
      { name: 'Muted Mocha', hex: '#786c5e' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
      '/images/products/oversized-t-shirt-drop-shoulder-1.jpg',
      '/images/products/oversized-t-shirt-drop-shoulder-2.jpg'
    ],
    featured: true,
    sku: 'SLT-TS-01',
    specifications: {
      gsm: '240 GSM Super Combed Cotton',
      composition: '100% Cotton / Lycra Rib Neck',
      fit: 'Relaxed Drop Shoulder / Boxy Cut',
      washCare: 'Machine wash cold 30°C, inside-out, do not tumble dry.'
    }
  },
  {
    id: 'biowash-t-shirt',
    slug: 'biowash-t-shirt',
    name: 'Biowash T-Shirt',
    category: 'T-SHIRTS',
    subcategory: 'T-Shirts',
    season: 'Summer',
    badge: 'HOT SELLER',
    price: 599,
    compareAtPrice: 999,
    stockCount: 210,
    rating: 4.8,
    reviewsCount: 112,
    description: 'Ultra-soft enzymatic biowash fabric eliminates surface fuzz for an ultra-smooth hand-feel and vibrant color retention across commercial wash cycles.',
    fabric: '180–210 GSM 100% Combed Compact Cotton with Biowash Finish',
    colors: [
      { name: 'Jet Black', hex: '#0f1115' },
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Slate Smoke', hex: '#718096' },
      { name: 'Charcoal Melange', hex: '#374151' },
      { name: 'Forest Green', hex: '#1b4332' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/biowash-t-shirt-1.jpg',
      '/images/products/biowash-t-shirt-2.jpg',
      '/images/products/biowash-t-shirt-3.jpg'
    ],
    featured: false,
    sku: 'SLT-TS-02',
    specifications: {
      gsm: '190 GSM Enzymatic Biowashed Cotton',
      composition: '100% Compact Combed Cotton',
      fit: 'Contemporary Crew Neck Regular Fit',
      washCare: 'Gentle cycle wash, flat dry in shade, color safe.'
    }
  },

  // 2. POLOS
  {
    id: 'polo-tshirt',
    slug: 'polo-tshirt',
    name: 'Polo Tshirt',
    category: 'POLOS',
    subcategory: 'Polos',
    season: 'All Season',
    badge: 'ORGANIC',
    price: 899,
    compareAtPrice: 1499,
    stockCount: 95,
    rating: 4.7,
    reviewsCount: 56,
    description: 'Refined pique polo crafted with durable flat-knit ribbed collar and cuffs, reinforced two-button placket, and side-slit vents for corporate and premium retail brands.',
    fabric: '220–260 GSM Honeycomb Cotton Pique Knit',
    colors: [
      { name: 'Deep Teal', hex: '#0e7490' },
      { name: 'Black Obsidian', hex: '#0f172a' },
      { name: 'Heather Slate', hex: '#64748b' },
      { name: 'Chalk White', hex: '#f8fafc' },
      { name: 'Royal Navy', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
      '/images/products/polo-tshirt-1.jpg',
      '/images/products/polo-tshirt-2.jpg',
      '/images/products/polo-tshirt-3.jpg'
    ],
    featured: true,
    sku: 'SLT-PL-01',
    specifications: {
      gsm: '240 GSM Combed Pique',
      composition: '100% Combed Cotton Pique',
      fit: 'Smart Athletic / Regular Fit',
      washCare: 'Cold wash with like colors, reshape collar while damp.'
    }
  },

  // 3. HOODIES
  {
    id: 'hoodies-regular-fit',
    slug: 'hoodies-regular-fit',
    name: 'Hoodies (Regular Fit)',
    category: 'HOODIES',
    subcategory: 'Hoodies',
    season: 'Winter',
    badge: 'BESTSELLER',
    price: 1299,
    compareAtPrice: 1999,
    stockCount: 120,
    rating: 4.8,
    reviewsCount: 92,
    description: 'Classic regular-fit hoodie tailored with double-needle construction, matching metal aglet drawcords, kangaroo pouch, and pre-shrunk anti-pilling fleece.',
    fabric: '320–360 GSM Cotton-Poly Brushed Fleece / French Terry',
    colors: [
      { name: 'Dusty Lavender', hex: '#877c9c' },
      { name: 'Pitch Black', hex: '#111317' },
      { name: 'Slate Gray', hex: '#475569' },
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Off-White', hex: '#f1f5f9' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/hoodies-regular-fit-1.jpg',
      '/images/products/hoodies-regular-fit-2.jpg',
      '/images/products/hoodies-regular-fit-3.jpg'
    ],
    featured: true,
    sku: 'SLT-HD-01',
    specifications: {
      gsm: '340 GSM Heavy Fleece',
      composition: '80% Combed Cotton / 20% Polyester',
      fit: 'Classic Tailored Regular Fit',
      washCare: 'Machine wash cold with mild detergent, line dry.'
    }
  },
  {
    id: 'oversized-hoodies',
    slug: 'oversized-hoodies',
    name: 'Oversized Hoodies',
    category: 'HOODIES',
    subcategory: 'Hoodies',
    season: 'Winter',
    badge: 'HEAVYWEIGHT',
    price: 1499,
    compareAtPrice: 2299,
    stockCount: 85,
    rating: 5.0,
    reviewsCount: 148,
    description: 'Heavyweight drop-shoulder streetwear hoodie with seamless double-layered hood, wide architectural sleeves, and clean kangaroo front pocket.',
    fabric: '380–450 GSM Heavy French Terry / Diagonal Loopback Fleece',
    colors: [
      { name: 'Rich Plum', hex: '#4a154b' },
      { name: 'Jet Black', hex: '#0a0d14' },
      { name: 'Slate Graphite', hex: '#334155' },
      { name: 'Washed Vintage Charcoal', hex: '#1e293b' },
      { name: 'Chalk White', hex: '#f8fafc' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
      '/images/products/oversized-hoodies-2.jpg',
      '/images/products/oversized-hoodies-1.jpg'
    ],
    featured: true,
    sku: 'SLT-HD-02',
    specifications: {
      gsm: '420 GSM Heavy Terry',
      composition: '100% Combed Cotton French Terry',
      fit: 'Exaggerated Drop Shoulder Boxy Cut',
      washCare: 'Cold gentle cycle, inside-out, tumble dry low heat.'
    }
  },
  {
    id: 'sherpa-fleece-hoodies',
    slug: 'sherpa-fleece-hoodies',
    name: 'Sherpa Fleece Hoodies',
    category: 'HOODIES',
    subcategory: 'Hoodies',
    season: 'Winter',
    badge: 'LIMITED',
    price: 1799,
    compareAtPrice: 2799,
    stockCount: 45,
    rating: 5.0,
    reviewsCount: 62,
    description: 'Dense teddy-sherpa fleece engineered for extreme cold insulation with plush interior, reinforced kangaroo pocket, and heavy-duty drawcords.',
    fabric: '380–420 GSM Double-Face High-Pile Sherpa Lambswool Fleece',
    colors: [
      { name: 'Warm Camel', hex: '#b45309' },
      { name: 'Off-White Ecru', hex: '#fef3c7' },
      { name: 'Deep Charcoal', hex: '#1f2937' },
      { name: 'Slate Black', hex: '#0f172a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/sherpa-fleece-hoodies-2.jpg',
      '/images/products/sherpa-fleece-hoodies-1.jpg'
    ],
    featured: true,
    sku: 'SLT-HD-03',
    specifications: {
      gsm: '400 GSM Double-Sided Sherpa',
      composition: '100% Thermal Poly Sherpa Fleece',
      fit: 'Cozy Oversized Silhouette',
      washCare: 'Professional dry clean or cold delicate cycle.'
    }
  },
  {
    id: 'polar-fleece-hoodies',
    slug: 'polar-fleece-hoodies',
    name: 'Polar Fleece Hoodies',
    category: 'HOODIES',
    subcategory: 'Hoodies',
    season: 'Winter',
    badge: 'NEW DROP',
    price: 1399,
    compareAtPrice: 2199,
    stockCount: 60,
    rating: 4.9,
    reviewsCount: 38,
    description: 'Breathable, hydrophobic polar fleece with an ultra-lightweight warm profile, elastic binding on hem and cuffs, and wind-blocking collar hood.',
    fabric: '280–320 GSM Anti-Pilling Micro Polar Fleece',
    colors: [
      { name: 'Carbon Slate', hex: '#334155' },
      { name: 'Pitch Black', hex: '#0f172a' },
      { name: 'Bone Off-White', hex: '#f1f5f9' },
      { name: 'Muted Forest', hex: '#14532d' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/polar-fleece-hoodies-3.jpg',
      '/images/products/polar-fleece-hoodies-1.jpg',
      '/images/products/polar-fleece-hoodies-2.jpg'
    ],
    featured: false,
    sku: 'SLT-HD-04',
    specifications: {
      gsm: '300 GSM Anti-Pilling Micro Fleece',
      composition: '100% Thermal Polyester',
      fit: 'Comfort Regular Fit',
      washCare: 'Machine wash cold on gentle, hang dry.'
    }
  },

  // 4. JACKETS
  {
    id: 'varsity-jackets',
    slug: 'varsity-jackets',
    name: 'Varsity Jackets',
    category: 'JACKETS',
    subcategory: 'Jackets',
    season: 'Winter',
    badge: 'HOT SELLER',
    price: 1899,
    compareAtPrice: 2999,
    stockCount: 50,
    rating: 4.8,
    reviewsCount: 76,
    description: 'Heavyweight heritage varsity silhouette featuring striped ribbed collar and waistband, internal diamond-quilted thermal lining, and heavy-gauge snap buttons.',
    fabric: 'Melton Wool Body with Contrast Vegan / PU Leather Sleeves',
    colors: [
      { name: 'Forest Green / Chalk', hex: '#143828' },
      { name: 'Monochrome Black / Chalk', hex: '#111827' },
      { name: 'Slate Charcoal / Black', hex: '#1f2937' },
      { name: 'Navy / Off-White', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/varsity-jackets-2.jpg',
      '/images/products/varsity-jackets-1.jpg'
    ],
    featured: true,
    sku: 'SLT-JK-01',
    specifications: {
      gsm: '500+ GSM Melton Wool Body',
      composition: 'Wool Blend Body / Matte PU Sleeves / Polyfill Quilted Interior',
      fit: 'Boxy Retro Bomber Fit',
      washCare: 'Specialist Dry Clean Only.'
    }
  },
  {
    id: 'puffer-jackets',
    slug: 'puffer-jackets',
    name: 'Puffer Jackets',
    category: 'JACKETS',
    subcategory: 'Jackets',
    season: 'Winter',
    badge: 'BESTSELLER',
    price: 1999,
    compareAtPrice: 3299,
    stockCount: 65,
    rating: 4.9,
    reviewsCount: 110,
    description: 'Ultralight yet high-loft thermal down jacket with horizontal baffle quilting, storm flap interior zipper, adjustable cinch waist, and storm cuffs.',
    fabric: 'Water-Repellent DWR Ripstop Nylon with Micro-Thermal Down Fill',
    colors: [
      { name: 'Slate Gray', hex: '#475569' },
      { name: 'Matte Obsidian', hex: '#0f172a' },
      { name: 'Carbon Graphite', hex: '#1e293b' },
      { name: 'Snow White', hex: '#f8fafc' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/puffer-jackets-3.jpg',
      '/images/products/puffer-jackets-1.jpg',
      '/images/products/puffer-jackets-2.jpg'
    ],
    featured: true,
    sku: 'SLT-JK-02',
    specifications: {
      gsm: 'Lightweight 380T Nylon Shell + 300g Thermal Down-Alternative Filling',
      composition: '100% DWR Nylon Shell / 100% Polyfill',
      fit: 'Modern Boxy Puffer Profile',
      washCare: 'Wipe clean or gentle machine wash cold, air dry.'
    }
  },
  {
    id: 'polar-fleece-jackets',
    slug: 'polar-fleece-jackets',
    name: 'Polar Fleece Jackets',
    category: 'JACKETS',
    subcategory: 'Jackets',
    season: 'Winter',
    badge: 'NEW DROP',
    price: 1299,
    compareAtPrice: 1999,
    stockCount: 75,
    rating: 4.7,
    reviewsCount: 42,
    description: 'Full-zip outdoor fleece jacket featuring stand-up wind collar, nylon-reinforced chest utility pocket, and stretch-bound cuffs for thermal retention.',
    fabric: '300–340 GSM High-Density Anti-Pill Micro Polar Fleece',
    colors: [
      { name: 'Onyx Black', hex: '#0f172a' },
      { name: 'Slate Gray', hex: '#475569' },
      { name: 'Olive Drab', hex: '#3f4e3c' },
      { name: 'Ivory Off-White', hex: '#f8fafc' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/polar-fleece-jackets-2.jpg',
      '/images/products/polar-fleece-jackets-1.jpg',
      '/images/products/polar-fleece-jackets-3.jpg'
    ],
    featured: false,
    sku: 'SLT-JK-03',
    specifications: {
      gsm: '320 GSM High-Density Polar Fleece',
      composition: '100% Recycled Thermal Polyester',
      fit: 'Active Outdoor Regular Fit',
      washCare: 'Quick wash cold, air dry.'
    }
  },
  {
    id: 'denim-jackets',
    slug: 'denim-jackets',
    name: 'Denim Jackets',
    category: 'JACKETS',
    subcategory: 'Jackets',
    season: 'All Season',
    badge: 'ORGANIC',
    price: 1699,
    compareAtPrice: 2699,
    stockCount: 60,
    rating: 4.9,
    reviewsCount: 88,
    description: 'Classic trucker silhouette built from heavyweight ring-spun cotton denim with shank button closure, twin chest flap pockets, and adjustable waist tabs.',
    fabric: '13.5–14.5 oz 100% Rigid / Comfort Stretch Indigo Cotton Denim',
    colors: [
      { name: 'Enzyme Washed Gray', hex: '#64748b' },
      { name: 'Vintage Slate Indigo', hex: '#1e3a5f' },
      { name: 'Washed Black', hex: '#1f2937' },
      { name: 'Raw Dark Indigo', hex: '#0f172a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/denim-jackets-4.jpg',
      '/images/products/denim-jackets-1.jpg',
      '/images/products/denim-jackets-2.jpg',
      '/images/products/denim-jackets-3.jpg'
    ],
    featured: true,
    sku: 'SLT-JK-04',
    specifications: {
      gsm: '14.0 oz Heavyweight Denim',
      composition: '100% Ring-Spun Cotton / Vintage Enzyme Wash',
      fit: 'Classic Trucker Cut / Tailored Drop',
      washCare: 'Wash inside-out cold, hang dry to preserve tint.'
    }
  },

  // 5. TRACKSUITS
  {
    id: 'fleece-tracksuits',
    slug: 'fleece-tracksuits',
    name: 'Fleece Tracksuits',
    category: 'TRACKSUITS',
    subcategory: 'Tracksuits',
    season: 'Winter',
    badge: 'BESTSELLER',
    price: 1699,
    compareAtPrice: 2699,
    stockCount: 70,
    rating: 4.8,
    reviewsCount: 64,
    description: 'Complete 2-piece fleece co-ord set featuring a pullover hoodie paired with tapered elastic-cuff joggers with deep welt pockets.',
    fabric: '340–380 GSM Brushed Interior Heavy Fleece',
    colors: [
      { name: 'Deep Navy', hex: '#0f2027' },
      { name: 'Monochrome Slate', hex: '#475569' },
      { name: 'Jet Black', hex: '#111317' },
      { name: 'Chalk Heather', hex: '#e2e8f0' },
      { name: 'Smoky Olive', hex: '#3f4e3c' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/fleece-tracksuits-2.jpg',
      '/images/products/fleece-tracksuits-1.jpg'
    ],
    featured: true,
    sku: 'SLT-TS-01',
    specifications: {
      gsm: '360 GSM Cotton-Poly Blend',
      composition: '80% Combed Cotton / 20% Polyester Heavy Fleece',
      fit: 'Athletic Relaxed Co-ord Fit',
      washCare: 'Machine wash 30°C with similar dark colors.'
    }
  },
  {
    id: 'omniheat-tracksuits',
    slug: 'omniheat-tracksuits',
    name: 'Omniheat Tracksuits',
    category: 'TRACKSUITS',
    subcategory: 'Tracksuits',
    season: 'Winter',
    badge: 'NEW DROP',
    price: 1899,
    compareAtPrice: 2999,
    stockCount: 40,
    rating: 5.0,
    reviewsCount: 79,
    description: 'High-performance winter sportswear engineered with silver thermal-reflective interior lining to retain body heat in freezing conditions.',
    fabric: 'Waterproof DWR Softshell Exterior with Thermal Heat-Reflective Dot Lining',
    colors: [
      { name: 'Obsidian Black', hex: '#0a0d14' },
      { name: 'Carbon Gray', hex: '#374151' },
      { name: 'Slate Graphite', hex: '#475569' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/omniheat-tracksuits-2.jpg',
      '/images/products/omniheat-tracksuits-1.jpg',
      '/images/products/omniheat-tracksuits-3.jpg'
    ],
    featured: true,
    sku: 'SLT-TS-02',
    specifications: {
      gsm: '320 GSM Bonded Softshell with Metallic Omni-Dot Lining',
      composition: '92% Polyester / 8% Spandex with DWR Coating',
      fit: 'Athletic Kinetic Fit',
      washCare: 'Gentle cycle, cold water, line dry only.'
    }
  },

  // 6. TRACKPANTS
  {
    id: 'balloon-fit-trackpants',
    slug: 'balloon-fit-trackpants',
    name: 'Balloon Fit Trackpants',
    category: 'TRACKPANTS',
    subcategory: 'Trackpants',
    season: 'All Season',
    badge: 'NEW DROP',
    price: 999,
    compareAtPrice: 1599,
    stockCount: 110,
    rating: 4.9,
    reviewsCount: 52,
    description: 'Voluminous curved outer seam tailored into a structured balloon silhouette, tapering gracefully at the ankle with deep slash pockets and thick drawcord waistband.',
    fabric: '280–320 GSM Structured Loopback Terry / Heavy Cotton Twill',
    colors: [
      { name: 'Pitch Black', hex: '#111317' },
      { name: 'Slate Smoke', hex: '#64748b' },
      { name: 'Off-White Ivory', hex: '#f8fafc' },
      { name: 'Washed Olive', hex: '#4d5d4b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/balloon-fit-trackpants-2.jpg',
      '/images/products/balloon-fit-trackpants-1.jpg'
    ],
    featured: true,
    sku: 'SLT-TP-01',
    specifications: {
      gsm: '320 GSM Structured Cotton Terry',
      composition: '100% Combed Cotton',
      fit: 'Exaggerated Balloon / Wide Barrel Leg Fit',
      washCare: 'Cold wash, inside-out, tumble dry gentle.'
    }
  },
  {
    id: 'trackpants-regular-fit',
    slug: 'trackpants-regular-fit',
    name: 'Trackpants (Regular Fit)',
    category: 'TRACKPANTS',
    subcategory: 'Trackpants',
    season: 'All Season',
    price: 799,
    compareAtPrice: 1299,
    stockCount: 150,
    rating: 4.6,
    reviewsCount: 71,
    description: 'Straight-leg regular fit track pants with interior brushed comfort, durable elasticated waistband with eyelets, and zippered side pockets.',
    fabric: '260–300 GSM Cotton-Poly Interlock / French Terry',
    colors: [
      { name: 'Jet Black', hex: '#000000' },
      { name: 'Slate Melange', hex: '#475569' },
      { name: 'Deep Navy', hex: '#1e3a8a' },
      { name: 'Charcoal', hex: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
      '/images/products/trackpants-regular-fit-1.jpg',
      '/images/products/trackpants-regular-fit-2.jpg',
      '/images/products/trackpants-regular-fit-3.jpg'
    ],
    featured: false,
    sku: 'SLT-TP-02',
    specifications: {
      gsm: '280 GSM Cotton Blend Interlock',
      composition: '70% Cotton / 30% Polyester',
      fit: 'Classic Straight-Leg Regular Fit',
      washCare: 'Machine wash warm, tumble dry normal.'
    }
  },
  {
    id: 'fleece-trackpants-jogger-fit',
    slug: 'fleece-trackpants-jogger-fit',
    name: 'Fleece Trackpants (Jogger Fit)',
    category: 'TRACKPANTS',
    subcategory: 'Trackpants',
    season: 'Winter',
    price: 899,
    compareAtPrice: 1399,
    stockCount: 130,
    rating: 4.8,
    reviewsCount: 95,
    description: 'Tapered streetwear jogger cut with 2x2 ribbed ankle cuffs, heavy flat drawcords, reinforced seat stitching, and deep slant pockets.',
    fabric: '320–360 GSM Brushed Fleece with Elastane Ribbed Cuffs',
    colors: [
      { name: 'Carbon Black', hex: '#0f172a' },
      { name: 'Slate Heather', hex: '#64748b' },
      { name: 'Smoky Chalk', hex: '#e2e8f0' },
      { name: 'Navy', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/fleece-trackpants-jogger-fit-1.jpg',
      '/images/products/fleece-trackpants-jogger-fit-2.jpg',
      '/images/products/fleece-trackpants-jogger-fit-3.jpg'
    ],
    featured: false,
    sku: 'SLT-TP-03',
    specifications: {
      gsm: '340 GSM Heavy Brushed Fleece',
      composition: '80% Combed Cotton / 20% Polyester',
      fit: 'Tapered Slim-to-Relaxed Jogger Fit',
      washCare: 'Cold wash, do not bleach.'
    }
  },

  // 7. SWEATERS
  {
    id: 'sweaters',
    slug: 'sweaters',
    name: 'Sweaters',
    category: 'SWEATERS',
    subcategory: 'Knitwear',
    season: 'Winter',
    badge: 'HOT SELLER',
    price: 1599,
    compareAtPrice: 2499,
    stockCount: 50,
    rating: 4.9,
    reviewsCount: 83,
    description: 'Artisanal checkerboard knit crewneck sweater with ribbed collar, hem, and cuffs. Superior elasticity, soft drape, and zero irritation against skin.',
    fabric: 'Fine-Gauge Combed Cotton-Cashmere Blend / Acrylic Knit',
    colors: [
      { name: 'Forest Green / Ivory Checker', hex: '#1e392a' },
      { name: 'Slate Charcoal', hex: '#374151' },
      { name: 'Obsidian Black', hex: '#090d16' },
      { name: 'Midnight Navy', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/sweaters-1.jpg',
      '/images/products/sweaters-2.jpg'
    ],
    featured: true,
    sku: 'SLT-SW-01',
    specifications: {
      gsm: '7-Gauge / 12-Gauge Precision Knit',
      composition: 'Cotton-Acrylic Knit Blend',
      fit: 'Relaxed Tailored Knit Silhouette',
      washCare: 'Hand wash cold or dry clean, dry flat in shade.'
    }
  },

  // 8. BEANIES
  {
    id: 'beanies',
    slug: 'beanies',
    name: 'Beanies',
    category: 'BEANIES',
    subcategory: 'Headwear',
    season: 'Winter',
    badge: 'BESTSELLER',
    price: 599,
    compareAtPrice: 899,
    stockCount: 260,
    rating: 4.9,
    reviewsCount: 164,
    description: 'Double-cuffed and skull-cap ribbed and buffalo fleece beanies engineered with four-point crown closure and ultra-soft thermal stretch retention.',
    fabric: 'Heavy Ribbed Acrylic / Buffalo Fleece Knit',
    colors: [
      { name: 'Navy Plaid', hex: '#1e3a8a' },
      { name: 'Deep Green', hex: '#14532d' },
      { name: 'Slate Melange', hex: '#64748b' },
      { name: 'Off-White Cream', hex: '#fef3c7' }
    ],
    sizes: ['One Size (Universal Stretch Fit)'],
    images: [
      '/images/products/beanies-4.jpg',
      '/images/products/beanies-2.jpg',
      '/images/products/beanies-3.jpg',
      '/images/products/beanies-1.jpg'
    ],
    featured: true,
    sku: 'SLT-BN-01',
    specifications: {
      gsm: 'Heavyweight Rib / Fleece Knit',
      composition: '100% Soft-Touch Stretch Thermal Poly',
      fit: 'Fold-Over Cuff / Snug Beanie Fit',
      washCare: 'Hand wash cold, reshape and dry flat.'
    }
  }
];

export const CATEGORIES_LIST = [
  'ALL',
  'HOODIES',
  'JACKETS',
  'T-SHIRTS',
  'POLOS',
  'TRACKSUITS',
  'TRACKPANTS',
  'SWEATERS',
  'BEANIES'
] as const;

export type CategoryType = typeof CATEGORIES_LIST[number];
