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
        this._setupStateListeners();

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
     * Configurar listeners de estado
     * @private
     */
    _setupStateListeners() {
        // Escuchar cuando cambia el modo 3D
        StateManager.subscribe('is3DMode', ({ newValue }) => {
            // Aquí puedes actualizar la UI si es necesario
            if (newValue) {
                // Estamos en modo 3D
                console.log('Navigation: Entered 3D mode');
            } else {
                // Salimos de modo 3D
                console.log('Navigation: Exited 3D mode');
            }
        });
    }

    /**
     * Navegar a una sección específica
     * @param {string} sectionId - ID de la sección
     * @param {boolean} [smooth=true] - Usar smooth scroll
     */
    navigateTo(sectionId, smooth = true) {
        const section = document.getElementById(sectionId);
        if (!section) {
            console.warn(`Section not found: ${sectionId}`);
            return;
        }

        if (smooth) {
            smoothScrollTo(section, Config.ui.scrollOffset);
        } else {
            section.scrollIntoView({ block: 'start' });
        }
    }

    /**
     * Obtener sección activa actual
     * @returns {string|null}
     */
    getCurrentSection() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.pageYOffset + Config.ui.scrollOffset + 100;

        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return section.id;
            }
        }

        return null;
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

