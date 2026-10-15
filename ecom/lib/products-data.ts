export interface ProductSpecification {
  gsm?: string;
  composition: string;
  fit: string;
  weave?: string;
  washCare?: string;
}

export interface BulkTier {
  minQty: number;
  discountPercentage: number;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'HOODIES' | 'JACKETS' | 'T-SHIRTS' | 'POLOS' | 'TRACKSUITS' | 'TRACKPANTS' | 'SWEATERS' | 'BEANIES';
  subcategory: string;
  season: 'Winter' | 'Summer' | 'All Season';
  badge?: 'BESTSELLER' | 'NEW DROP' | 'HOT SELLER' | 'HEAVYWEIGHT' | 'LIMITED' | 'ORGANIC';
  price: number; // in INR ₹
  compareAtPrice: number; // Strikethrough price
  stockCount: number;
  rating: number;
  reviewsCount: number;
  description: string;
  fabric: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  featured?: boolean;
  bulkTiers: BulkTier[];
  specifications: ProductSpecification;
  sku: string;
}

export const ECOM_PRODUCTS: Product[] = [
  // 1. T-SHIRTS
  {
    id: 'oversized-t-shirt-drop-shoulder',
    slug: 'oversized-t-shirt-drop-shoulder',
    name: 'Oversized Heavyweight T-Shirt (Drop Shoulder)',
    category: 'T-SHIRTS',
    subcategory: 'Streetwear Knits',
    season: 'All Season',
    badge: 'BESTSELLER',
    price: 799,
    compareAtPrice: 1499,
    stockCount: 142,
    rating: 4.9,
    reviewsCount: 84,
    description: 'Heavy-density combed cotton with an exaggerated drop-shoulder drape, wide 1.25" ribbed collar, and relaxed streetwear fit engineered for high-end fashion and durability.',
    fabric: '240 GSM 100% Super Combed Cotton Single Jersey',
    colors: [
      { name: 'Sage Olive', hex: '#63705d' },
      { name: 'Pitch Black', hex: '#111317' },
      { name: 'Slate Graphite', hex: '#2d3748' },
      { name: 'Chalk White', hex: '#f7fafc' },
      { name: 'Muted Mocha', hex: '#786c5e' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
      '/images/products/oversized-t-shirt-drop-shoulder-1.jpg',
      '/images/products/oversized-t-shirt-drop-shoulder-2.jpg'
    ],
    featured: true,
    sku: 'SLT-TS-01',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 679 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 559 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 479 }
    ],
    specifications: {
      gsm: '240 GSM Heavy Knit',
      composition: '100% Super Combed Cotton Single Jersey',
      fit: 'Relaxed Drop Shoulder / Boxy Cut',
      weave: 'Combed Compact 24s Count',
      washCare: 'Machine wash cold 30°C, do not tumble dry, warm iron inside-out.'
    }
  },
  {
    id: 'biowash-t-shirt',
    slug: 'biowash-t-shirt',
    name: 'Premium Enzymatic Biowash T-Shirt',
    category: 'T-SHIRTS',
    subcategory: 'Essentials',
    season: 'Summer',
    badge: 'HOT SELLER',
    price: 649,
    compareAtPrice: 1199,
    stockCount: 220,
    rating: 4.8,
    reviewsCount: 112,
    description: 'Ultra-soft enzymatic biowash fabric eliminates surface fuzz for an ultra-smooth hand-feel and vibrant color retention across commercial wash cycles.',
    fabric: '200 GSM 100% Combed Compact Cotton with Biowash Finish',
    colors: [
      { name: 'Jet Black', hex: '#0f1115' },
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Slate Smoke', hex: '#718096' },
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
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 549 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 449 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 389 }
    ],
    specifications: {
      gsm: '200 GSM Biowash',
      composition: '100% Cotton with Bio-Polishing Finish',
      fit: 'Modern Regular Fit',
      weave: 'Ring-spun Jersey',
      washCare: 'Gentle cycle wash, flat dry in shade, color safe.'
    }
  },

  // 2. POLOS
  {
    id: 'polo-tshirt',
    slug: 'polo-tshirt',
    name: 'Classic Pique Knit Polo Shirt',
    category: 'POLOS',
    subcategory: 'Smart Casuals',
    season: 'All Season',
    badge: 'ORGANIC',
    price: 899,
    compareAtPrice: 1599,
    stockCount: 88,
    rating: 4.7,
    reviewsCount: 56,
    description: 'Textured honeycomb pique cotton knit with reinforced rib collar, mother-of-pearl style 2-button placket, and subtle split side vents for flexible movement.',
    fabric: '230–250 GSM 100% Combed Pique Honeycomb Cotton',
    colors: [
      { name: 'Navy Blue', hex: '#0f2027' },
      { name: 'Wine Plum', hex: '#4a154b' },
      { name: 'Charcoal Slate', hex: '#374151' },
      { name: 'Snow White', hex: '#f8fafc' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/polo-tshirt-1.jpg',
      '/images/products/polo-tshirt-2.jpg',
      '/images/products/polo-tshirt-3.jpg'
    ],
    featured: true,
    sku: 'SLT-PL-01',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 764 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 629 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 539 }
    ],
    specifications: {
      gsm: '240 GSM Honeycomb Pique',
      composition: '100% Long Staple Combed Cotton',
      fit: 'Tailored Smart Fit',
      weave: 'Honey-Comb Knit',
      washCare: 'Cold wash with like colors, reshape collar while damp.'
    }
  },

  // 3. HOODIES
  {
    id: 'oversized-hoodies',
    slug: 'oversized-hoodies',
    name: 'Heavy Fleece Oversized Pullover Hoodie',
    category: 'HOODIES',
    subcategory: 'Heavy Winterwear',
    season: 'Winter',
    badge: 'HEAVYWEIGHT',
    price: 1499,
    compareAtPrice: 2499,
    stockCount: 95,
    rating: 5.0,
    reviewsCount: 148,
    description: 'Ultra-heavy 380 GSM brushed fleece with double-lined structured hood, seamless kangaroo pouch, matching heavy-drawstrings, and snug spandex-blend cuffs.',
    fabric: '380 GSM 100% Cotton Faced Heavy Brushed Fleece',
    colors: [
      { name: 'Jet Black', hex: '#0a0d14' },
      { name: 'Sage Olive', hex: '#52614e' },
      { name: 'Dusty Lavender', hex: '#877c9c' },
      { name: 'Heather Gray', hex: '#94a3b8' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/oversized-hoodies-1.jpg',
      '/images/products/oversized-hoodies-2.jpg'
    ],
    featured: true,
    sku: 'SLT-HD-01',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1274 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 1049 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 899 }
    ],
    specifications: {
      gsm: '380 GSM Heavy French Terry / Brushed Fleece',
      composition: '80% Combed Cotton, 20% Polyester fleece back',
      fit: 'Oversized Boxy Dropped Shoulder',
      weave: '3-Thread Fleece Knit',
      washCare: 'Cold gentle cycle, inside-out, tumble dry low heat.'
    }
  },
  {
    id: 'hoodies-regular-fit',
    slug: 'hoodies-regular-fit',
    name: 'Signature Everyday Regular Fit Hoodie',
    category: 'HOODIES',
    subcategory: 'Essential Streetwear',
    season: 'Winter',
    badge: 'BESTSELLER',
    price: 1299,
    compareAtPrice: 2199,
    stockCount: 130,
    rating: 4.8,
    reviewsCount: 92,
    description: 'Clean architectural silhouette with high-density fleece interior, anti-pill exterior finish, and custom metal aglets. The staple hoodie for private label collections.',
    fabric: '320 GSM 100% Cotton Faced Cotton-Poly Brushed Fleece',
    colors: [
      { name: 'Charcoal Black', hex: '#1a1f2c' },
      { name: 'Forest Green', hex: '#1e3a2f' },
      { name: 'Navy Midnight', hex: '#0a192f' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/hoodies-regular-fit-1.jpg',
      '/images/products/hoodies-regular-fit-2.jpg',
      '/images/products/hoodies-regular-fit-3.jpg'
    ],
    featured: false,
    sku: 'SLT-HD-02',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1104 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 909 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 779 }
    ],
    specifications: {
      gsm: '320 GSM Brushed Fleece',
      composition: '85% Cotton, 15% Poly',
      fit: 'Classic Athletic Fit',
      weave: 'Compact Double-Faced Terry',
      washCare: 'Machine wash cold with mild detergent.'
    }
  },
  {
    id: 'polar-fleece-hoodies',
    slug: 'polar-fleece-hoodies',
    name: 'Thermal Polar Fleece Tech Hoodie',
    category: 'HOODIES',
    subcategory: 'Outdoor Active',
    season: 'Winter',
    badge: 'NEW DROP',
    price: 1399,
    compareAtPrice: 2399,
    stockCount: 65,
    rating: 4.9,
    reviewsCount: 38,
    description: 'Ultra-insulating anti-pilling micro polar fleece engineered for extreme thermal retention, lightweight breathability, and quick drying during winter mobility.',
    fabric: '280 GSM Double-Sided Anti-Pill Polar Fleece',
    colors: [
      { name: 'Steel Teal', hex: '#164e63' },
      { name: 'Cobalt Blue', hex: '#1d4ed8' },
      { name: 'Graphite Stone', hex: '#334155' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/polar-fleece-hoodies-1.jpg',
      '/images/products/polar-fleece-hoodies-2.jpg',
      '/images/products/polar-fleece-hoodies-3.jpg'
    ],
    featured: false,
    sku: 'SLT-HD-03',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1189 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 979 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 839 }
    ],
    specifications: {
      gsm: '280 GSM Micro Polar Fleece',
      composition: '100% Hydrophobic Performance Poly',
      fit: 'Articulated Athletic Fit',
      weave: 'Micro-Looped Thermal Knit',
      washCare: 'Machine wash cold on gentle, hang dry.'
    }
  },
  {
    id: 'sherpa-fleece-hoodies',
    slug: 'sherpa-fleece-hoodies',
    name: 'Luxury Sherpa Lambswool Bonded Hoodie',
    category: 'HOODIES',
    subcategory: 'Sub-Zero Luxury',
    season: 'Winter',
    badge: 'LIMITED',
    price: 1799,
    compareAtPrice: 2999,
    stockCount: 48,
    rating: 5.0,
    reviewsCount: 62,
    description: 'High-loft bonded teddy sherpa with deep thermal fleece lining. Provides superior warmth against sub-zero conditions with premium heavy metal zipper detailing.',
    fabric: '400+ GSM Bonded Faux Sherpa Fleece with Suede Finish Trim',
    colors: [
      { name: 'Chalk Cream', hex: '#fef3c7' },
      { name: 'Caramel Camel', hex: '#b45309' },
      { name: 'Midnight Charcoal', hex: '#1e293b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/sherpa-fleece-hoodies-1.jpg',
      '/images/products/sherpa-fleece-hoodies-2.jpg'
    ],
    featured: true,
    sku: 'SLT-HD-04',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1529 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 1259 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 1079 }
    ],
    specifications: {
      gsm: '420 GSM Bonded High-Loft Sherpa',
      composition: '100% Poly Faux Shearling with Cotton Twill Accents',
      fit: 'Boxy Heavyweight Winter Fit',
      weave: 'Bonded Double-Sided Sherpa',
      washCare: 'Professional dry clean or cold delicate cycle.'
    }
  },

  // 4. JACKETS
  {
    id: 'puffer-jackets',
    slug: 'puffer-jackets',
    name: 'Waterproof Thermal Down-Alternative Puffer',
    category: 'JACKETS',
    subcategory: 'Technical Outerwear',
    season: 'Winter',
    badge: 'BESTSELLER',
    price: 1999,
    compareAtPrice: 3499,
    stockCount: 72,
    rating: 4.9,
    reviewsCount: 110,
    description: 'Ripstop matte taslan shell with waterproof DWR coating, 250 GSM micro-poly blowdown insulation, storm flap YKK zippers, and interior stash pockets.',
    fabric: 'Waterproof Matte Micro-Taslan Nylon Shell with Down-Feel Synthetic Fill',
    colors: [
      { name: 'Obsidian Black', hex: '#0f172a' },
      { name: 'Arctic Silver', hex: '#cbd5e1' },
      { name: 'Matte Olive', hex: '#3f4e3c' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/puffer-jackets-1.jpg',
      '/images/products/puffer-jackets-2.jpg',
      '/images/products/puffer-jackets-3.jpg'
    ],
    featured: true,
    sku: 'SLT-JK-01',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1699 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 1399 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 1199 }
    ],
    specifications: {
      gsm: '250 GSM Baffle Fill / 110 GSM Shell',
      composition: '100% Micro-Ripstop Nylon Shell, Polyfill Core',
      fit: 'Relaxed Technical Silhouette',
      weave: 'Micro-Ripstop 70D',
      washCare: 'Wipe clean or gentle machine wash cold, air dry.'
    }
  },
  {
    id: 'varsity-jackets',
    slug: 'varsity-jackets',
    name: 'Heritage Wool Blend Varsity Bomber Jacket',
    category: 'JACKETS',
    subcategory: 'Vintage Streetwear',
    season: 'Winter',
    badge: 'HOT SELLER',
    price: 1899,
    compareAtPrice: 3199,
    stockCount: 54,
    rating: 4.8,
    reviewsCount: 76,
    description: 'Classic heavy melton wool-blend body with vegan leather contrast sleeves, custom striped yarn-dyed ribbing, embossed metal snap buttons, and quilted diamond lining.',
    fabric: 'Heavy Melton Wool Blend Body with Matte PU Vegan Leather Sleeves',
    colors: [
      { name: 'Black & Bone White', hex: '#111827' },
      { name: 'Dark Spruce & Chalk', hex: '#143828' },
      { name: 'Navy & Cream', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/varsity-jackets-1.jpg',
      '/images/products/varsity-jackets-2.jpg'
    ],
    featured: true,
    sku: 'SLT-JK-02',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1614 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 1329 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 1139 }
    ],
    specifications: {
      gsm: '450 GSM Melton Wool Body',
      composition: '60% Wool, 40% Poly Body / Premium PU Sleeves',
      fit: 'Retro Boxy Bomber Cut',
      weave: 'Felted Wool Weave with Diamond Quilt Inside',
      washCare: 'Specialist Dry Clean Only.'
    }
  },
  {
    id: 'denim-jackets',
    slug: 'denim-jackets',
    name: 'Washed Selvedge Trucker Denim Jacket',
    category: 'JACKETS',
    subcategory: 'Timeless Heavy Denim',
    season: 'All Season',
    badge: 'ORGANIC',
    price: 1699,
    compareAtPrice: 2899,
    stockCount: 68,
    rating: 4.9,
    reviewsCount: 88,
    description: '13.5 oz heavy ring-spun raw cotton denim featuring authentic stonewash and tinting treatment, dual chest pockets, custom branded antique brass hardware, and welt pockets.',
    fabric: '13.5 oz 100% Rigid Ring-Spun Cotton Denim',
    colors: [
      { name: 'Vintage Stonewash', hex: '#3b82f6' },
      { name: 'Washed Black', hex: '#374151' },
      { name: 'Raw Indigo', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/denim-jackets-1.jpg',
      '/images/products/denim-jackets-2.jpg',
      '/images/products/denim-jackets-3.jpg',
      '/images/products/denim-jackets-4.jpg'
    ],
    featured: false,
    sku: 'SLT-JK-03',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1444 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 1189 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 1019 }
    ],
    specifications: {
      gsm: '13.5 oz / 460 GSM Heavy Rigid Denim',
      composition: '100% Cotton Ring Spun Twill',
      fit: 'Standard Western Trucker Fit',
      weave: '3x1 Right Hand Twill',
      washCare: 'Wash inside-out cold, hang dry to preserve indigo tint.'
    }
  },
  {
    id: 'polar-fleece-jackets',
    slug: 'polar-fleece-jackets',
    name: 'Full-Zip Technical Polar Fleece Jacket',
    category: 'JACKETS',
    subcategory: 'Adventure Tech',
    season: 'Winter',
    price: 1299,
    compareAtPrice: 2199,
    stockCount: 85,
    rating: 4.7,
    reviewsCount: 42,
    description: 'Full-zip stand collar jacket with nylon contrast chest pocket, dual zippered hand warmers, elastic storm binding on cuffs, and lightweight breathability.',
    fabric: '280 GSM Anti-Pill Micro-Fleece with Taslan Accents',
    colors: [
      { name: 'Olive Green & Black', hex: '#365314' },
      { name: 'Charcoal Black', hex: '#1f2937' },
      { name: 'Deep Royal', hex: '#1e40af' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/polar-fleece-jackets-1.jpg',
      '/images/products/polar-fleece-jackets-2.jpg',
      '/images/products/polar-fleece-jackets-3.jpg'
    ],
    featured: false,
    sku: 'SLT-JK-04',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1104 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 909 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 779 }
    ],
    specifications: {
      gsm: '280 GSM Polar Fleece',
      composition: '100% Recycled Poly Microfleece',
      fit: 'Layering Athletic Cut',
      weave: 'Thermal Knit Looped Face',
      washCare: 'Quick wash cold, air dry quickly.'
    }
  },

  // 5. TRACKSUITS
  {
    id: 'omniheat-tracksuits',
    slug: 'omniheat-tracksuits',
    name: 'OmniHeat Thermal Reflective Tracksuit Set',
    category: 'TRACKSUITS',
    subcategory: 'Performance 2-Piece Set',
    season: 'Winter',
    badge: 'NEW DROP',
    price: 1899,
    compareAtPrice: 3299,
    stockCount: 45,
    rating: 5.0,
    reviewsCount: 79,
    description: 'Advanced 2-piece set featuring metallic thermal reflective dot lining, moisture-wicking bonded poly shell, zippered ankles, and raglan active sleeves.',
    fabric: 'OmniHeat Thermal Reflective Lining with High-Stretch Poly Shell',
    colors: [
      { name: 'Jet Black', hex: '#0f172a' },
      { name: 'Gunmetal Gray', hex: '#475569' },
      { name: 'Navy Cobalt', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/omniheat-tracksuits-1.jpg',
      '/images/products/omniheat-tracksuits-2.jpg',
      '/images/products/omniheat-tracksuits-3.jpg'
    ],
    featured: true,
    sku: 'SLT-TSU-01',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1614 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 1329 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 1139 }
    ],
    specifications: {
      gsm: '300 GSM Bonded Thermal Set',
      composition: '92% Polyester, 8% Spandex with Aluminum Heat Matrix',
      fit: 'Engineered Tapered Athletic Fit',
      weave: 'Interlock 4-Way Stretch',
      washCare: 'Gentle cycle, cold water, line dry only.'
    }
  },
  {
    id: 'fleece-tracksuits',
    slug: 'fleece-tracksuits',
    name: 'Cozy Heavy Fleece 2-Piece Loungewear Tracksuit',
    category: 'TRACKSUITS',
    subcategory: 'Street Loungewear',
    season: 'Winter',
    badge: 'BESTSELLER',
    price: 1699,
    compareAtPrice: 2899,
    stockCount: 80,
    rating: 4.8,
    reviewsCount: 64,
    description: 'Coordinated crew/hoodie and jogger combo crafted from brushed 320 GSM terry fleece. Deep front pockets, elastic waistband with chunky cotton cord.',
    fabric: '320 GSM 100% Cotton Faced Cotton-Poly Fleece Set',
    colors: [
      { name: 'Heather Gray', hex: '#94a3b8' },
      { name: 'Deep Black', hex: '#18181b' },
      { name: 'Muted Olive', hex: '#3f4e3c' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/fleece-tracksuits-1.jpg',
      '/images/products/fleece-tracksuits-2.jpg'
    ],
    featured: false,
    sku: 'SLT-TSU-02',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1444 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 1189 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 1019 }
    ],
    specifications: {
      gsm: '320 GSM Fleece Combo',
      composition: '80% Combed Cotton, 20% Polyester',
      fit: 'Relaxed Street Fit',
      weave: 'Diagonal Looped Fleece',
      washCare: 'Machine wash 30°C with similar dark colors.'
    }
  },

  // 6. TRACKPANTS
  {
    id: 'balloon-fit-trackpants',
    slug: 'balloon-fit-trackpants',
    name: 'Architectural Balloon Fit Wide Trackpants',
    category: 'TRACKPANTS',
    subcategory: 'High Streetwear',
    season: 'All Season',
    badge: 'NEW DROP',
    price: 999,
    compareAtPrice: 1799,
    stockCount: 110,
    rating: 4.9,
    reviewsCount: 52,
    description: 'Exaggerated voluminous curved thigh with dramatic darting, tapered ankle cuffs, extra-thick waistband, and deep slant pockets for high-fashion silhouette.',
    fabric: '280 GSM Cotton-Poly Interlock Fleece with Anti-Knee Bagging',
    colors: [
      { name: 'Pitch Black', hex: '#111827' },
      { name: 'Dover Gray', hex: '#64748b' },
      { name: 'Washed Olive', hex: '#4d5d4b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/balloon-fit-trackpants-1.jpg',
      '/images/products/balloon-fit-trackpants-2.jpg'
    ],
    featured: true,
    sku: 'SLT-TP-01',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 849 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 699 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 599 }
    ],
    specifications: {
      gsm: '280 GSM Structured Interlock',
      composition: '75% Cotton, 25% Polyester',
      fit: 'Oversized Balloon Curved Silhouette',
      weave: 'Heavy Density French Terry',
      washCare: 'Cold wash, inside-out, tumble dry gentle.'
    }
  },
  {
    id: 'fleece-trackpants-jogger-fit',
    slug: 'fleece-trackpants-jogger-fit',
    name: 'Tapered Heavy Fleece Cargo Joggers',
    category: 'TRACKPANTS',
    subcategory: 'Utility Active',
    season: 'Winter',
    price: 899,
    compareAtPrice: 1599,
    stockCount: 135,
    rating: 4.8,
    reviewsCount: 95,
    description: 'Slim-tapered ankle fit with ergonomic 3D knee articulation, heavy ribbed cuffs, concealed zipper pocket, and durable anti-shrink fabric.',
    fabric: '300 GSM Brushed Fleece with Lycra Ribbing',
    colors: [
      { name: 'Obsidian Black', hex: '#0f172a' },
      { name: 'Charcoal Melange', hex: '#374151' },
      { name: 'Sand Khaki', hex: '#a8a29e' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/fleece-trackpants-jogger-fit-1.jpg',
      '/images/products/fleece-trackpants-jogger-fit-2.jpg',
      '/images/products/fleece-trackpants-jogger-fit-3.jpg'
    ],
    featured: false,
    sku: 'SLT-TP-02',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 764 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 629 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 539 }
    ],
    specifications: {
      gsm: '300 GSM Brushed Soft Cotton Fleece',
      composition: '80% Cotton, 20% Polyester',
      fit: 'Slim Tapered Jogger',
      weave: 'Heavy Interlock Knit',
      washCare: 'Cold wash, do not bleach.'
    }
  },
  {
    id: 'trackpants-regular-fit',
    slug: 'trackpants-regular-fit',
    name: 'Straight Leg Everyday Essential Trackpants',
    category: 'TRACKPANTS',
    subcategory: 'Gym & Lifestyle',
    season: 'All Season',
    price: 799,
    compareAtPrice: 1399,
    stockCount: 160,
    rating: 4.6,
    reviewsCount: 71,
    description: 'Classic straight-leg cut with open hem, clean flat-front drawstring, deep side pockets, and durable double-stitched seams designed for everyday comfort.',
    fabric: '260 GSM Cotton Single Jersey Interlock',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1e3a8a' },
      { name: 'Heather Gray', hex: '#9ca3af' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: [
      '/images/products/trackpants-regular-fit-1.jpg',
      '/images/products/trackpants-regular-fit-2.jpg',
      '/images/products/trackpants-regular-fit-3.jpg'
    ],
    featured: false,
    sku: 'SLT-TP-03',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 679 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 559 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 479 }
    ],
    specifications: {
      gsm: '260 GSM Cotton Blend',
      composition: '70% Cotton, 30% Poly',
      fit: 'Clean Straight Open Hem',
      weave: 'Smooth Interlock Knit',
      washCare: 'Machine wash warm, tumble dry normal.'
    }
  },

  // 7. SWEATERS
  {
    id: 'sweaters',
    slug: 'sweaters',
    name: 'Heavy Jacquard Checkerboard Knit Sweater',
    category: 'SWEATERS',
    subcategory: 'Luxury Knits',
    season: 'Winter',
    badge: 'HOT SELLER',
    price: 1599,
    compareAtPrice: 2799,
    stockCount: 55,
    rating: 4.9,
    reviewsCount: 83,
    description: '7-gauge dense computerized jacquard knit featuring bold geometric checkerboard pattern, chunky 2x2 rib crewneck, reinforced drop-shoulders, and no-itch premium yarn.',
    fabric: '7-Gauge Heavy Premium Non-Itch Acrylic-Wool Blend',
    colors: [
      { name: 'Forest Green & Chalk', hex: '#1e392a' },
      { name: 'Pitch Black & Gray', hex: '#18181b' },
      { name: 'Cobalt & White', hex: '#1d4ed8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/sweaters-1.jpg',
      '/images/products/sweaters-2.jpg'
    ],
    featured: true,
    sku: 'SLT-SW-01',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 1359 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 1119 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 959 }
    ],
    specifications: {
      gsm: '480 GSM Heavy Flat Knit',
      composition: '70% Soft Non-Itch Acrylic, 30% Merino Wool Blend',
      fit: 'Relaxed Drop-Shoulder Chunky Fit',
      weave: '7-Gauge Multi-Color Jacquard',
      washCare: 'Hand wash cold or dry clean, dry flat in shade.'
    }
  },

  // 8. BEANIES
  {
    id: 'beanies',
    slug: 'beanies',
    name: 'Ribbed Fisherman Cuffed Beanie',
    category: 'BEANIES',
    subcategory: 'Headwear Accessories',
    season: 'Winter',
    badge: 'BESTSELLER',
    price: 399,
    compareAtPrice: 799,
    stockCount: 280,
    rating: 4.9,
    reviewsCount: 164,
    description: 'Heavy 100% fine acrylic 4-panel ribbed knit beanie with foldable deep cuff, snug stretch recovery, and custom woven label application surface.',
    fabric: '100% Fine Acrylic 4-Dart Ribbed Knit',
    colors: [
      { name: 'Onyx Black', hex: '#09090b' },
      { name: 'Dusty Pink', hex: '#db2777' },
      { name: 'Desert Khaki', hex: '#d97706' },
      { name: 'Cobalt Blue', hex: '#2563eb' }
    ],
    sizes: ['One Size Fits All'],
    images: [
      '/images/products/beanies-1.jpg',
      '/images/products/beanies-2.jpg',
      '/images/products/beanies-3.jpg',
      '/images/products/beanies-4.jpg'
    ],
    featured: true,
    sku: 'SLT-BN-01',
    bulkTiers: [
      { minQty: 5, discountPercentage: 15, pricePerUnit: 339 },
      { minQty: 20, discountPercentage: 30, pricePerUnit: 279 },
      { minQty: 50, discountPercentage: 40, pricePerUnit: 239 }
    ],
    specifications: {
      gsm: '110g Dense Ribbed Knit',
      composition: '100% High-Grade Anti-Pill Acrylic',
      fit: 'Adjustable Foldover Fisherman Fit',
      weave: '4-Panel Ribbed Architecture',
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
