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
        this._updateProjects();

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
                    ${job.company === 'PolygonalMind' || job.company === 'Polygonal Mind' ? 
                        `<div class="company-header">
                            <img src="images/polygonal_mind_logo.jpg" alt="Polygonal Mind Logo" class="company-logo">
                            <h3>${job.role} - ${job.company}</h3>
                        </div>` :
                    job.company === 'esPublico Tecnología' ? 
                        `<div class="company-header">
                            <img src="images/espublico_tech_logo.jpg" alt="esPublico Logo" class="company-logo">
                            <h3>${job.role} - ${job.company}</h3>
                        </div>` :
                    job.company === 'MedUX' ? 
                        `<div class="company-header">
                            <img src="images/meduxjpg.jpg" alt="MedUX Logo" class="company-logo">
                            <h3>${job.role} - ${job.company}</h3>
                        </div>` :
                    job.company === 'Tessera Studios' ? 
                        `<div class="company-header">
                            <img src="images/tesserajpg.jpg" alt="Tessera Studios Logo" class="company-logo">
                            <h3>${job.role} - ${job.company}</h3>
                        </div>` :
                    `<h3>${job.role} - <strong>${job.company}</strong></h3>`}
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
     * Actualizar sección de proyectos
     * @private
     */
    _updateProjects() {
        const projectsGrid = document.querySelector('#projects .projects-grid');
        if (!projectsGrid) return;
        
        const projects = this.t('projects.items');
        if (!Array.isArray(projects)) return;
        
        projectsGrid.innerHTML = projects.map(project => {
            // Determinar la imagen del proyecto desde URLs externas
            let imagePath = '';
            if (project.title === 'VIPE Platform') {
                imagePath = 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*DTn5k1-XaBaiO0y3ZJSRyQ.jpeg';
            } else if (project.title === 'Avatar Webcam') {
                imagePath = 'images/avatar_webcam.jpg';
            } else if (project.title === 'Intruders: Hide and Seek') {
                imagePath = 'https://i.ytimg.com/vi/UjBUxNE7N4w/maxresdefault.jpg';
            } else if (project.title === 'YetiRush') {
                imagePath = 'https://pbs.twimg.com/profile_banners/1189135826980167681/1695047200/600x200';
            } else if (project.title === 'Zizeron AI') {
                imagePath = 'images/zizeron.png';
            }
            
            return `
                <div class="project-card">
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
                </div>
            `;
        }).join('');
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

