/**
 * I18nService - Servicio de internacionalización
 * Gestiona traducciones y cambio de idioma
 */
import Config from '../core/Config.js';
import EventBus from '../core/EventBus.js';
import StateManager from '../core/StateManager.js';
import StorageService from './StorageService.js';
import translations from '../data/translations.js';

class I18nService {
    constructor() {
        this.translations = translations;
        this.currentLanguage = this._getInitialLanguage();
        StateManager.set('language', this.currentLanguage);
    }

    /**
     * Obtener idioma inicial desde localStorage o navegador
     * @private
     * @returns {string}
     */
    _getInitialLanguage() {
        // Intentar obtener del storage
        const stored = StorageService.get(Config.i18n.storageKey);
        if (stored && Config.i18n.supportedLanguages.includes(stored)) {
            return stored;
        }

        // Detectar idioma del navegador
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.split('-')[0].toLowerCase();
        
        if (Config.i18n.supportedLanguages.includes(lang)) {
            return lang;
        }

        return Config.i18n.defaultLanguage;
    }

    /**
     * Obtener traducción por clave
     * @param {string} key - Clave en formato 'section.subsection.key'
     * @param {string} [lang] - Idioma (opcional, usa el actual por defecto)
     * @returns {*} Traducción
     */
    t(key, lang = this.currentLanguage) {
        const keys = key.split('.');
        let value = this.translations[lang];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value !== undefined ? value : key;
    }

    /**
     * Cambiar idioma
     * @param {string} lang - Código del idioma
     */
    setLanguage(lang) {
        if (!Config.i18n.supportedLanguages.includes(lang)) {
            console.error(`Language not supported: ${lang}`);
            return;
        }

        const prevLang = this.currentLanguage;
        this.currentLanguage = lang;
        
        // Guardar en storage
        StorageService.set(Config.i18n.storageKey, lang);
        
        // Actualizar estado
        StateManager.set('language', lang);
        
        // Emitir evento
        EventBus.emit(Config.events.LANGUAGE_CHANGED, { 
            language: lang, 
            prevLanguage: prevLang 
        });

        // Actualizar documento HTML
        this._updateDOM();
    }

    /**
     * Obtener idioma actual
     * @returns {string}
     */
    getLanguage() {
        return this.currentLanguage;
    }

    /**
     * Obtener idiomas soportados
     * @returns {string[]}
     */
    getSupportedLanguages() {
        return [...Config.i18n.supportedLanguages];
    }

    /**
     * Actualizar el DOM con las traducciones
     * @private
     */
    _updateDOM() {
        // Actualizar elementos con atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (typeof translation === 'string') {
                // Si contiene HTML tags, usar innerHTML, si no textContent
                if (translation.includes('<') && translation.includes('>')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Actualizar secciones dinámicas
        this._updateExperience();
        this._updateSkills();
        this._updateProjects();
        this._update3DPanels();

        // Actualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            
            if (typeof translation === 'string') {
                element.placeholder = translation;
            }
        });

        // Actualizar atributos title
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            
            if (typeof translation === 'string') {
                element.title = translation;
            }
        });

        // Actualizar lang del documento
        document.documentElement.lang = this.currentLanguage;
    }

    /**
     * Renderizar cabecera de empresa en timeline
     * @private
     */
    _renderJobHeader(job) {
        if (job.logo) {
            const alt = job.logoAlt || job.company;
            return `
                <div class="company-header">
                    <img src="${job.logo}" alt="${alt}" class="company-logo">
                    <h3>${job.role} - ${job.company}</h3>
                </div>
            `;
        }

        return `<h3>${job.role} - <strong>${job.company}</strong></h3>`;
    }

    /**
     * Actualizar etiquetas de paneles 3D
     */
    refresh3DPanels() {
        this._update3DPanels();
    }

    /**
     * Actualizar etiquetas de paneles 3D
     * @private
     */
    _update3DPanels() {
        const scene = window.threeScene;
        if (!scene?.updatePanelLabels) return;

        const labels = {};
        Object.keys(Config.three.targets).forEach(section => {
            labels[section] = this.t(`nav.${section}`);
        });

        scene.updatePanelLabels(labels);
    }

    /**
     * Actualizar sección de experiencia
     * @private
     */
    _updateExperience() {
        const timeline = document.querySelector('#experience .timeline');
        if (!timeline) return;
        
        const jobs = this.t('experience.jobs');
        if (!Array.isArray(jobs)) return;
        
        timeline.innerHTML = jobs.map(job => `
            <div class="timeline-item">
                <div class="timeline-content">
                    ${this._renderJobHeader(job)}
                    <span class="date">${job.period} | ${job.location}</span>
                    ${job.description ? `<p>${job.description}</p>` : ''}
                    ${job.highlights && job.highlights.length > 0 ? `
                        <ul>
                            ${job.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    /**
     * Actualizar sección de skills
     * @private
     */
    _updateSkills() {
        const skillsContainer = document.querySelector('#skills .skills');
        if (!skillsContainer) return;

        const categories = this.t('skills.categories');
        if (!categories || typeof categories !== 'object') return;

        skillsContainer.innerHTML = Object.values(categories).map(category => `
            <div class="skills-category">
                <h4>${category.title}</h4>
                <ul>
                    ${category.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    /**
     * Renderizar tarjeta de proyecto
     * @private
     */
    _renderProjectCard(project) {
        const imagePath = project.image || '';
        const inner = `
            ${imagePath ? `
            <div class="project-image">
                <img src="${imagePath}" alt="${project.title}" onerror="this.parentElement.style.display='none'">
            </div>
            ` : ''}
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;

        if (project.url) {
            return `
                <a class="project-card" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="${project.title}">
                    ${inner}
                </a>
            `;
        }

        return `<div class="project-card">${inner}</div>`;
    }

    /**
     * Actualizar sección de proyectos
     * @private
     */
    _updateProjects() {
        const projectsGrid = document.querySelector('#projects .projects-grid');
        if (!projectsGrid) return;
        
        const projects = this.t('projects.items');
        if (!Array.isArray(projects)) return;
        
        projectsGrid.innerHTML = projects.map(project => this._renderProjectCard(project)).join('');
    }

    /**
     * Inicializar traducciones en el DOM
     */
    initialize() {
        this._updateDOM();
    }
}

// Exportar instancia singleton
export default new I18nService();

