/**
 * Helpers - Utilidades generales
 */

/**
 * Debounce - Retrasa la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function}
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle - Limita la frecuencia de ejecución
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Tiempo límite en ms
 * @returns {Function}
 */
export function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Smooth scroll a un elemento
 * @param {HTMLElement|string} target - Elemento o selector
 * @param {number} [offset=0] - Offset en píxeles
 */
export function smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
    
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Verificar si un elemento está en el viewport
 * @param {HTMLElement} element - Elemento a verificar
 * @param {number} [threshold=0] - Porcentaje visible requerido (0-1)
 * @returns {boolean}
 */
export function isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    
    if (threshold > 0) {
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
        const visibleArea = visibleHeight * visibleWidth;
        const totalArea = rect.height * rect.width;
        
        return vertInView && horInView && (visibleArea / totalArea >= threshold);
    }
    
    return vertInView && horInView;
}

/**
 * Obtener valor de CSS custom property
 * @param {string} property - Nombre de la propiedad
 * @param {HTMLElement} [element=document.documentElement] - Elemento
 * @returns {string}
 */
export function getCSSVariable(property, element = document.documentElement) {
    return getComputedStyle(element).getPropertyValue(property).trim();
}

/**
 * Establecer valor de CSS custom property
 * @param {string} property - Nombre de la propiedad
 * @param {string} value - Valor
 * @param {HTMLElement} [element=document.documentElement] - Elemento
 */
export function setCSSVariable(property, value, element = document.documentElement) {
    element.style.setProperty(property, value);
}

/**
 * Wait/delay async
 * @param {number} ms - Milisegundos
 * @returns {Promise}
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formatear fecha
 * @param {Date|string} date - Fecha
 * @param {string} [locale='en-US'] - Locale
 * @param {object} [options] - Opciones de Intl.DateTimeFormat
 * @returns {string}
 */
export function formatDate(date, locale = 'en-US', options = {}) {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Detectar si es dispositivo móvil
 * @returns {boolean}
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detectar si es táctil
 * @returns {boolean}
 */
export function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

/**
 * Generar ID único
 * @returns {string}
 */
export function generateId() {
    return `_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp - Limitar un valor entre min y max
 * @param {number} value - Valor
 * @param {number} min - Mínimo
 * @param {number} max - Máximo
 * @returns {number}
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Lerp - Interpolación lineal
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} t - Factor (0-1)
 * @returns {number}
 */
export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

/**
 * Ease functions
 */
export const Easing = {
    // Sin easing, no aceleración
    linear: t => t,
    
    // Aceleración desde cero velocidad
    easeInQuad: t => t * t,
    
    // Desaceleración hasta velocidad cero
    easeOutQuad: t => t * (2 - t),
    
    // Aceleración hasta la mitad, desaceleración después
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    
    // Cubic
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};

