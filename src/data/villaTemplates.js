// Premade villa templates that can be customized
export const VILLA_TEMPLATES = [
  {
    id: 'modern_luxury',
    name: 'Modern Luxury Villa',
    description: 'A contemporary 3-floor villa with pool, home theater, and spacious living areas',
    image: '🏛️',
    floors: 3,
    totalArea: 450,
    style: 'Modern',
    features: {
      pool: true,
      garage: true,
      gardenArea: 200
    },
    rooms: {
      floor1: [
        { type: 'ENTRANCE_HALL', position: { x: 0, y: 0 }, size: { width: 10, height: 8 } },
        { type: 'LIVING_ROOM', position: { x: 10, y: 0 }, size: { width: 22, height: 20 } },
        { type: 'DINING_ROOM', position: { x: 32, y: 0 }, size: { width: 16, height: 14 } },
        { type: 'KITCHEN', position: { x: 32, y: 14 }, size: { width: 16, height: 14 } },
        { type: 'BATHROOM', position: { x: 0, y: 8 }, size: { width: 8, height: 8 } },
        { type: 'STORAGE', position: { x: 0, y: 16 }, size: { width: 8, height: 6 } },
        { type: 'GARAGE', position: { x: 48, y: 0 }, size: { width: 20, height: 20 } }
      ],
      floor2: [
        { type: 'MASTER_BEDROOM', position: { x: 0, y: 0 }, size: { width: 18, height: 16 } },
        { type: 'MASTER_BATHROOM', position: { x: 18, y: 0 }, size: { width: 12, height: 10 } },
        { type: 'WALK_IN_CLOSET', position: { x: 18, y: 10 }, size: { width: 10, height: 8 } },
        { type: 'BEDROOM', position: { x: 0, y: 16 }, size: { width: 14, height: 12 } },
        { type: 'BEDROOM', position: { x: 14, y: 16 }, size: { width: 14, height: 12 } },
        { type: 'BATHROOM', position: { x: 28, y: 16 }, size: { width: 10, height: 10 } },
        { type: 'LAUNDRY', position: { x: 30, y: 0 }, size: { width: 8, height: 8 } }
      ],
      floor3: [
        { type: 'HOME_THEATER', position: { x: 0, y: 0 }, size: { width: 18, height: 16 } },
        { type: 'GYM', position: { x: 18, y: 0 }, size: { width: 16, height: 14 } },
        { type: 'HOME_OFFICE', position: { x: 0, y: 16 }, size: { width: 12, height: 12 } },
        { type: 'TERRACE', position: { x: 12, y: 16 }, size: { width: 22, height: 12 } }
      ]
    },
    outdoor: [
      { type: 'POOL_AREA', position: { x: 0, y: 30 }, size: { width: 30, height: 15 } }
    ]
  },
  {
    id: 'family_cozy',
    name: 'Cozy Family Home',
    description: 'A warm 2-floor family villa with 4 bedrooms and spacious living areas',
    image: '🏡',
    floors: 2,
    totalArea: 280,
    style: 'Traditional',
    features: {
      pool: false,
      garage: true,
      gardenArea: 150
    },
    rooms: {
      floor1: [
        { type: 'ENTRANCE_HALL', position: { x: 0, y: 0 }, size: { width: 8, height: 8 } },
        { type: 'LIVING_ROOM', position: { x: 8, y: 0 }, size: { width: 20, height: 18 } },
        { type: 'DINING_ROOM', position: { x: 28, y: 0 }, size: { width: 14, height: 12 } },
        { type: 'KITCHEN', position: { x: 28, y: 12 }, size: { width: 14, height: 12 } },
        { type: 'BATHROOM', position: { x: 0, y: 8 }, size: { width: 8, height: 8 } },
        { type: 'STORAGE', position: { x: 0, y: 16 }, size: { width: 8, height: 6 } },
        { type: 'GARAGE', position: { x: 42, y: 0 }, size: { width: 20, height: 18 } }
      ],
      floor2: [
        { type: 'MASTER_BEDROOM', position: { x: 0, y: 0 }, size: { width: 16, height: 14 } },
        { type: 'MASTER_BATHROOM', position: { x: 16, y: 0 }, size: { width: 10, height: 10 } },
        { type: 'BEDROOM', position: { x: 0, y: 14 }, size: { width: 12, height: 12 } },
        { type: 'BEDROOM', position: { x: 12, y: 14 }, size: { width: 12, height: 12 } },
        { type: 'BEDROOM', position: { x: 24, y: 14 }, size: { width: 12, height: 12 } },
        { type: 'BATHROOM', position: { x: 26, y: 0 }, size: { width: 10, height: 10 } },
        { type: 'LAUNDRY', position: { x: 36, y: 0 }, size: { width: 8, height: 8 } }
      ]
    }
  },
  {
    id: 'minimalist_modern',
    name: 'Minimalist Modern',
    description: 'A sleek 2-floor minimalist design with open spaces and clean lines',
    image: '🏢',
    floors: 2,
    totalArea: 320,
    style: 'Minimalist',
    features: {
      pool: true,
      garage: true,
      gardenArea: 100
    },
    rooms: {
      floor1: [
        { type: 'ENTRANCE_HALL', position: { x: 0, y: 0 }, size: { width: 10, height: 6 } },
        { type: 'LIVING_ROOM', position: { x: 10, y: 0 }, size: { width: 24, height: 20 } },
        { type: 'KITCHEN', position: { x: 34, y: 0 }, size: { width: 16, height: 14 } },
        { type: 'DINING_ROOM', position: { x: 34, y: 14 }, size: { width: 16, height: 12 } },
        { type: 'BATHROOM', position: { x: 0, y: 6 }, size: { width: 8, height: 8 } },
        { type: 'HOME_OFFICE', position: { x: 0, y: 14 }, size: { width: 12, height: 10 } },
        { type: 'GARAGE', position: { x: 50, y: 0 }, size: { width: 20, height: 20 } }
      ],
      floor2: [
        { type: 'MASTER_BEDROOM', position: { x: 0, y: 0 }, size: { width: 18, height: 16 } },
        { type: 'MASTER_BATHROOM', position: { x: 18, y: 0 }, size: { width: 12, height: 12 } },
        { type: 'WALK_IN_CLOSET', position: { x: 18, y: 12 }, size: { width: 10, height: 8 } },
        { type: 'BEDROOM', position: { x: 0, y: 16 }, size: { width: 14, height: 12 } },
        { type: 'BEDROOM', position: { x: 14, y: 16 }, size: { width: 14, height: 12 } },
        { type: 'BATHROOM', position: { x: 28, y: 16 }, size: { width: 10, height: 10 } },
        { type: 'BALCONY', position: { x: 30, y: 0 }, size: { width: 14, height: 6 } }
      ]
    },
    outdoor: [
      { type: 'POOL_AREA', position: { x: 0, y: 28 }, size: { width: 28, height: 12 } }
    ]
  },
  {
    id: 'mediterranean_villa',
    name: 'Mediterranean Paradise',
    description: 'A 2-floor Mediterranean style villa with pool, terrace, and wine cellar',
    image: '🌴',
    floors: 2,
    totalArea: 380,
    style: 'Mediterranean',
    features: {
      pool: true,
      garage: true,
      gardenArea: 250
    },
    rooms: {
      floor1: [
        { type: 'ENTRANCE_HALL', position: { x: 0, y: 0 }, size: { width: 12, height: 10 } },
        { type: 'LIVING_ROOM', position: { x: 12, y: 0 }, size: { width: 22, height: 20 } },
        { type: 'DINING_ROOM', position: { x: 34, y: 0 }, size: { width: 16, height: 14 } },
        { type: 'KITCHEN', position: { x: 34, y: 14 }, size: { width: 16, height: 14 } },
        { type: 'WINE_CELLAR', position: { x: 0, y: 10 }, size: { width: 10, height: 8 } },
        { type: 'BATHROOM', position: { x: 0, y: 18 }, size: { width: 8, height: 8 } },
        { type: 'GARAGE', position: { x: 50, y: 0 }, size: { width: 20, height: 20 } }
      ],
      floor2: [
        { type: 'MASTER_BEDROOM', position: { x: 0, y: 0 }, size: { width: 18, height: 16 } },
        { type: 'MASTER_BATHROOM', position: { x: 18, y: 0 }, size: { width: 12, height: 10 } },
        { type: 'BEDROOM', position: { x: 0, y: 16 }, size: { width: 14, height: 12 } },
        { type: 'BEDROOM', position: { x: 14, y: 16 }, size: { width: 14, height: 12 } },
        { type: 'BATHROOM', position: { x: 28, y: 16 }, size: { width: 10, height: 10 } },
        { type: 'TERRACE', position: { x: 30, y: 0 }, size: { width: 20, height: 12 } },
        { type: 'LAUNDRY', position: { x: 18, y: 10 }, size: { width: 8, height: 8 } }
      ]
    },
    outdoor: [
      { type: 'POOL_AREA', position: { x: 0, y: 30 }, size: { width: 32, height: 16 } }
    ]
  },
  {
    id: 'compact_starter',
    name: 'Compact Starter Villa',
    description: 'An efficient 1-floor villa perfect for young families or couples',
    image: '🏠',
    floors: 1,
    totalArea: 160,
    style: 'Contemporary',
    features: {
      pool: false,
      garage: true,
      gardenArea: 80
    },
    rooms: {
      floor1: [
        { type: 'ENTRANCE_HALL', position: { x: 0, y: 0 }, size: { width: 8, height: 6 } },
        { type: 'LIVING_ROOM', position: { x: 8, y: 0 }, size: { width: 18, height: 16 } },
        { type: 'KITCHEN', position: { x: 26, y: 0 }, size: { width: 12, height: 10 } },
        { type: 'DINING_ROOM', position: { x: 26, y: 10 }, size: { width: 12, height: 10 } },
        { type: 'MASTER_BEDROOM', position: { x: 0, y: 6 }, size: { width: 14, height: 14 } },
        { type: 'BEDROOM', position: { x: 14, y: 16 }, size: { width: 12, height: 12 } },
        { type: 'BATHROOM', position: { x: 26, y: 20 }, size: { width: 8, height: 8 } },
        { type: 'STORAGE', position: { x: 0, y: 20 }, size: { width: 6, height: 6 } },
        { type: 'GARAGE', position: { x: 38, y: 0 }, size: { width: 18, height: 18 } }
      ]
    }
  },
  {
    id: 'executive_estate',
    name: 'Executive Estate',
    description: 'A luxurious 4-floor estate with all amenities including home theater, gym, and library',
    image: '🏰',
    floors: 4,
    totalArea: 620,
    style: 'Luxury',
    features: {
      pool: true,
      garage: true,
      gardenArea: 400
    },
    rooms: {
      floor1: [
        { type: 'ENTRANCE_HALL', position: { x: 0, y: 0 }, size: { width: 14, height: 12 } },
        { type: 'LIVING_ROOM', position: { x: 14, y: 0 }, size: { width: 24, height: 22 } },
        { type: 'DINING_ROOM', position: { x: 38, y: 0 }, size: { width: 18, height: 16 } },
        { type: 'KITCHEN', position: { x: 38, y: 16 }, size: { width: 18, height: 16 } },
        { type: 'WINE_CELLAR', position: { x: 0, y: 12 }, size: { width: 10, height: 10 } },
        { type: 'BATHROOM', position: { x: 0, y: 22 }, size: { width: 10, height: 8 } },
        { type: 'HOME_OFFICE', position: { x: 10, y: 22 }, size: { width: 14, height: 12 } },
        { type: 'GARAGE', position: { x: 56, y: 0 }, size: { width: 24, height: 22 } }
      ],
      floor2: [
        { type: 'MASTER_BEDROOM', position: { x: 0, y: 0 }, size: { width: 20, height: 18 } },
        { type: 'MASTER_BATHROOM', position: { x: 20, y: 0 }, size: { width: 14, height: 12 } },
        { type: 'WALK_IN_CLOSET', position: { x: 20, y: 12 }, size: { width: 12, height: 10 } },
        { type: 'BEDROOM', position: { x: 0, y: 18 }, size: { width: 14, height: 12 } },
        { type: 'BEDROOM', position: { x: 14, y: 18 }, size: { width: 14, height: 12 } },
        { type: 'BEDROOM', position: { x: 28, y: 18 }, size: { width: 14, height: 12 } },
        { type: 'BATHROOM', position: { x: 32, y: 0 }, size: { width: 10, height: 10 } },
        { type: 'BATHROOM', position: { x: 42, y: 18 }, size: { width: 10, height: 10 } },
        { type: 'LAUNDRY', position: { x: 34, y: 8 }, size: { width: 10, height: 8 } }
      ],
      floor3: [
        { type: 'HOME_THEATER', position: { x: 0, y: 0 }, size: { width: 20, height: 16 } },
        { type: 'GYM', position: { x: 20, y: 0 }, size: { width: 18, height: 14 } },
        { type: 'LIBRARY', position: { x: 0, y: 16 }, size: { width: 16, height: 14 } },
        { type: 'BATHROOM', position: { x: 16, y: 16 }, size: { width: 8, height: 8 } },
        { type: 'BALCONY', position: { x: 38, y: 0 }, size: { width: 16, height: 8 } }
      ],
      floor4: [
        { type: 'TERRACE', position: { x: 0, y: 0 }, size: { width: 30, height: 20 } },
        { type: 'OUTDOOR', position: { x: 30, y: 0 }, size: { width: 12, height: 12 } }
      ]
    },
    outdoor: [
      { type: 'POOL_AREA', position: { x: 0, y: 40 }, size: { width: 36, height: 20 } }
    ]
  }
];

export default VILLA_TEMPLATES;
