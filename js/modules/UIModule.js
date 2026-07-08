/**
 * UIModule - Gestión de interacciones UI
 * Loader, mobile menu, scroll effects, etc.
 */
import Config from '../core/Config.js';
import EventBus from '../core/EventBus.js';
import StateManager from '../core/StateManager.js';
import I18nService from '../services/I18nService.js';
import { wait } from '../utils/helpers.js';

class UIModule {
    constructor() {
        this.elements = {
            loader: null,
            nav: null,
            mobileMenuBtn: null,
            navLinks: null,
            languageToggle: null
        };
        this.isInitialized = false;
    }

    /**
     * Inicializar módulo
     */
    async initialize() {
        if (this.isInitialized) return;

        this._cacheElements();
        this._setupLoader();
        this._setupMobileMenu();
        this._setupScrollEffects();
        this._setupLanguageToggle();
        this._setupStateListeners();

        this.isInitialized = true;
    }

    /**
     * Cachear elementos del DOM
     * @private
     */
    _cacheElements() {
        this.elements.loader = document.querySelector('.loader');
        this.elements.nav = document.querySelector('.nav');
        this.elements.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.elements.navLinks = document.querySelector('.nav-links');
        this.elements.languageToggle = document.getElementById('language-toggle');
    }

    /**
     * Configurar loader inicial
     * @private
     */
    async _setupLoader() {
        await wait(Config.ui.loaderDuration);
        
        if (this.elements.loader) {
            this.elements.loader.classList.add('fade-out');
            
            await wait(Config.ui.loaderFadeOut);
            
            this.elements.loader.style.display = 'none';
            
            if (this.elements.nav) {
                this.elements.nav.classList.add('loaded');
            }

            StateManager.set('isLoading', false);
            EventBus.emit(Config.events.LOADER_COMPLETE);
        }
    }

    /**
     * Configurar menú móvil
     * @private
     */
    _setupMobileMenu() {
        if (!this.elements.mobileMenuBtn || !this.elements.navLinks) return;

        // Toggle menú móvil
        this.elements.mobileMenuBtn.addEventListener('click', () => {
            const isOpen = StateManager.get('isMobileMenuOpen');
            StateManager.set('isMobileMenuOpen', !isOpen);
        });

        // Cerrar menú al hacer clic en un enlace
        this.elements.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                StateManager.set('isMobileMenuOpen', false);
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!StateManager.get('isMobileMenuOpen')) return;
            
            if (!this.elements.navLinks.contains(e.target) && 
                !this.elements.mobileMenuBtn.contains(e.target)) {
                StateManager.set('isMobileMenuOpen', false);
            }
        });
    }

    /**
     * Configurar efectos de scroll
     * @private
     */
    _setupScrollEffects() {
        if (!this.elements.nav) return;

        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Añadir/quitar clase scrolled
            if (currentScroll > 50) {
                this.elements.nav.classList.add('scrolled');
            } else {
                this.elements.nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    /**
     * Configurar toggle de idioma
     * @private
     */
    _setupLanguageToggle() {
        if (!this.elements.languageToggle) {
            // Crear el toggle si no existe
            this._createLanguageToggle();
        }

        if (this.elements.languageToggle) {
            // Click en el botón
            this.elements.languageToggle.addEventListener('click', () => {
                const currentLang = StateManager.get('language');
                const newLang = currentLang === 'en' ? 'es' : 'en';
                I18nService.setLanguage(newLang);
            });
        }
    }

    /**
     * Crear toggle de idioma en el header
     * @private
     */
    _createLanguageToggle() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        const toggleButton = document.createElement('button');
        toggleButton.id = 'language-toggle';
        toggleButton.className = 'language-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle language');
        
        const currentLang = StateManager.get('language');
        toggleButton.innerHTML = `<span class="lang-icon">${currentLang.toUpperCase()}</span>`;
        
        navLinks.appendChild(toggleButton);
        this.elements.languageToggle = toggleButton;
    }

    /**
     * Configurar listeners de estado
     * @private
     */
    _setupStateListeners() {
        // Reaccionar a cambios de menú móvil
        StateManager.subscribe('isMobileMenuOpen', ({ newValue }) => {
            if (newValue) {
                this.elements.navLinks?.classList.add('active');
            } else {
                this.elements.navLinks?.classList.remove('active');
            }
        });

        // Reaccionar a cambios de idioma
        StateManager.subscribe('language', ({ newValue }) => {
            if (this.elements.languageToggle) {
                const langIcon = this.elements.languageToggle.querySelector('.lang-icon');
                if (langIcon) {
                    langIcon.textContent = newValue.toUpperCase();
                }
            }
            
            // Actualizar atributo lang del documento
            document.documentElement.lang = newValue;
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
export default new UIModule();

