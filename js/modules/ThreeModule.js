/**
 * ThreeModule - Wrapper para gestionar la escena 3D
 * Actúa como facade entre la aplicación y ThreeScene
 */
import Config from '../core/Config.js';
import EventBus from '../core/EventBus.js';
import StateManager from '../core/StateManager.js';
import I18nService from '../services/I18nService.js';

class ThreeModule {
    constructor() {
        this.scene = null;
        this.elements = {
            container: null,
            enter3dBtn: null,
            exit3dBtn: null,
            options3dBtn: null,
            sectionNavButtons: null
        };
        this.isInitialized = false;
    }

    /**
     * Inicializar módulo
     * @param {ThreeScene} ThreeSceneClass - Clase de la escena 3D
     */
    async initialize(ThreeSceneClass) {
        if (this.isInitialized) return;

        this._cacheElements();
        
        // Crear instancia de la escena 3D
        if (ThreeSceneClass && this.elements.container) {
            this.scene = new ThreeSceneClass();
            window.threeScene = this.scene;
            I18nService.refresh3DPanels();
        }

        this._setupControls();
        this._setupStateListeners();
        this._setupEventListeners();

        this.isInitialized = true;
    }

    /**
     * Cachear elementos
     * @private
     */
    _cacheElements() {
        this.elements.container = document.getElementById('three-container');
        this.elements.enter3dBtn = document.getElementById('toggle-3d');
        this.elements.exit3dBtn = document.getElementById('exit-3d');
        this.elements.options3dBtn = document.getElementById('options-3d');
        this.elements.sectionNavButtons = document.querySelector('.section-nav-buttons');
    }

    /**
     * Configurar controles 3D
     * @private
     */
    _setupControls() {
        // Botón entrar a modo 3D
        this.elements.enter3dBtn?.addEventListener('click', () => {
            this.enter3DMode();
        });

        // Botón salir de modo 3D
        this.elements.exit3dBtn?.addEventListener('click', () => {
            this.exit3DMode();
        });

        // Botón opciones
        this.elements.options3dBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = StateManager.get('isOptionsOpen');
            StateManager.set('isOptionsOpen', !isOpen);
        });

        // Configurar botones de navegación de secciones
        const navButtons = this.elements.sectionNavButtons?.querySelectorAll('.section-nav-button');
        
        navButtons?.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const sectionId = button.dataset.section;
                if (sectionId) {
                    this.navigateToSection(sectionId);
                    StateManager.set('isOptionsOpen', false);
                }
            });
        });

        // Cerrar opciones al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!StateManager.get('isOptionsOpen')) return;
            
            if (!this.elements.sectionNavButtons.contains(e.target) && 
                !this.elements.options3dBtn.contains(e.target)) {
                StateManager.set('isOptionsOpen', false);
            }
        });
    }

    /**
     * Configurar listeners de estado
     * @private
     */
    _setupStateListeners() {
        // Reaccionar a cambios en isOptionsOpen
        StateManager.subscribe('isOptionsOpen', ({ newValue }) => {
            if (!this.elements.sectionNavButtons) return;

            if (newValue) {
                this.elements.sectionNavButtons.classList.add('active');
                this.elements.sectionNavButtons.style.display = 'flex';
                this.elements.sectionNavButtons.style.opacity = '1';
                this.elements.sectionNavButtons.style.visibility = 'visible';
                this.elements.sectionNavButtons.style.pointerEvents = 'auto';
            } else {
                this.elements.sectionNavButtons.classList.remove('active');
                this.elements.sectionNavButtons.style.display = 'none';
                this.elements.sectionNavButtons.style.opacity = '0';
                this.elements.sectionNavButtons.style.visibility = 'hidden';
                this.elements.sectionNavButtons.style.pointerEvents = 'none';
            }
        });

        // Escuchar eventos de navegación desde otros módulos
        EventBus.on(Config.events.SECTION_NAVIGATE, ({ section }) => {
            if (StateManager.get('is3DMode')) {
                this.navigateToSection(section);
            }
        });

        EventBus.on(Config.events.MODE_3D_TOGGLE, ({ mode }) => {
            if (mode) {
                this.enter3DMode();
            } else {
                this.exit3DMode();
            }
        });
    }

    /**
     * Configurar event listeners adicionales
     * @private
     */
    _setupEventListeners() {
        // Manejar redimensionamiento
        let resizeTimer;
        window.addEventListener('resize', () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            
            resizeTimer = setTimeout(() => {
                if (StateManager.get('is3DMode') && this.scene) {
                    this.scene.handleResize();
                }
            }, 250);
        });
    }

    /**
     * Entrar en modo 3D
     */
    enter3DMode() {
        if (StateManager.get('is3DMode')) return;

        StateManager.set({
            is3DMode: true,
            isOptionsOpen: false
        });

        // Ocultar todo menos el 3D
        document.body.classList.add('mode-3d-active');

        // Deshabilitar scroll
        document.body.style.overflow = 'hidden';

        // Configurar escena
        if (this.scene) {
            this.scene.resetScene();
            this.scene.setMode('fullscreen');
            
            setTimeout(() => {
                this.scene.handleResize();
            }, 100);
        }

        EventBus.emit(Config.events.MODE_3D_TOGGLE, { mode: true });
    }

    /**
     * Salir de modo 3D
     */
    exit3DMode() {
        if (!StateManager.get('is3DMode')) return;

        // Cerrar menú de opciones si está abierto
        if (StateManager.get('isOptionsOpen')) {
            StateManager.set('isOptionsOpen', false);
        }

        // Cerrar cualquier sección abierta
        if (this.scene) {
            this.scene.hideAllSectionOverlays();
        }

        StateManager.set({
            is3DMode: false,
            isOptionsOpen: false,
            currentSection: null
        });

        // Restaurar todo
        document.body.classList.remove('mode-3d-active');

        // Restaurar scroll
        document.body.style.overflow = '';

        // Configurar escena
        if (this.scene) {
            this.scene.setMode('normal');
            this.scene.resetScene();
            
            setTimeout(() => {
                this.scene.handleResize();
            }, 100);
        }

        EventBus.emit(Config.events.MODE_3D_TOGGLE, { mode: false });
    }

    /**
     * Navegar a una sección en modo 3D
     * @param {string} sectionId - ID de la sección
     */
    navigateToSection(sectionId) {
        if (!StateManager.get('is3DMode') || !this.scene) return;

        StateManager.set('currentSection', sectionId);
        this.scene.moveToTarget(sectionId);
    }

    /**
     * Obtener instancia de la escena
     * @returns {ThreeScene|null}
     */
    getScene() {
        return this.scene;
    }

    /**
     * Destruir módulo
     */
    destroy() {
        if (this.scene) {
            // Aquí podrías limpiar recursos de Three.js si es necesario
            this.scene = null;
        }
        this.isInitialized = false;
    }
}

// Exportar instancia singleton
export default new ThreeModule();

