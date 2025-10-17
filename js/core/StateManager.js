/**
 * StateManager - Gestión de estado centralizada
 * Implementa patrón State con observadores reactivos
 */
import EventBus from './EventBus.js';

class StateManager {
    constructor() {
        this.state = {
            language: 'en',
            is3DMode: false,
            isOptionsOpen: false,
            currentSection: null,
            isLoading: true,
            isMobileMenuOpen: false
        };
        this.prevState = { ...this.state };
    }

    /**
     * Obtener el estado completo o una propiedad específica
     * @param {string} [key] - Clave específica
     * @returns {*} Estado o propiedad
     */
    get(key) {
        return key ? this.state[key] : { ...this.state };
    }

    /**
     * Actualizar el estado
     * @param {Object|string} updates - Objeto con actualizaciones o clave
     * @param {*} [value] - Valor si se pasa clave
     */
    set(updates, value) {
        this.prevState = { ...this.state };

        if (typeof updates === 'string') {
            this.state[updates] = value;
            this._notifyChange(updates, value, this.prevState[updates]);
        } else {
            Object.keys(updates).forEach(key => {
                const newValue = updates[key];
                const oldValue = this.state[key];
                
                this.state[key] = newValue;
                
                if (newValue !== oldValue) {
                    this._notifyChange(key, newValue, oldValue);
                }
            });
        }
    }

    /**
     * Notificar cambios de estado
     * @private
     */
    _notifyChange(key, newValue, oldValue) {
        EventBus.emit('state:changed', { key, newValue, oldValue });
        EventBus.emit(`state:${key}`, { newValue, oldValue });
    }

    /**
     * Suscribirse a cambios de estado
     * @param {string} key - Clave del estado
     * @param {Function} callback - Callback a ejecutar
     * @returns {Function} Función para desuscribirse
     */
    subscribe(key, callback) {
        return EventBus.on(`state:${key}`, callback);
    }

    /**
     * Resetear el estado a valores iniciales
     */
    reset() {
        this.set({
            is3DMode: false,
            isOptionsOpen: false,
            currentSection: null,
            isMobileMenuOpen: false
        });
    }
}

// Exportar instancia singleton
export default new StateManager();

