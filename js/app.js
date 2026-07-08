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

        try {
            await this._initializeCore();
            await this._initializeModules();
            this._setupGlobalListeners();
            this.isInitialized = true;
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }

    /**
     * Inicializar servicios core
     * @private
     */
    async _initializeCore() {
        I18nService.initialize();
    }

    /**
     * Inicializar módulos
     * @private
     */
    async _initializeModules() {
        await this.modules.ui.initialize();
        this.modules.navigation.initialize();

        if (window.ThreeScene) {
            await this.modules.three.initialize(window.ThreeScene);
        } else {
            console.warn('ThreeScene not found. 3D features will be disabled.');
        }
    }

    /**
     * Configurar listeners globales
     * @private
     */
    _setupGlobalListeners() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });

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

