# KolayVilla - Interactive Villa Plan Builder 🏡

A modern interactive villa architecture plan builder that allows you to design and customize your dream villa with an intuitive visual interface. Built with React, Vite, Framer Motion, and Zustand.

![Villa Builder](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Visual Builder
- **Interactive Floor Plan Designer**: Drag-and-drop interface for placing rooms
- **Multi-Floor Support**: Design villas with up to 4 floors
- **Real-time Preview**: See your design come to life instantly
- **Room Placement**: Visually position and size rooms on each floor

### Comprehensive Room Types
- Living & Dining Rooms
- Multiple Bedroom Types (Master, Guest, Children's)
- Bathrooms (Full, Half, Master with spa features)
- Kitchen with full appliance customization
- Home Office/Study
- Entertainment (Home Theater, Library)
- Fitness & Wellness (Gym, Spa)
- Utility Rooms (Laundry, Storage, Pantry)
- Outdoor Spaces (Pool, Terrace, Balcony, Garden)
- Garage with EV charging options
- Wine Cellar
- Walk-in Closets

### Detailed Room Customization
Each room can be customized with extensive features including:

#### Electrical Features
- Wall outlets (regular and USB)
- Light switches (standard, dimmer, smart)
- Network ports
- Smart home integration

#### Lighting Options
- Ceiling lights (chandelier, pendant, recessed, track)
- Wall sconces
- Floor lamps
- LED strips
- Natural light sources (windows, skylights, French doors)

#### Climate Control
- AC units
- Heating systems (radiator, underfloor, central HVAC, fireplace)
- Ceiling fans
- Smart thermostats

#### Plumbing (where applicable)
- Sinks, toilets, showers, bathtubs, bidets
- Hot water system selection
- Water pressure options

#### Technology
- Network/ethernet ports
- TV mounting
- Built-in speakers
- Security cameras
- Intercom systems

#### Storage Solutions
- Built-in closets
- Shelving systems
- Cabinets and drawers
- Custom configurations

#### Accessibility Features
- Wheelchair accessible options
- Wide doorways
- Grab bars
- Step-free entry
- Lower switch heights

#### Flooring & Materials
- Multiple material choices (hardwood, tile, marble, carpet, etc.)
- Underfloor heating
- Custom finishes

#### Special Features
- Fireplaces (wood, gas, electric)
- Bay windows
- French doors
- Vaulted ceilings
- Built-in bars
- Home theater acoustics
- Pool features (heating, lighting, waterfalls)

### Premade Templates
Start quickly with professional villa templates:
- **Modern Luxury Villa** (3 floors, 450m²)
- **Cozy Family Home** (2 floors, 280m²)
- **Minimalist Modern** (2 floors, 320m²)
- **Mediterranean Paradise** (2 floors, 380m²)
- **Compact Starter Villa** (1 floor, 160m²)
- **Executive Estate** (4 floors, 620m²)

All templates are fully customizable!

### Export & Save
- Export complete villa plans as JSON
- Save and load your projects
- Detailed room specifications
- Feature summaries

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kolayvilla.git
   cd kolayvilla
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 How to Use

### 1. Start Building
- Click "Start Building" from the home page
- Or choose a premade template to customize

### 2. Configure Your Villa
- Set the number of floors (1-4)
- Choose villa style
- Configure basic parameters

### 3. Design Floor Plans
- Select a floor from the floor selector
- Click on room types to add them to your floor
- Position and resize rooms visually
- Add multiple rooms of any type

### 4. Customize Room Details
- Click on any room to customize its features
- Set electrical outlets, lighting, climate control
- Choose plumbing fixtures and appliances
- Configure storage and accessibility features
- Add special features and finishes

### 5. Preview & Export
- Review your complete villa design
- See room counts and specifications
- Export your plan as JSON for architecture software
- Save your project to continue later

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **Vite 5.4** - Build tool and dev server
- **Zustand 4.5** - State management
- **Framer Motion 11.5** - Animations
- **React Router 6.26** - Navigation
- **Lucide React** - Icons

## 📁 Project Structure

```
/kolayvilla
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Landing page
│   │   ├── Templates.jsx # Template gallery
│   │   └── Builder.jsx  # Main builder interface
│   ├── data/
│   │   ├── roomTypes.js     # Room definitions and features
│   │   └── villaTemplates.js # Premade villa templates
│   ├── store/
│   │   └── villaStore.js # Zustand state management
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🎨 Customization

### Adding New Room Types

Edit `src/data/roomTypes.js`:

```javascript
export const ROOM_TYPES = {
  YOUR_NEW_ROOM: {
    id: 'your_new_room',
    name: 'Your New Room',
    icon: '🏠',
    color: '#FF6B6B',
    defaultSize: { width: 12, height: 12 },
    minSize: { width: 8, height: 8 },
    features: ['electrical', 'lighting', 'climate']
  }
};
```

### Adding New Features

Edit `src/data/roomTypes.js` in the `FEATURE_CATEGORIES` object:

```javascript
export const FEATURE_CATEGORIES = {
  your_feature: {
    name: 'Your Feature Category',
    icon: '⭐',
    options: {
      your_option: {
        name: 'Your Option',
        type: 'number', // or 'boolean', 'select'
        default: 1,
        min: 0,
        max: 10,
        icon: '🔧'
      }
    }
  }
};
```

### Creating New Templates

Edit `src/data/villaTemplates.js`:

```javascript
export const VILLA_TEMPLATES = [
  {
    id: 'your_template',
    name: 'Your Template Name',
    description: 'Description of your template',
    image: '🏠',
    floors: 2,
    totalArea: 300,
    style: 'Modern',
    features: {
      pool: true,
      garage: true,
      gardenArea: 150
    },
    rooms: {
      floor1: [
        // Room definitions...
      ]
    }
  }
];
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- State management by [Zustand](https://github.com/pmndrs/zustand)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for architecture enthusiasts and home designers**
