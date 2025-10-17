/**
 * App - Entry Point
 * Inicializa y coordina todos los módulos de la aplicación
 */
import Config from './core/Config.js';
import EventBus from './core/EventBus.js';
import StateManager from './core/StateManager.js';
import I18nService from './services/I18nService.js';
import UIModule from './modules/UIModule.js';
import NavigationModule from './modules/NavigationModule.js';
import ThreeModule from './modules/ThreeModule.js';

class App {
    constructor() {
        this.isInitialized = false;
        this.modules = {
            ui: UIModule,
            navigation: NavigationModule,
            three: ThreeModule
        };
    }

    /**
     * Inicializar aplicación
     */
    async initialize() {
        if (this.isInitialized) return;

        console.log(`%c${Config.app.name} v${Config.app.version}`, 
            'color: #00f7ff; font-size: 16px; font-weight: bold;');

        try {
            // 1. Inicializar servicios core
            await this._initializeCore();

            // 2. Inicializar módulos
            await this._initializeModules();

            // 3. Configurar listeners globales
            this._setupGlobalListeners();

            // 4. Marcar como inicializado
            this.isInitialized = true;

            console.log('%cApplication initialized successfully ✓', 
                'color: #00f7ff; font-weight: bold;');

        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }

    /**
     * Inicializar servicios core
     * @private
     */
    async _initializeCore() {
        // Inicializar sistema de traducciones
        I18nService.initialize();

        console.log('✓ Core services initialized');
    }

    /**
     * Inicializar módulos
     * @private
     */
    async _initializeModules() {
        // Inicializar UI Module
        await this.modules.ui.initialize();
        console.log('✓ UI Module initialized');

        // Inicializar Navigation Module
        this.modules.navigation.initialize();
        console.log('✓ Navigation Module initialized');

        // Inicializar Three Module (cargamos ThreeScene después)
        // Esperamos a que el DOM esté completamente cargado
        if (window.ThreeScene) {
            await this.modules.three.initialize(window.ThreeScene);
            console.log('✓ Three Module initialized');
        } else {
            console.warn('ThreeScene not found. 3D features will be disabled.');
        }
    }

    /**
     * Configurar listeners globales
     * @private
     */
    _setupGlobalListeners() {
        // Log de cambios de idioma (solo para información)
        EventBus.on(Config.events.LANGUAGE_CHANGED, ({ language }) => {
            console.log(`✓ Language changed to: ${language}`);
        });

        // Escuchar cuando el loader termina
        EventBus.on(Config.events.LOADER_COMPLETE, () => {
            console.log('Loader animation completed');
        });

        // Manejar errores globales
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });

        // Manejar errores de promesas no capturados
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    /**
     * Obtener estado de la aplicación
     * @returns {Object}
     */
    getState() {
        return StateManager.get();
    }

    /**
     * Obtener módulo específico
     * @param {string} moduleName
     * @returns {Object|null}
     */
    getModule(moduleName) {
        return this.modules[moduleName] || null;
    }

    /**
     * Destruir aplicación (cleanup)
     */
    destroy() {
        // Limpiar módulos
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });

        // Limpiar event bus
        EventBus.clear();

        // Resetear estado
        StateManager.reset();

        this.isInitialized = false;
        console.log('Application destroyed');
    }
}

// Crear instancia global de la aplicación
const app = new App();

// Exponer Config para three-scene.js (que no usa modules)
window.PortfolioConfig = Config;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.initialize();
    });
} else {
    // DOM ya está listo
    app.initialize();
}

// Exportar para debugging
window.App = app;

export default app;

