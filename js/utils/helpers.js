/**
 * Helpers - Utilidades compartidas
 */

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
 * Wait/delay async
 * @param {number} ms - Milisegundos
 * @returns {Promise<void>}
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
