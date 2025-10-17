# Luis María González Pradas - Portfolio

A modern, interactive portfolio website featuring a 3D viewer using Three.js, clean architecture, and internationalization support.

## 🚀 Features

- **Interactive 3D Environment**: Immersive 3D viewer with planet, moon, and starfield using Three.js
- **Bilingual Support**: English/Spanish with dynamic language switching
- **Clean Architecture**: Modular design with separation of concerns
  - Core services (EventBus, StateManager, Config)
  - Feature modules (UI, Navigation, Three)
  - Internationalization service
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Content**: Complete CV with 10 years of experience
- **Modern Stack**: Vanilla JS with ES6+ modules for GitHub Pages compatibility

## 📁 Project Structure

```
portfolio/
├── index.html                 # Main HTML file
├── css/
│   ├── style.css             # Main styles with CSS variables
│   └── animations.css        # Animation definitions
├── js/
│   ├── app.js               # Application entry point
│   ├── core/
│   │   ├── EventBus.js      # Event system (Observer pattern)
│   │   ├── StateManager.js  # Centralized state management
│   │   └── Config.js        # Application configuration
│   ├── services/
│   │   ├── I18nService.js   # Internationalization service
│   │   └── StorageService.js # LocalStorage wrapper
│   ├── modules/
│   │   ├── UIModule.js      # UI interactions (loader, menus)
│   │   ├── NavigationModule.js # Navigation and scroll
│   │   └── ThreeModule.js   # 3D scene management
│   ├── data/
│   │   └── translations.js  # English/Spanish translations
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   ├── three-scene.js       # Three.js scene implementation
│   └── orbitControls.js     # Three.js orbit controls
└── images/                   # Project images and logos
```

## 🏗️ Architecture

### Design Patterns

- **Module Pattern**: Encapsulated functionality in singleton modules
- **Observer Pattern**: Event-driven communication via EventBus
- **State Pattern**: Centralized state management with reactive updates
- **Facade Pattern**: ThreeModule acts as facade for Three.js complexity
- **Singleton Pattern**: Single instances of services and modules

### Core Services

#### EventBus
Centralized event system for decoupled communication between modules.

```javascript
EventBus.on('language:changed', ({ language }) => {
    console.log(`Language changed to: ${language}`);
});

EventBus.emit('language:changed', { language: 'es' });
```

#### StateManager
Reactive state management with subscription support.

```javascript
StateManager.set('language', 'es');
StateManager.subscribe('language', ({ newValue }) => {
    // React to language change
});
```

#### I18nService
Handles translations and language switching.

```javascript
const translation = I18nService.t('nav.home'); // 'Home' or 'Inicio'
I18nService.setLanguage('es');
```

### Modules

#### UIModule
- Loader animations
- Mobile menu interactions
- Language toggle
- Scroll effects

#### NavigationModule
- Smooth scroll
- Section navigation
- 3D mode integration

#### ThreeModule
- 3D scene lifecycle
- Mode switching (normal/fullscreen)
- Section navigation in 3D

## 🎨 Design System

### Color Palette

```css
--primary-color: #0a0f1c;      /* Dark blue background */
--accent-color: #00f7ff;        /* Cyan accent */
--text-color: #ffffff;          /* White text */
```

### Typography

- Font Family: 'Inter', sans-serif
- Headings: Bold, with neon glow effect
- Body: Regular, optimized for readability

## 🌍 Internationalization

The portfolio supports English and Spanish:

1. **Automatic Detection**: Uses browser language on first visit
2. **Persistent Storage**: Language preference saved in localStorage
3. **Dynamic Switching**: Real-time content update without reload
4. **Attribute-based**: Uses `data-i18n` attributes for translations

Example:
```html
<h2 data-i18n="about.title">About Me</h2>
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser with ES6+ support
- Local server for development (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/luisma13/portfolio.git
cd portfolio
```

2. Open with a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using VS Code Live Server
# Right-click index.html → Open with Live Server
```

3. Or simply open `index.html` in your browser

### Configuration

Edit `js/core/Config.js` to customize:

- 3D scene parameters (camera, planet, starfield, moon)
- Animation durations
- UI settings
- Links and contact information

## 📱 Responsive Design

- **Desktop**: Full 3D experience with hover effects
- **Tablet**: Optimized touch interactions
- **Mobile**: Simplified navigation, touch-friendly UI

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1200px
- Desktop: > 1200px

## 🎮 3D Features

### Interactive Planet

- Wireframe sphere with neon glow
- Rotating animation
- Section markers on equator

### Moon Orbit

- Orbiting moon with diagonal path
- Synchronized rotation

### Starfield

- 2000+ stars with realistic positioning
- Gentle rotation animation

### Navigation

- Smooth camera transitions
- Section-specific viewpoints
- Zoom in/out animations

## 🧪 Testing

### Manual Testing Checklist

#### Desktop
- [ ] Loader animation plays correctly
- [ ] Navigation links work smoothly
- [ ] Language toggle switches content
- [ ] 3D mode activates properly
- [ ] Section navigation in 3D works
- [ ] Mobile menu appears correctly (< 768px)
- [ ] All links open correctly

#### Mobile
- [ ] Touch interactions work
- [ ] Mobile menu functional
- [ ] Scroll performance smooth
- [ ] 3D viewer optimized
- [ ] Language toggle accessible

#### Cross-browser
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari

## 🚢 Deployment

### GitHub Pages

This portfolio is configured for GitHub Pages deployment:

1. Push changes to main branch
2. GitHub Pages automatically deploys from main
3. Access at: `https://luisma13.github.io/portfolio`

### Custom Domain

To use a custom domain:

1. Create `CNAME` file in root with your domain
2. Configure DNS settings with your provider
3. Enable HTTPS in GitHub Pages settings

## 📊 Performance

- **Lighthouse Score**: 90+ performance
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **3D Rendering**: 60 FPS on modern hardware

## 🔧 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 13+)
- IE11: ❌ Not supported (requires ES6)

## 📄 License

This project is open source under the MIT License.

## 👨‍💻 Author

**Luis María González Pradas**
- Email: luisma.pradas@gmail.com
- LinkedIn: [Luis María González Pradas](https://www.linkedin.com/in/luis-maría-gonzález-pradas-88b946122)
- GitHub: [@luisma13](https://github.com/luisma13)

## 🙏 Acknowledgments

- Three.js for 3D graphics
- GSAP for animations
- Icons from various open-source projects

---

**Version**: 2.0.0  
**Last Updated**: October 2024
