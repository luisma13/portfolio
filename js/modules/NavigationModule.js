/**
 * NavigationModule - Gestión de navegación y scroll
 */
import Config from '../core/Config.js';
import EventBus from '../core/EventBus.js';
import StateManager from '../core/StateManager.js';
import { smoothScrollTo } from '../utils/helpers.js';

class NavigationModule {
    constructor() {
        this.elements = {
            logo: null,
            navLinks: [],
            discoverBtn: null
        };
        this.isInitialized = false;
    }

    /**
     * Inicializar módulo
     */
    initialize() {
        if (this.isInitialized) return;

        this._cacheElements();
        this._setupLogoClick();
        this._setupSmoothScroll();
        this._setupDiscoverButton();

        this.isInitialized = true;
    }

    /**
     * Cachear elementos
     * @private
     */
    _cacheElements() {
        this.elements.logo = document.querySelector('.logo');
        this.elements.navLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
        this.elements.discoverBtn = document.querySelector('.discover-btn');
    }

    /**
     * Configurar clic en logo
     * @private
     */
    _setupLogoClick() {
        this.elements.logo?.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Si estamos en modo 3D, salir
            if (StateManager.get('is3DMode')) {
                EventBus.emit(Config.events.MODE_3D_TOGGLE, { mode: false });
            }
            
            // Scroll al top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Configurar smooth scroll para todos los enlaces internos
     * @private
     */
    _setupSmoothScroll() {
        this.elements.navLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                const sectionId = href.substring(1);

                // Si estamos en modo 3D y es una sección válida del 3D
                if (StateManager.get('is3DMode') && Config.three.targets[sectionId]) {
                    e.preventDefault();
                    EventBus.emit(Config.events.SECTION_NAVIGATE, { section: sectionId });
                    return;
                }

                // Navegación normal con smooth scroll
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    smoothScrollTo(target, Config.ui.scrollOffset);
                }
            });
        });
    }

    /**
     * Configurar botón discover
     * @private
     */
    _setupDiscoverButton() {
        this.elements.discoverBtn?.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                smoothScrollTo(aboutSection, Config.ui.scrollOffset);
            }
        });
    }

    /**
     * Destruir módulo
     */
    destroy() {
        this.isInitialized = false;
    }
}

// Exportar instancia singleton
export default new NavigationModule();

