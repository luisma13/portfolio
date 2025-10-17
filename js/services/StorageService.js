/**
 * StorageService - Wrapper para localStorage con manejo de errores
 */
class StorageService {
    constructor() {
        this.isAvailable = this._checkAvailability();
    }

    /**
     * Verificar si localStorage está disponible
     * @private
     * @returns {boolean}
     */
    _checkAvailability() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('localStorage not available:', e);
            return false;
        }
    }

    /**
     * Guardar un valor en localStorage
     * @param {string} key - Clave
     * @param {*} value - Valor (se serializará a JSON)
     * @returns {boolean} Success
     */
    set(key, value) {
        if (!this.isAvailable) return false;
        
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    }

    /**
     * Obtener un valor de localStorage
     * @param {string} key - Clave
     * @param {*} [defaultValue] - Valor por defecto
     * @returns {*} Valor deserializado
     */
    get(key, defaultValue = null) {
        if (!this.isAvailable) return defaultValue;
        
        try {
            const serialized = localStorage.getItem(key);
            if (serialized === null) return defaultValue;
            
            return JSON.parse(serialized);
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    }

    /**
     * Eliminar un valor de localStorage
     * @param {string} key - Clave
     * @returns {boolean} Success
     */
    remove(key) {
        if (!this.isAvailable) return false;
        
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }

    /**
     * Limpiar todo el localStorage
     * @returns {boolean} Success
     */
    clear() {
        if (!this.isAvailable) return false;
        
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    }
}

// Exportar instancia singleton
export default new StorageService();

