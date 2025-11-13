import { create } from 'zustand';
import { VILLA_TEMPLATES } from '../data/villaTemplates';

export const useVillaStore = create((set, get) => ({
  // Villa configuration
  villaName: 'My Dream Villa',
  numberOfFloors: 2,
  totalArea: 0,
  plotSize: 500,
  villaStyle: 'Modern',
  hasPool: false,
  hasGarden: true,
  gardenArea: 100,
  garageSpaces: 2,

  // Building step
  currentStep: 'config', // 'config', 'builder', 'details', 'preview'
  currentFloor: 1,

  // Rooms data - organized by floor
  rooms: {
    1: [],
    2: [],
    3: [],
    4: []
  },

  // Selected room for editing
  selectedRoom: null,

  // Actions
  setVillaName: (name) => set({ villaName: name }),

  setNumberOfFloors: (floors) => set({
    numberOfFloors: floors,
    currentFloor: Math.min(get().currentFloor, floors)
  }),

  setTotalArea: (area) => set({ totalArea: area }),

  setPlotSize: (size) => set({ plotSize: size }),

  setVillaStyle: (style) => set({ villaStyle: style }),

  setHasPool: (hasPool) => set({ hasPool }),

  setHasGarden: (hasGarden) => set({ hasGarden }),

  setGardenArea: (area) => set({ gardenArea: area }),

  setGarageSpaces: (spaces) => set({ garageSpaces: spaces }),

  setCurrentStep: (step) => set({ currentStep: step }),

  setCurrentFloor: (floor) => set({ currentFloor: floor }),

  addRoom: (floor, roomType) => {
    const state = get();
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newRoom = {
      id: roomId,
      type: roomType.id,
      name: roomType.name,
      position: { x: 10, y: 10 }, // Default position
      size: roomType.defaultSize,
      features: {}, // Will be populated with default values
      customName: ''
    };

    set(state => ({
      rooms: {
        ...state.rooms,
        [floor]: [...state.rooms[floor], newRoom]
      }
    }));

    return roomId;
  },

  updateRoom: (floor, roomId, updates) => {
    set(state => ({
      rooms: {
        ...state.rooms,
        [floor]: state.rooms[floor].map(room =>
          room.id === roomId ? { ...room, ...updates } : room
        )
      }
    }));
  },

  deleteRoom: (floor, roomId) => {
    set(state => ({
      rooms: {
        ...state.rooms,
        [floor]: state.rooms[floor].filter(room => room.id !== roomId)
      },
      selectedRoom: state.selectedRoom?.id === roomId ? null : state.selectedRoom
    }));
  },

  setSelectedRoom: (room) => set({ selectedRoom: room }),

  updateRoomFeatures: (floor, roomId, features) => {
    set(state => ({
      rooms: {
        ...state.rooms,
        [floor]: state.rooms[floor].map(room =>
          room.id === roomId ? { ...room, features: { ...room.features, ...features } } : room
        )
      }
    }));
  },

  // Load template
  loadTemplate: (templateId) => {
    const template = VILLA_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    // Convert template rooms to store format
    const rooms = {};
    for (let i = 1; i <= 4; i++) {
      rooms[i] = [];
    }

    Object.keys(template.rooms).forEach(floorKey => {
      const floorNum = parseInt(floorKey.replace('floor', ''));
      rooms[floorNum] = template.rooms[floorKey].map(room => ({
        id: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: room.type,
        name: room.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        position: room.position,
        size: room.size,
        features: {},
        customName: ''
      }));
    });

    set({
      villaName: template.name,
      numberOfFloors: template.floors,
      totalArea: template.totalArea,
      villaStyle: template.style,
      hasPool: template.features.pool,
      hasGarden: template.features.gardenArea > 0,
      gardenArea: template.features.gardenArea,
      garageSpaces: template.features.garage ? 2 : 0,
      rooms,
      currentStep: 'builder',
      currentFloor: 1
    });
  },

  // Reset store
  reset: () => set({
    villaName: 'My Dream Villa',
    numberOfFloors: 2,
    totalArea: 0,
    plotSize: 500,
    villaStyle: 'Modern',
    hasPool: false,
    hasGarden: true,
    gardenArea: 100,
    garageSpaces: 2,
    currentStep: 'config',
    currentFloor: 1,
    rooms: {
      1: [],
      2: [],
      3: [],
      4: []
    },
    selectedRoom: null
  }),

  // Export villa data
  exportVilla: () => {
    const state = get();
    return {
      villaName: state.villaName,
      numberOfFloors: state.numberOfFloors,
      totalArea: state.totalArea,
      plotSize: state.plotSize,
      villaStyle: state.villaStyle,
      hasPool: state.hasPool,
      hasGarden: state.hasGarden,
      gardenArea: state.gardenArea,
      garageSpaces: state.garageSpaces,
      rooms: state.rooms,
      exportedAt: new Date().toISOString()
    };
  },

  // Import villa data
  importVilla: (data) => {
    set({
      villaName: data.villaName,
      numberOfFloors: data.numberOfFloors,
      totalArea: data.totalArea,
      plotSize: data.plotSize,
      villaStyle: data.villaStyle,
      hasPool: data.hasPool,
      hasGarden: data.hasGarden,
      gardenArea: data.gardenArea,
      garageSpaces: data.garageSpaces,
      rooms: data.rooms,
      currentStep: 'builder',
      currentFloor: 1
    });
  }
}));

export default useVillaStore;
