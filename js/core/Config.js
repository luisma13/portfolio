/**
 * Config - Configuración centralizada de la aplicación
 */
const Config = {
    // Configuración general
    app: {
        name: 'LMGP Portfolio',
        version: '2.0.0',
        author: 'Luis María González Pradas'
    },

    // Configuración de idiomas
    i18n: {
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'es'],
        storageKey: 'portfolio_language'
    },

    // Configuración del visor 3D
    three: {
        cameraPositions: {
            normal: { z: 50 },
            fullscreen: { z: 25 }
        },
        animationDurations: {
            cameraTransition: 1000,
            sectionTransition: 1500,
            zoomOut: 800
        },
        planet: {
            radius: 5,
            wireframeColor: 0x00f7ff,
            segments: 32
        },
        starfield: {
            count: 2000,
            minRadius: 20,
            maxRadius: 50
        },
        moon: {
            size: 2,
            orbitRadius: 15,
            orbitHeight: 5,
            orbitSpeed: 0.0005
        },
        targets: {
            'about': { angle: 0 },
            'skills': { angle: (2 * Math.PI) / 5 },
            'experience': { angle: (4 * Math.PI) / 5 },
            'projects': { angle: (6 * Math.PI) / 5 },
            'contact': { angle: (8 * Math.PI) / 5 }
        }
    },

    // Configuración UI
    ui: {
        loaderDuration: 1000,
        loaderFadeOut: 500,
        scrollOffset: 80,
        mobileBreakpoint: 768
    },

    // URLs y enlaces
    links: {
        github: 'https://github.com/luisma13',
        linkedin: 'https://www.linkedin.com/in/luis-maría-gonzález-pradas-88b946122',
        email: 'luisma.pradas@gmail.com',
        portfolio: 'https://luisma13.github.io/portfolio'
    },

    // Eventos personalizados
    events: {
        LANGUAGE_CHANGED: 'language:changed',
        THEME_CHANGED: 'theme:changed',
        MODE_3D_TOGGLE: '3d:toggle',
        SECTION_NAVIGATE: 'section:navigate',
        LOADER_COMPLETE: 'loader:complete'
    }
};

export default Config;

