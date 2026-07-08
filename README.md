# Luis María González Pradas - Portfolio

A modern, interactive portfolio website featuring a 3D viewer using Three.js, clean architecture, and internationalization support.

## Features

- **Interactive 3D Environment**: Immersive 3D viewer with planet, moon, and starfield using Three.js
- **Bilingual Support**: English/Spanish with dynamic language switching
- **Clean Architecture**: Modular design with separation of concerns
  - Core services (EventBus, StateManager, Config)
  - Feature modules (UI, Navigation, Three)
  - Internationalization service
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Content**: Complete CV with 10+ years of experience
- **Modern Stack**: Vanilla JS with ES6+ modules for GitHub Pages compatibility

## Project Structure

```
portfolio/
├── index.html
├── LICENSE
├── cv-luis-pradas-fullstack-2026-en.html   # Printable CV (EN)
├── cv-luis-pradas-fullstack-2026-es.html   # Printable CV (ES)
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   ├── app.js
│   ├── three-scene.js       # Three.js scene (global, loaded before modules)
│   ├── core/
│   │   ├── EventBus.js
│   │   ├── StateManager.js
│   │   └── Config.js
│   ├── services/
│   │   ├── I18nService.js
│   │   └── StorageService.js
│   ├── modules/
│   │   ├── UIModule.js
│   │   ├── NavigationModule.js
│   │   └── ThreeModule.js
│   ├── data/
│   │   └── translations.js
│   └── utils/
│       └── helpers.js
└── images/                  # Company logos and project assets
```

## Architecture

### Design Patterns

- **Module Pattern**: Encapsulated functionality in singleton modules
- **Observer Pattern**: Event-driven communication via EventBus
- **State Pattern**: Centralized state management with reactive updates
- **Facade Pattern**: ThreeModule acts as facade for Three.js complexity
- **Singleton Pattern**: Single instances of services and modules

### Core Services

#### EventBus
Centralized event system for decoupled communication between modules.

#### StateManager
Reactive state management with subscription support.

#### I18nService
Handles translations and language switching via `data-i18n` attributes and dynamic section rendering.

### Modules

- **UIModule**: Loader, mobile menu, scroll effects, language toggle
- **NavigationModule**: Smooth scroll and 3D mode navigation
- **ThreeModule**: 3D scene lifecycle, mode switching, section overlays

## Design System

### Color Palette

```css
--primary-color: #0a0f1c;
--accent-color: #00f7ff;
--text-color: #ffffff;
```

### Typography

- Font: [Inter](https://fonts.google.com/specimen/Inter) (loaded via Google Fonts)
- Headings: Bold, with neon glow effect

## Internationalization

The portfolio supports English and Spanish:

1. **Automatic Detection**: Uses browser language on first visit
2. **Persistent Storage**: Language preference saved in localStorage
3. **Dynamic Switching**: Real-time content update without reload
4. **3D Mode**: Panel labels and overlay UI are translated

## Getting Started

### Prerequisites

- Modern web browser with ES6+ support
- **Local HTTP server** (required — ES modules do not work with `file://`)

### Installation

```bash
git clone https://github.com/luisma13/portfolio.git
cd portfolio
npx http-server -p 8080
```

Open `http://localhost:8080` in your browser.

### Configuration

Edit `js/core/Config.js` to customize 3D scene parameters, animation durations, UI settings, and links.

## Responsive Design

- **Desktop**: Full 3D experience with hover effects
- **Tablet**: Optimized touch interactions
- **Mobile**: Reduced particle count, frame limiting, touch-friendly UI

Breakpoints:
- Mobile: < 768px
- Desktop: ≥ 768px

## 3D Features

- Wireframe planet with section billboards
- Orbiting moon with diagonal path
- Starfield with gentle rotation
- Drag to rotate, click panels to open section overlays
- Smooth camera transitions and zoom animations

## Deployment

### GitHub Pages

1. Push changes to the `main` branch
2. GitHub Pages deploys automatically
3. Live at: `https://luisma13.github.io/portfolio`

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- IE11: Not supported (requires ES6 modules)

## License

MIT License — see [LICENSE](LICENSE).

## Author

**Luis María González Pradas**

- Email: luisma.pradas@gmail.com
- LinkedIn: [Luis María González Pradas](https://www.linkedin.com/in/luis-maría-gonzález-pradas-88b946122)
- GitHub: [@luisma13](https://github.com/luisma13)

## Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics

---

**Version**: 2.1.0  
**Last Updated**: July 2026
