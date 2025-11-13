// Room Types with their default properties and customizable features
export const ROOM_TYPES = {
  LIVING_ROOM: {
    id: 'living_room',
    name: 'Living Room',
    icon: '🛋️',
    color: '#FFB84D',
    defaultSize: { width: 20, height: 20 },
    minSize: { width: 12, height: 12 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'flooring', 'special']
  },
  MASTER_BEDROOM: {
    id: 'master_bedroom',
    name: 'Master Bedroom',
    icon: '🛏️',
    color: '#6B8DD6',
    defaultSize: { width: 16, height: 16 },
    minSize: { width: 12, height: 12 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'storage', 'flooring', 'special']
  },
  BEDROOM: {
    id: 'bedroom',
    name: 'Bedroom',
    icon: '🛏️',
    color: '#8AA4D6',
    defaultSize: { width: 12, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'storage', 'flooring']
  },
  KITCHEN: {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍳',
    color: '#FF6B6B',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 8 },
    features: ['electrical', 'lighting', 'plumbing', 'storage', 'technology', 'accessibility', 'flooring', 'appliances']
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
  MASTER_BATHROOM: {
    id: 'master_bathroom',
    name: 'Master Bathroom',
    icon: '🛁',
    color: '#45B7D1',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'plumbing', 'storage', 'accessibility', 'flooring', 'fixtures', 'special']
  },
  DINING_ROOM: {
    id: 'dining_room',
    name: 'Dining Room',
    icon: '🍽️',
    color: '#96CEB4',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'flooring', 'special']
  },
  HOME_OFFICE: {
    id: 'home_office',
    name: 'Home Office',
    icon: '💼',
    color: '#FFEAA7',
    defaultSize: { width: 12, height: 10 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'accessibility', 'flooring']
  },
  GARAGE: {
    id: 'garage',
    name: 'Garage',
    icon: '🚗',
    color: '#74B9FF',
    defaultSize: { width: 20, height: 20 },
    minSize: { width: 16, height: 18 },
    features: ['electrical', 'lighting', 'storage', 'technology', 'accessibility', 'flooring', 'garage_specific']
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
  STORAGE: {
    id: 'storage',
    name: 'Storage/Pantry',
    icon: '📦',
    color: '#DFE6E9',
    defaultSize: { width: 8, height: 6 },
    minSize: { width: 4, height: 4 },
    features: ['electrical', 'lighting', 'storage', 'accessibility', 'flooring']
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
  POOL_AREA: {
    id: 'pool_area',
    name: 'Pool Area',
    icon: '🏊',
    color: '#00B894',
    defaultSize: { width: 24, height: 12 },
    minSize: { width: 16, height: 8 },
    features: ['electrical', 'lighting', 'plumbing', 'outdoor', 'accessibility', 'pool_specific']
  },
  HOME_THEATER: {
    id: 'home_theater',
    name: 'Home Theater',
    icon: '🎬',
    color: '#6C5CE7',
    defaultSize: { width: 16, height: 14 },
    minSize: { width: 12, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'flooring', 'acoustics']
  },
  GYM: {
    id: 'gym',
    name: 'Gym/Fitness Room',
    icon: '💪',
    color: '#FD79A8',
    defaultSize: { width: 14, height: 12 },
    minSize: { width: 10, height: 10 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'accessibility', 'flooring', 'special']
  },
  WINE_CELLAR: {
    id: 'wine_cellar',
    name: 'Wine Cellar',
    icon: '🍷',
    color: '#E17055',
    defaultSize: { width: 10, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'climate', 'storage', 'flooring']
  },
  LIBRARY: {
    id: 'library',
    name: 'Library/Study',
    icon: '📚',
    color: '#FDCB6E',
    defaultSize: { width: 12, height: 12 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate', 'technology', 'storage', 'accessibility', 'flooring', 'special']
  },
  WALK_IN_CLOSET: {
    id: 'walk_in_closet',
    name: 'Walk-in Closet',
    icon: '👔',
    color: '#E84393',
    defaultSize: { width: 8, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'storage', 'accessibility', 'flooring']
  },
  ENTRANCE_HALL: {
    id: 'entrance_hall',
    name: 'Entrance Hall',
    icon: '🚪',
    color: '#B2BEC3',
    defaultSize: { width: 10, height: 8 },
    minSize: { width: 6, height: 6 },
    features: ['electrical', 'lighting', 'storage', 'accessibility', 'flooring']
  }
};

// Feature categories and their options
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
        options: ['Chandelier', 'Pendant', 'Recessed', 'Track', 'Flush Mount'],
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
      natural_light: {
        name: 'Natural Light Sources',
        type: 'select',
        options: ['None', 'Small Window', 'Large Window', 'French Doors', 'Skylights'],
        default: 'Large Window',
        icon: '☀️'
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
        options: ['None', 'Radiator', 'Underfloor', 'Central HVAC', 'Fireplace'],
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
      toilets: {
        name: 'Toilets',
        type: 'number',
        default: 1,
        min: 0,
        max: 2,
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
      bathtubs: {
        name: 'Bathtubs',
        type: 'number',
        default: 0,
        min: 0,
        max: 2,
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
        options: ['Standard', 'Tankless', 'Solar'],
        default: 'Standard',
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
      tv_mounting: {
        name: 'TV Wall Mount',
        type: 'boolean',
        default: false,
        icon: '📺'
      },
      speakers: {
        name: 'Built-in Speakers',
        type: 'number',
        default: 0,
        min: 0,
        max: 8,
        icon: '🔊'
      },
      security_camera: {
        name: 'Security Camera',
        type: 'boolean',
        default: false,
        icon: '📹'
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
      drawers: {
        name: 'Built-in Drawers',
        type: 'number',
        default: 0,
        min: 0,
        max: 15,
        icon: '🗃️'
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
        options: ['Hardwood', 'Tile', 'Marble', 'Carpet', 'Laminate', 'Vinyl', 'Concrete', 'Stone'],
        default: 'Hardwood',
        icon: '🪵'
      },
      underfloor_heating: {
        name: 'Underfloor Heating',
        type: 'boolean',
        default: false,
        icon: '🔥'
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
        options: ['None', 'Wood Burning', 'Gas', 'Electric'],
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
      built_in_bar: {
        name: 'Built-in Bar',
        type: 'boolean',
        default: false,
        icon: '🍸'
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
        options: ['Standard', 'Medicine Cabinet', 'LED Backlit', 'Full Wall'],
        default: 'Standard',
        icon: '🪞'
      },
      vanity: {
        name: 'Vanity Type',
        type: 'select',
        options: ['Single', 'Double', 'Floating', 'Traditional'],
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
        options: ['None', 'Standard', 'French Door', 'Side-by-Side', 'Built-in'],
        default: 'Standard',
        icon: '🧊'
      },
      oven: {
        name: 'Oven/Range',
        type: 'select',
        options: ['None', 'Electric', 'Gas', 'Induction', 'Dual Fuel'],
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
        options: ['None', 'Countertop', 'Over-range', 'Built-in'],
        default: 'Over-range',
        icon: '📟'
      },
      washer_dryer: {
        name: 'Washer/Dryer',
        type: 'select',
        options: ['None', 'Stacked', 'Side-by-Side', 'Combo Unit'],
        default: 'None',
        icon: '🧺'
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
        options: ['None', 'Metal', 'Wood', 'Glass', 'Stone'],
        default: 'Metal',
        icon: '🏗️'
      },
      awning: {
        name: 'Awning/Pergola',
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
      planters: {
        name: 'Built-in Planters',
        type: 'number',
        default: 0,
        min: 0,
        max: 10,
        icon: '🪴'
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
        options: ['Lap Pool', 'Infinity Pool', 'Plunge Pool', 'Traditional'],
        default: 'Traditional',
        icon: '🏊'
      },
      pool_heating: {
        name: 'Pool Heating',
        type: 'select',
        options: ['None', 'Solar', 'Electric', 'Gas'],
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
        options: ['Manual', 'Automatic', 'Smart'],
        default: 'Automatic',
        icon: '🚪'
      },
      workbench: {
        name: 'Workbench',
        type: 'boolean',
        default: false,
        icon: '🔧'
      },
      ev_charger: {
        name: 'EV Charging Station',
        type: 'boolean',
        default: false,
        icon: '🔌'
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
        options: ['None', 'Basic', 'Advanced', 'Professional'],
        default: 'Advanced',
        icon: '🔇'
      },
      acoustic_panels: {
        name: 'Acoustic Panels',
        type: 'boolean',
        default: true,
        icon: '📢'
      },
      surround_sound: {
        name: 'Surround Sound System',
        type: 'select',
        options: ['None', '5.1', '7.1', 'Dolby Atmos'],
        default: '7.1',
        icon: '🔊'
      }
    }
  }
};

export default ROOM_TYPES;
