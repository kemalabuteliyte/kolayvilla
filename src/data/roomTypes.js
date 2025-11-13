// Comprehensive Room Types with default properties and customizable features
export const ROOM_TYPES = {
  // Living Spaces
  LIVING_ROOM: {
    id: 'living_room',
    name: 'Living Room',
    icon: '🛋️',
    color: '#FFB84D',
    defaultSize: { width: 20, height: 20 },
    minSize: { width: 12, height: 12 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'flooring', 'windows_doors', 'special', 'security']
  },
  FAMILY_ROOM: {
    id: 'family_room',
    name: 'Family Room',
    icon: '👨‍👩‍👧‍👦',
    color: '#FFA07A',
    defaultSize: { width: 18, height: 16 },
    minSize: { width: 12, height: 12 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'flooring', 'windows_doors', 'entertainment']
  },
  DINING_ROOM: {
    id: 'dining_room',
    name: 'Dining Room',
    icon: '🍽️',
    color: '#96CEB4',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'flooring', 'windows_doors', 'special']
  },
  BREAKFAST_NOOK: {
    id: 'breakfast_nook',
    name: 'Breakfast Nook',
    icon: '☕',
    color: '#FFD93D',
    defaultSize: { width: 8, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'flooring', 'windows_doors']
  },
  SUNROOM: {
    id: 'sunroom',
    name: 'Sunroom',
    icon: '☀️',
    color: '#FFF4B8',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate', 'flooring', 'windows_doors', 'special']
  },

  // Bedrooms
  MASTER_BEDROOM: {
    id: 'master_bedroom',
    name: 'Master Bedroom',
    icon: '🛏️',
    color: '#6B8DD6',
    defaultSize: { width: 16, height: 16 },
    minSize: { width: 12, height: 12 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'storage', 'flooring', 'windows_doors', 'special', 'security']
  },
  BEDROOM: {
    id: 'bedroom',
    name: 'Guest Bedroom',
    icon: '🛏️',
    color: '#8AA4D6',
    defaultSize: { width: 12, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'flooring', 'windows_doors']
  },
  CHILDREN_ROOM: {
    id: 'children_room',
    name: "Children's Room",
    icon: '🧸',
    color: '#FFB6C1',
    defaultSize: { width: 12, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'storage', 'flooring', 'windows_doors', 'safety']
  },
  NURSERY: {
    id: 'nursery',
    name: 'Nursery',
    icon: '👶',
    color: '#E0BBE4',
    defaultSize: { width: 10, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate', 'storage', 'flooring', 'windows_doors', 'safety']
  },

  // Bathrooms
  MASTER_BATHROOM: {
    id: 'master_bathroom',
    name: 'Master Bathroom',
    icon: '🛁',
    color: '#45B7D1',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'plumbing', 'storage', 'accessibility', 'flooring', 'fixtures', 'special', 'wellness']
  },
  BATHROOM: {
    id: 'bathroom',
    name: 'Bathroom',
    icon: '🚿',
    color: '#4ECDC4',
    defaultSize: { width: 8, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'plumbing', 'storage', 'accessibility', 'flooring', 'fixtures']
  },
  POWDER_ROOM: {
    id: 'powder_room',
    name: 'Powder Room',
    icon: '🚻',
    color: '#89CFF0',
    defaultSize: { width: 6, height: 6 },
    minSize: { width: 4, height: 4 },
    features: ['electrical', 'lighting', 'plumbing', 'flooring', 'fixtures']
  },

  // Kitchen & Dining
  KITCHEN: {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍳',
    color: '#FF6B6B',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 8 },
    features: ['electrical', 'lighting', 'plumbing', 'storage', 'technology', 'accessibility', 'flooring', 'appliances', 'windows_doors']
  },
  BUTLER_PANTRY: {
    id: 'butler_pantry',
    name: 'Butler Pantry',
    icon: '🍷',
    color: '#D4A373',
    defaultSize: { width: 8, height: 6 },
    minSize: { width: 6, height: 4 },
    features: ['electrical', 'lighting', 'storage', 'flooring', 'appliances']
  },

  // Work & Study
  HOME_OFFICE: {
    id: 'home_office',
    name: 'Home Office',
    icon: '💼',
    color: '#FFEAA7',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'accessibility', 'flooring', 'windows_doors', 'security']
  },
  LIBRARY: {
    id: 'library',
    name: 'Library/Study',
    icon: '📚',
    color: '#FDCB6E',
    defaultSize: { width: 12, height: 12 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'accessibility', 'flooring', 'windows_doors', 'special']
  },
  CRAFT_ROOM: {
    id: 'craft_room',
    name: 'Craft Room',
    icon: '✂️',
    color: '#F8B500',
    defaultSize: { width: 10, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'storage', 'flooring', 'windows_doors']
  },
  ART_STUDIO: {
    id: 'art_studio',
    name: 'Art Studio',
    icon: '🎨',
    color: '#FF6F91',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'storage', 'flooring', 'windows_doors', 'special']
  },
  MUSIC_ROOM: {
    id: 'music_room',
    name: 'Music Room',
    icon: '🎵',
    color: '#9D84B7',
    defaultSize: { width: 12, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'flooring', 'acoustics', 'windows_doors']
  },

  // Entertainment
  HOME_THEATER: {
    id: 'home_theater',
    name: 'Home Theater',
    icon: '🎬',
    color: '#6C5CE7',
    defaultSize: { width: 16, height: 14 },
    minSize: { width: 12, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'flooring', 'acoustics', 'entertainment']
  },
  GAME_ROOM: {
    id: 'game_room',
    name: 'Game Room',
    icon: '🎮',
    color: '#00B894',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'flooring', 'entertainment']
  },
  BILLIARD_ROOM: {
    id: 'billiard_room',
    name: 'Billiard Room',
    icon: '🎱',
    color: '#2ECC71',
    defaultSize: { width: 16, height: 12 },
    minSize: { width: 12, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'storage', 'flooring']
  },
  BAR_LOUNGE: {
    id: 'bar_lounge',
    name: 'Bar/Lounge',
    icon: '🍸',
    color: '#E17055',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'plumbing', 'climate', 'storage', 'flooring', 'special', 'appliances']
  },

  // Wellness & Fitness
  GYM: {
    id: 'gym',
    name: 'Gym/Fitness Room',
    icon: '💪',
    color: '#FD79A8',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'flooring', 'special', 'wellness']
  },
  YOGA_ROOM: {
    id: 'yoga_room',
    name: 'Yoga/Meditation Room',
    icon: '🧘',
    color: '#A8E6CF',
    defaultSize: { width: 12, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'flooring', 'windows_doors', 'wellness']
  },
  SAUNA: {
    id: 'sauna',
    name: 'Sauna',
    icon: '🔥',
    color: '#D4A373',
    defaultSize: { width: 8, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'climate', 'flooring', 'wellness']
  },
  MASSAGE_ROOM: {
    id: 'massage_room',
    name: 'Massage Room',
    icon: '💆',
    color: '#C7CEEA',
    defaultSize: { width: 10, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate', 'flooring', 'wellness']
  },

  // Storage & Utility
  WALK_IN_CLOSET: {
    id: 'walk_in_closet',
    name: 'Walk-in Closet',
    icon: '👔',
    color: '#E84393',
    defaultSize: { width: 8, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'storage', 'accessibility', 'flooring', 'special']
  },
  DRESSING_ROOM: {
    id: 'dressing_room',
    name: 'Dressing Room',
    icon: '👗',
    color: '#FF7979',
    defaultSize: { width: 10, height: 8 },
    minSize: { width: 8, height: 6 },
    features: ['electrical', 'lighting', 'storage', 'flooring', 'special']
  },
  LAUNDRY: {
    id: 'laundry',
    name: 'Laundry Room',
    icon: '🧺',
    color: '#A29BFE',
    defaultSize: { width: 8, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'plumbing', 'storage', 'accessibility', 'flooring', 'appliances']
  },
  MUDROOM: {
    id: 'mudroom',
    name: 'Mudroom',
    icon: '🥾',
    color: '#8D6E63',
    defaultSize: { width: 8, height: 6 },
    minSize: { width: 6, height: 4 },
    features: ['electrical', 'lighting', 'storage', 'flooring']
  },
  STORAGE: {
    id: 'storage',
    name: 'Storage/Pantry',
    icon: '📦',
    color: '#DFE6E9',
    defaultSize: { width: 8, height: 6 },
    minSize: { width: 4, height: 4 },
    features: ['electrical', 'lighting', 'storage', 'accessibility', 'flooring']
  },
  UTILITY_CLOSET: {
    id: 'utility_closet',
    name: 'Utility Closet',
    icon: '🔧',
    color: '#95A5A6',
    defaultSize: { width: 4, height: 4 },
    minSize: { width: 3, height: 3 },
    features: ['electrical', 'lighting', 'storage']
  },

  // Entrance & Hallways
  ENTRANCE_HALL: {
    id: 'entrance_hall',
    name: 'Entrance Hall',
    icon: '🚪',
    color: '#B2BEC3',
    defaultSize: { width: 10, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'storage', 'accessibility', 'flooring', 'security']
  },
  FOYER: {
    id: 'foyer',
    name: 'Foyer',
    icon: '🏛️',
    color: '#636E72',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'flooring', 'special', 'security']
  },
  HALLWAY: {
    id: 'hallway',
    name: 'Hallway',
    icon: '🚶',
    color: '#B2BEC3',
    defaultSize: { width: 12, height: 4 },
    minSize: { width: 6, height: 3 },
    features: ['electrical', 'lighting', 'accessibility', 'flooring']
  },

  // Outdoor & Recreation
  GARAGE: {
    id: 'garage',
    name: 'Garage',
    icon: '🚗',
    color: '#74B9FF',
    defaultSize: { width: 20, height: 20 },
    minSize: { width: 16, height: 18 },
    features: ['electrical', 'lighting', 'storage', 'technology', 'accessibility', 'flooring', 'garage_specific', 'security']
  },
  WORKSHOP: {
    id: 'workshop',
    name: 'Workshop',
    icon: '🔨',
    color: '#FDCB6E',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'storage', 'flooring']
  },
  BALCONY: {
    id: 'balcony',
    name: 'Balcony',
    icon: '🌆',
    color: '#FAB1A0',
    defaultSize: { width: 12, height: 6 },
    minSize: { width: 6, height: 4 },
    features: ['electrical', 'lighting', 'outdoor', 'accessibility', 'flooring']
  },
  TERRACE: {
    id: 'terrace',
    name: 'Terrace',
    icon: '🌿',
    color: '#81ECEC',
    defaultSize: { width: 16, height: 12 },
    minSize: { width: 10, height: 8 },
    features: ['electrical', 'lighting', 'outdoor', 'accessibility', 'flooring', 'special']
  },
  PATIO: {
    id: 'patio',
    name: 'Patio',
    icon: '🪴',
    color: '#55EFC4',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 8 },
    features: ['electrical', 'lighting', 'outdoor', 'flooring']
  },
  POOL_AREA: {
    id: 'pool_area',
    name: 'Pool Area',
    icon: '🏊',
    color: '#00B894',
    defaultSize: { width: 24, height: 12 },
    minSize: { width: 16, height: 8 },
    features: ['electrical', 'lighting', 'plumbing', 'outdoor', 'accessibility', 'pool_specific', 'safety']
  },
  GARDEN_ROOM: {
    id: 'garden_room',
    name: 'Garden Room',
    icon: '🌺',
    color: '#A8E6CF',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate', 'windows_doors', 'flooring', 'special']
  },

  // Specialty Rooms
  WINE_CELLAR: {
    id: 'wine_cellar',
    name: 'Wine Cellar',
    icon: '🍷',
    color: '#E17055',
    defaultSize: { width: 10, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'climate', 'storage', 'flooring', 'special']
  },
  SAFE_ROOM: {
    id: 'safe_room',
    name: 'Safe Room',
    icon: '🔐',
    color: '#2D3436',
    defaultSize: { width: 8, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'security']
  },
  SERVER_ROOM: {
    id: 'server_room',
    name: 'Server Room',
    icon: '🖥️',
    color: '#0984E3',
    defaultSize: { width: 8, height: 6 },
    minSize: { width: 6, height: 4 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'security']
  },
  PET_ROOM: {
    id: 'pet_room',
    name: 'Pet Room',
    icon: '🐕',
    color: '#FFEAA7',
    defaultSize: { width: 8, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'climate', 'plumbing', 'storage', 'flooring']
  }
};

// Feature categories and their options - EXPANDED
export const FEATURE_CATEGORIES = {
  electrical: {
    name: 'Electrical',
    icon: '⚡',
    options: {
      wall_outlets: {
        name: 'Wall Outlets',
        type: 'number',
        default: 4,
        min: 1,
        max: 20,
        icon: '🔌'
      },
      usb_outlets: {
        name: 'USB Outlets',
        type: 'number',
        default: 0,
        min: 0,
        max: 10,
        icon: '🔋'
      },
      usb_c_outlets: {
        name: 'USB-C Outlets',
        type: 'number',
        default: 0,
        min: 0,
        max: 10,
        icon: '⚡'
      },
      light_switches: {
        name: 'Light Switches',
        type: 'number',
        default: 1,
        min: 1,
        max: 10,
        icon: '💡'
      },
      dimmer_switches: {
        name: 'Dimmer Switches',
        type: 'boolean',
        default: false,
        icon: '🎚️'
      },
      smart_switches: {
        name: 'Smart Switches',
        type: 'boolean',
        default: false,
        icon: '🏠'
      },
      motion_sensors: {
        name: 'Motion Sensor Lights',
        type: 'boolean',
        default: false,
        icon: '🚶'
      },
      backup_power: {
        name: 'Backup Power Outlet',
        type: 'boolean',
        default: false,
        icon: '🔋'
      },
      dedicated_circuits: {
        name: 'Dedicated Circuits',
        type: 'number',
        default: 0,
        min: 0,
        max: 5,
        icon: '⚡'
      }
    }
  },
  lighting: {
    name: 'Lighting',
    icon: '💡',
    options: {
      ceiling_lights: {
        name: 'Ceiling Lights',
        type: 'select',
        options: ['None', 'Chandelier', 'Pendant', 'Recessed', 'Track', 'Flush Mount', 'Semi-Flush', 'Cove Lighting'],
        default: 'Recessed',
        icon: '💡'
      },
      wall_sconces: {
        name: 'Wall Sconces',
        type: 'number',
        default: 0,
        min: 0,
        max: 10,
        icon: '🕯️'
      },
      floor_lamps: {
        name: 'Floor Lamp Outlets',
        type: 'number',
        default: 0,
        min: 0,
        max: 5,
        icon: '🪔'
      },
      led_strips: {
        name: 'LED Strips',
        type: 'boolean',
        default: false,
        icon: '✨'
      },
      under_cabinet: {
        name: 'Under-Cabinet Lighting',
        type: 'boolean',
        default: false,
        icon: '💡'
      },
      accent_lighting: {
        name: 'Accent Lighting',
        type: 'boolean',
        default: false,
        icon: '✨'
      },
      task_lighting: {
        name: 'Task Lighting',
        type: 'boolean',
        default: false,
        icon: '💡'
      },
      natural_light: {
        name: 'Natural Light Sources',
        type: 'select',
        options: ['None', 'Small Window', 'Large Window', 'French Doors', 'Skylights', 'Floor-to-Ceiling Windows', 'Bay Window'],
        default: 'Large Window',
        icon: '☀️'
      },
      color_temperature: {
        name: 'Adjustable Color Temperature',
        type: 'boolean',
        default: false,
        icon: '🌈'
      }
    }
  },
  climate: {
    name: 'Climate Control',
    icon: '🌡️',
    options: {
      ac_units: {
        name: 'AC Units',
        type: 'number',
        default: 1,
        min: 0,
        max: 5,
        icon: '❄️'
      },
      heating: {
        name: 'Heating System',
        type: 'select',
        options: ['None', 'Radiator', 'Underfloor', 'Central HVAC', 'Fireplace', 'Heat Pump', 'Baseboard'],
        default: 'Central HVAC',
        icon: '🔥'
      },
      ceiling_fan: {
        name: 'Ceiling Fan',
        type: 'boolean',
        default: false,
        icon: '🌀'
      },
      thermostat: {
        name: 'Smart Thermostat',
        type: 'boolean',
        default: false,
        icon: '🌡️'
      },
      humidifier: {
        name: 'Humidifier',
        type: 'boolean',
        default: false,
        icon: '💧'
      },
      dehumidifier: {
        name: 'Dehumidifier',
        type: 'boolean',
        default: false,
        icon: '☁️'
      },
      air_purifier: {
        name: 'Air Purifier',
        type: 'boolean',
        default: false,
        icon: '🌬️'
      },
      ventilation: {
        name: 'Ventilation System',
        type: 'select',
        options: ['None', 'Basic', 'ERV', 'HRV'],
        default: 'None',
        icon: '💨'
      }
    }
  },
  windows_doors: {
    name: 'Windows & Doors',
    icon: '🪟',
    options: {
      window_count: {
        name: 'Number of Windows',
        type: 'number',
        default: 1,
        min: 0,
        max: 10,
        icon: '🪟'
      },
      window_type: {
        name: 'Window Type',
        type: 'select',
        options: ['Standard', 'Double-Hung', 'Casement', 'Sliding', 'Picture', 'Bay', 'Bow', 'Awning'],
        default: 'Standard',
        icon: '🪟'
      },
      window_treatment: {
        name: 'Window Treatments',
        type: 'select',
        options: ['None', 'Blinds', 'Curtains', 'Shutters', 'Shades', 'Smart Shades'],
        default: 'None',
        icon: '🪟'
      },
      door_type: {
        name: 'Door Type',
        type: 'select',
        options: ['Standard', 'Double Door', 'Sliding', 'Pocket', 'French', 'Barn Door'],
        default: 'Standard',
        icon: '🚪'
      },
      door_hardware: {
        name: 'Door Hardware',
        type: 'select',
        options: ['Standard', 'Smart Lock', 'Keypad', 'Biometric'],
        default: 'Standard',
        icon: '🔑'
      },
      soundproof_door: {
        name: 'Soundproof Door',
        type: 'boolean',
        default: false,
        icon: '🔇'
      }
    }
  },
  security: {
    name: 'Security',
    icon: '🔒',
    options: {
      security_camera: {
        name: 'Security Camera',
        type: 'boolean',
        default: false,
        icon: '📹'
      },
      motion_detectors: {
        name: 'Motion Detectors',
        type: 'number',
        default: 0,
        min: 0,
        max: 5,
        icon: '🚨'
      },
      door_sensor: {
        name: 'Door Sensors',
        type: 'boolean',
        default: false,
        icon: '🚪'
      },
      window_sensor: {
        name: 'Window Sensors',
        type: 'boolean',
        default: false,
        icon: '🪟'
      },
      panic_button: {
        name: 'Panic Button',
        type: 'boolean',
        default: false,
        icon: '🚨'
      },
      safe: {
        name: 'Built-in Safe',
        type: 'boolean',
        default: false,
        icon: '🔐'
      },
      reinforced_door: {
        name: 'Reinforced Door',
        type: 'boolean',
        default: false,
        icon: '🚪'
      }
    }
  },
  safety: {
    name: 'Safety Features',
    icon: '🛡️',
    options: {
      smoke_detector: {
        name: 'Smoke Detector',
        type: 'boolean',
        default: true,
        icon: '🚨'
      },
      co_detector: {
        name: 'CO Detector',
        type: 'boolean',
        default: true,
        icon: '⚠️'
      },
      fire_extinguisher: {
        name: 'Fire Extinguisher',
        type: 'boolean',
        default: false,
        icon: '🧯'
      },
      emergency_exit: {
        name: 'Emergency Exit',
        type: 'boolean',
        default: false,
        icon: '🚪'
      },
      child_safety_locks: {
        name: 'Child Safety Locks',
        type: 'boolean',
        default: false,
        icon: '🔒'
      },
      outlet_covers: {
        name: 'Outlet Safety Covers',
        type: 'boolean',
        default: false,
        icon: '🔌'
      },
      corner_guards: {
        name: 'Corner Guards',
        type: 'boolean',
        default: false,
        icon: '🛡️'
      },
      non_slip_floor: {
        name: 'Non-Slip Flooring',
        type: 'boolean',
        default: false,
        icon: '👟'
      }
    }
  },
  plumbing: {
    name: 'Plumbing',
    icon: '🚰',
    options: {
      sinks: {
        name: 'Sinks',
        type: 'number',
        default: 1,
        min: 0,
        max: 3,
        icon: '🚰'
      },
      sink_type: {
        name: 'Sink Type',
        type: 'select',
        options: ['Standard', 'Undermount', 'Vessel', 'Farmhouse', 'Pedestal', 'Wall-Mount'],
        default: 'Standard',
        icon: '🚰'
      },
      faucet_type: {
        name: 'Faucet Type',
        type: 'select',
        options: ['Standard', 'Pull-Down', 'Touchless', 'Wall-Mount', 'Pot Filler'],
        default: 'Standard',
        icon: '🚿'
      },
      toilets: {
        name: 'Toilets',
        type: 'number',
        default: 1,
        min: 0,
        max: 2,
        icon: '🚽'
      },
      toilet_type: {
        name: 'Toilet Type',
        type: 'select',
        options: ['Standard', 'Dual-Flush', 'Smart Toilet', 'Wall-Hung'],
        default: 'Standard',
        icon: '🚽'
      },
      showers: {
        name: 'Showers',
        type: 'number',
        default: 0,
        min: 0,
        max: 2,
        icon: '🚿'
      },
      shower_type: {
        name: 'Shower Type',
        type: 'select',
        options: ['Standard', 'Walk-In', 'Steam Shower', 'Rain Shower', 'Multi-Head'],
        default: 'Standard',
        icon: '🚿'
      },
      bathtubs: {
        name: 'Bathtubs',
        type: 'number',
        default: 0,
        min: 0,
        max: 2,
        icon: '🛁'
      },
      bathtub_type: {
        name: 'Bathtub Type',
        type: 'select',
        options: ['Standard', 'Freestanding', 'Soaking Tub', 'Whirlpool', 'Jetted'],
        default: 'Standard',
        icon: '🛁'
      },
      bidets: {
        name: 'Bidets',
        type: 'number',
        default: 0,
        min: 0,
        max: 2,
        icon: '🚾'
      },
      hot_water: {
        name: 'Hot Water System',
        type: 'select',
        options: ['Standard', 'Tankless', 'Solar', 'Heat Pump'],
        default: 'Standard',
        icon: '♨️'
      },
      water_filter: {
        name: 'Water Filtration',
        type: 'boolean',
        default: false,
        icon: '💧'
      },
      instant_hot_water: {
        name: 'Instant Hot Water',
        type: 'boolean',
        default: false,
        icon: '♨️'
      }
    }
  },
  technology: {
    name: 'Technology',
    icon: '📱',
    options: {
      network_ports: {
        name: 'Network Ports',
        type: 'number',
        default: 1,
        min: 0,
        max: 10,
        icon: '🌐'
      },
      wifi_access_point: {
        name: 'WiFi Access Point',
        type: 'boolean',
        default: false,
        icon: '📶'
      },
      tv_mounting: {
        name: 'TV Wall Mount',
        type: 'boolean',
        default: false,
        icon: '📺'
      },
      cable_management: {
        name: 'Cable Management',
        type: 'boolean',
        default: false,
        icon: '🔌'
      },
      speakers: {
        name: 'Built-in Speakers',
        type: 'number',
        default: 0,
        min: 0,
        max: 8,
        icon: '🔊'
      },
      voice_assistant: {
        name: 'Voice Assistant Hub',
        type: 'boolean',
        default: false,
        icon: '🗣️'
      },
      smart_home: {
        name: 'Smart Home Integration',
        type: 'boolean',
        default: false,
        icon: '🏠'
      },
      intercom: {
        name: 'Intercom System',
        type: 'boolean',
        default: false,
        icon: '📞'
      },
      video_doorbell: {
        name: 'Video Doorbell',
        type: 'boolean',
        default: false,
        icon: '🔔'
      },
      charging_station: {
        name: 'Device Charging Station',
        type: 'boolean',
        default: false,
        icon: '🔋'
      }
    }
  },
  entertainment: {
    name: 'Entertainment',
    icon: '🎮',
    options: {
      surround_sound: {
        name: 'Surround Sound System',
        type: 'select',
        options: ['None', '2.1', '5.1', '7.1', 'Dolby Atmos'],
        default: 'None',
        icon: '🔊'
      },
      projector: {
        name: 'Projector System',
        type: 'boolean',
        default: false,
        icon: '📽️'
      },
      gaming_console: {
        name: 'Gaming Console Setup',
        type: 'boolean',
        default: false,
        icon: '🎮'
      },
      arcade_setup: {
        name: 'Arcade Setup',
        type: 'boolean',
        default: false,
        icon: '🕹️'
      },
      karaoke: {
        name: 'Karaoke System',
        type: 'boolean',
        default: false,
        icon: '🎤'
      },
      streaming: {
        name: 'Streaming Setup',
        type: 'boolean',
        default: false,
        icon: '📹'
      }
    }
  },
  wellness: {
    name: 'Wellness Features',
    icon: '🧘',
    options: {
      heated_floor: {
        name: 'Heated Flooring',
        type: 'boolean',
        default: false,
        icon: '🔥'
      },
      sauna_features: {
        name: 'Sauna Type',
        type: 'select',
        options: ['None', 'Traditional', 'Infrared', 'Steam'],
        default: 'None',
        icon: '♨️'
      },
      aromatherapy: {
        name: 'Aromatherapy System',
        type: 'boolean',
        default: false,
        icon: '🌸'
      },
      chromotherapy: {
        name: 'Chromotherapy Lighting',
        type: 'boolean',
        default: false,
        icon: '🌈'
      },
      heated_towel_rack: {
        name: 'Heated Towel Rack',
        type: 'boolean',
        default: false,
        icon: '🔥'
      },
      massage_shower: {
        name: 'Massage Shower Heads',
        type: 'boolean',
        default: false,
        icon: '💆'
      },
      exercise_equipment: {
        name: 'Exercise Equipment',
        type: 'select',
        options: ['None', 'Treadmill', 'Bike', 'Multi-Gym', 'Full Setup'],
        default: 'None',
        icon: '🏋️'
      }
    }
  },
  storage: {
    name: 'Storage',
    icon: '📦',
    options: {
      closets: {
        name: 'Built-in Closets',
        type: 'number',
        default: 1,
        min: 0,
        max: 5,
        icon: '🚪'
      },
      closet_type: {
        name: 'Closet Organization',
        type: 'select',
        options: ['Basic', 'Custom Organizer', 'Walk-In System', 'California Closet'],
        default: 'Basic',
        icon: '👔'
      },
      shelving: {
        name: 'Built-in Shelving',
        type: 'boolean',
        default: false,
        icon: '📚'
      },
      cabinets: {
        name: 'Cabinets',
        type: 'number',
        default: 0,
        min: 0,
        max: 20,
        icon: '🗄️'
      },
      cabinet_type: {
        name: 'Cabinet Type',
        type: 'select',
        options: ['Standard', 'Custom', 'European', 'Shaker', 'Modern Flat-Panel'],
        default: 'Standard',
        icon: '🗄️'
      },
      drawers: {
        name: 'Built-in Drawers',
        type: 'number',
        default: 0,
        min: 0,
        max: 15,
        icon: '🗃️'
      },
      pantry: {
        name: 'Pantry Organization',
        type: 'boolean',
        default: false,
        icon: '🍱'
      },
      overhead_storage: {
        name: 'Overhead Storage',
        type: 'boolean',
        default: false,
        icon: '📦'
      }
    }
  },
  accessibility: {
    name: 'Accessibility',
    icon: '♿',
    options: {
      wheelchair_accessible: {
        name: 'Wheelchair Accessible',
        type: 'boolean',
        default: false,
        icon: '♿'
      },
      wide_doorway: {
        name: 'Wide Doorway (36"+)',
        type: 'boolean',
        default: false,
        icon: '🚪'
      },
      grab_bars: {
        name: 'Grab Bars',
        type: 'number',
        default: 0,
        min: 0,
        max: 8,
        icon: '🤝'
      },
      step_free: {
        name: 'Step-Free Entry',
        type: 'boolean',
        default: true,
        icon: '✅'
      },
      lower_switches: {
        name: 'Lower Light Switches',
        type: 'boolean',
        default: false,
        icon: '⬇️'
      },
      roll_in_shower: {
        name: 'Roll-in Shower',
        type: 'boolean',
        default: false,
        icon: '🚿'
      },
      walk_in_tub: {
        name: 'Walk-in Tub',
        type: 'boolean',
        default: false,
        icon: '🛁'
      },
      lever_handles: {
        name: 'Lever Door Handles',
        type: 'boolean',
        default: false,
        icon: '🚪'
      },
      visual_alerts: {
        name: 'Visual Alert System',
        type: 'boolean',
        default: false,
        icon: '🚨'
      }
    }
  },
  flooring: {
    name: 'Flooring',
    icon: '🪵',
    options: {
      material: {
        name: 'Flooring Material',
        type: 'select',
        options: ['Hardwood', 'Tile', 'Marble', 'Carpet', 'Laminate', 'Vinyl', 'Concrete', 'Stone', 'Cork', 'Bamboo', 'Terrazzo'],
        default: 'Hardwood',
        icon: '🪵'
      },
      finish: {
        name: 'Floor Finish',
        type: 'select',
        options: ['Matte', 'Semi-Gloss', 'High-Gloss', 'Distressed', 'Hand-Scraped'],
        default: 'Matte',
        icon: '✨'
      },
      underfloor_heating: {
        name: 'Underfloor Heating',
        type: 'boolean',
        default: false,
        icon: '🔥'
      },
      area_rugs: {
        name: 'Area Rug Placement',
        type: 'number',
        default: 0,
        min: 0,
        max: 5,
        icon: '🧶'
      },
      transition_strips: {
        name: 'Transition Strips',
        type: 'boolean',
        default: true,
        icon: '📏'
      }
    }
  },
  special: {
    name: 'Special Features',
    icon: '⭐',
    options: {
      fireplace: {
        name: 'Fireplace',
        type: 'select',
        options: ['None', 'Wood Burning', 'Gas', 'Electric', 'Ethanol', 'Double-Sided'],
        default: 'None',
        icon: '🔥'
      },
      bay_window: {
        name: 'Bay Window',
        type: 'boolean',
        default: false,
        icon: '🪟'
      },
      french_doors: {
        name: 'French Doors',
        type: 'boolean',
        default: false,
        icon: '🚪'
      },
      vaulted_ceiling: {
        name: 'Vaulted Ceiling',
        type: 'boolean',
        default: false,
        icon: '⛰️'
      },
      tray_ceiling: {
        name: 'Tray Ceiling',
        type: 'boolean',
        default: false,
        icon: '🏛️'
      },
      crown_molding: {
        name: 'Crown Molding',
        type: 'boolean',
        default: false,
        icon: '👑'
      },
      wainscoting: {
        name: 'Wainscoting',
        type: 'boolean',
        default: false,
        icon: '🏛️'
      },
      built_in_bar: {
        name: 'Built-in Bar',
        type: 'boolean',
        default: false,
        icon: '🍸'
      },
      wet_bar: {
        name: 'Wet Bar',
        type: 'boolean',
        default: false,
        icon: '🚰'
      },
      built_in_desk: {
        name: 'Built-in Desk',
        type: 'boolean',
        default: false,
        icon: '💼'
      },
      murphy_bed: {
        name: 'Murphy Bed',
        type: 'boolean',
        default: false,
        icon: '🛏️'
      },
      hidden_storage: {
        name: 'Hidden Storage',
        type: 'boolean',
        default: false,
        icon: '🔐'
      }
    }
  },
  fixtures: {
    name: 'Bathroom Fixtures',
    icon: '🚿',
    options: {
      mirror: {
        name: 'Mirror Type',
        type: 'select',
        options: ['Standard', 'Medicine Cabinet', 'LED Backlit', 'Full Wall', 'Smart Mirror'],
        default: 'Standard',
        icon: '🪞'
      },
      vanity: {
        name: 'Vanity Type',
        type: 'select',
        options: ['Single', 'Double', 'Floating', 'Traditional', 'Custom'],
        default: 'Single',
        icon: '🚰'
      },
      exhaust_fan: {
        name: 'Exhaust Fan',
        type: 'boolean',
        default: true,
        icon: '💨'
      },
      towel_warmer: {
        name: 'Towel Warmer',
        type: 'boolean',
        default: false,
        icon: '🔥'
      },
      shower_bench: {
        name: 'Shower Bench',
        type: 'boolean',
        default: false,
        icon: '🪑'
      },
      shower_niche: {
        name: 'Shower Niche',
        type: 'boolean',
        default: false,
        icon: '📦'
      },
      anti_fog_mirror: {
        name: 'Anti-Fog Mirror',
        type: 'boolean',
        default: false,
        icon: '🪞'
      }
    }
  },
  appliances: {
    name: 'Appliances',
    icon: '🏠',
    options: {
      refrigerator: {
        name: 'Refrigerator',
        type: 'select',
        options: ['None', 'Standard', 'French Door', 'Side-by-Side', 'Built-in', 'Smart Fridge'],
        default: 'Standard',
        icon: '🧊'
      },
      oven: {
        name: 'Oven/Range',
        type: 'select',
        options: ['None', 'Electric', 'Gas', 'Induction', 'Dual Fuel', 'Double Oven'],
        default: 'Electric',
        icon: '🍳'
      },
      dishwasher: {
        name: 'Dishwasher',
        type: 'boolean',
        default: false,
        icon: '🍽️'
      },
      microwave: {
        name: 'Microwave',
        type: 'select',
        options: ['None', 'Countertop', 'Over-range', 'Built-in', 'Drawer'],
        default: 'Over-range',
        icon: '📟'
      },
      washer_dryer: {
        name: 'Washer/Dryer',
        type: 'select',
        options: ['None', 'Stacked', 'Side-by-Side', 'Combo Unit', 'Front-Load', 'Top-Load'],
        default: 'None',
        icon: '🧺'
      },
      garbage_disposal: {
        name: 'Garbage Disposal',
        type: 'boolean',
        default: false,
        icon: '🗑️'
      },
      trash_compactor: {
        name: 'Trash Compactor',
        type: 'boolean',
        default: false,
        icon: '📦'
      },
      wine_fridge: {
        name: 'Wine Refrigerator',
        type: 'boolean',
        default: false,
        icon: '🍷'
      },
      ice_maker: {
        name: 'Ice Maker',
        type: 'boolean',
        default: false,
        icon: '🧊'
      },
      coffee_station: {
        name: 'Built-in Coffee Station',
        type: 'boolean',
        default: false,
        icon: '☕'
      }
    }
  },
  outdoor: {
    name: 'Outdoor Features',
    icon: '🌳',
    options: {
      railing: {
        name: 'Railing Type',
        type: 'select',
        options: ['None', 'Metal', 'Wood', 'Glass', 'Stone', 'Cable'],
        default: 'Metal',
        icon: '🏗️'
      },
      awning: {
        name: 'Awning/Pergola',
        type: 'boolean',
        default: false,
        icon: '⛱️'
      },
      retractable_awning: {
        name: 'Retractable Awning',
        type: 'boolean',
        default: false,
        icon: '⛱️'
      },
      outdoor_kitchen: {
        name: 'Outdoor Kitchen',
        type: 'boolean',
        default: false,
        icon: '🍖'
      },
      grill_station: {
        name: 'Built-in Grill',
        type: 'boolean',
        default: false,
        icon: '🔥'
      },
      outdoor_fireplace: {
        name: 'Outdoor Fireplace',
        type: 'boolean',
        default: false,
        icon: '🔥'
      },
      fire_pit: {
        name: 'Fire Pit',
        type: 'boolean',
        default: false,
        icon: '🔥'
      },
      planters: {
        name: 'Built-in Planters',
        type: 'number',
        default: 0,
        min: 0,
        max: 10,
        icon: '🪴'
      },
      outdoor_lighting: {
        name: 'Outdoor Lighting Type',
        type: 'select',
        options: ['None', 'Basic', 'String Lights', 'Landscape', 'Smart Lighting'],
        default: 'Basic',
        icon: '💡'
      },
      misting_system: {
        name: 'Misting System',
        type: 'boolean',
        default: false,
        icon: '💦'
      }
    }
  },
  pool_specific: {
    name: 'Pool Features',
    icon: '🏊',
    options: {
      pool_type: {
        name: 'Pool Type',
        type: 'select',
        options: ['Lap Pool', 'Infinity Pool', 'Plunge Pool', 'Traditional', 'Natural Pool'],
        default: 'Traditional',
        icon: '🏊'
      },
      pool_size: {
        name: 'Pool Size',
        type: 'select',
        options: ['Small (10-15m)', 'Medium (15-20m)', 'Large (20-25m)', 'Olympic (25m+)'],
        default: 'Medium (15-20m)',
        icon: '📏'
      },
      pool_heating: {
        name: 'Pool Heating',
        type: 'select',
        options: ['None', 'Solar', 'Electric', 'Gas', 'Heat Pump'],
        default: 'None',
        icon: '♨️'
      },
      hot_tub: {
        name: 'Hot Tub/Jacuzzi',
        type: 'boolean',
        default: false,
        icon: '🛁'
      },
      pool_lighting: {
        name: 'Underwater Lighting',
        type: 'boolean',
        default: true,
        icon: '💡'
      },
      waterfall: {
        name: 'Waterfall Feature',
        type: 'boolean',
        default: false,
        icon: '💧'
      },
      diving_board: {
        name: 'Diving Board',
        type: 'boolean',
        default: false,
        icon: '🏊'
      },
      pool_slide: {
        name: 'Pool Slide',
        type: 'boolean',
        default: false,
        icon: '🌊'
      },
      saltwater_system: {
        name: 'Saltwater System',
        type: 'boolean',
        default: false,
        icon: '🌊'
      },
      automatic_cover: {
        name: 'Automatic Cover',
        type: 'boolean',
        default: false,
        icon: '📦'
      },
      pool_deck: {
        name: 'Pool Deck Material',
        type: 'select',
        options: ['Concrete', 'Pavers', 'Wood', 'Composite', 'Stone'],
        default: 'Concrete',
        icon: '🏗️'
      }
    }
  },
  garage_specific: {
    name: 'Garage Features',
    icon: '🚗',
    options: {
      car_capacity: {
        name: 'Car Capacity',
        type: 'number',
        default: 2,
        min: 1,
        max: 4,
        icon: '🚗'
      },
      garage_door: {
        name: 'Garage Door Type',
        type: 'select',
        options: ['Manual', 'Automatic', 'Smart', 'Insulated'],
        default: 'Automatic',
        icon: '🚪'
      },
      workbench: {
        name: 'Workbench',
        type: 'boolean',
        default: false,
        icon: '🔧'
      },
      tool_storage: {
        name: 'Tool Storage System',
        type: 'boolean',
        default: false,
        icon: '🧰'
      },
      ev_charger: {
        name: 'EV Charging Station',
        type: 'boolean',
        default: false,
        icon: '🔌'
      },
      epoxy_floor: {
        name: 'Epoxy Floor Coating',
        type: 'boolean',
        default: false,
        icon: '✨'
      },
      climate_controlled: {
        name: 'Climate Controlled',
        type: 'boolean',
        default: false,
        icon: '🌡️'
      },
      car_lift: {
        name: 'Car Lift',
        type: 'boolean',
        default: false,
        icon: '⬆️'
      }
    }
  },
  acoustics: {
    name: 'Acoustics',
    icon: '🔊',
    options: {
      soundproofing: {
        name: 'Soundproofing',
        type: 'select',
        options: ['None', 'Basic', 'Advanced', 'Professional', 'Studio Grade'],
        default: 'None',
        icon: '🔇'
      },
      acoustic_panels: {
        name: 'Acoustic Panels',
        type: 'boolean',
        default: false,
        icon: '📢'
      },
      bass_traps: {
        name: 'Bass Traps',
        type: 'boolean',
        default: false,
        icon: '🔊'
      },
      diffusers: {
        name: 'Acoustic Diffusers',
        type: 'boolean',
        default: false,
        icon: '🔊'
      },
      double_walls: {
        name: 'Double Walls',
        type: 'boolean',
        default: false,
        icon: '🧱'
      },
      floating_floor: {
        name: 'Floating Floor',
        type: 'boolean',
        default: false,
        icon: '🎵'
      }
    }
  }
};

export default ROOM_TYPES;
