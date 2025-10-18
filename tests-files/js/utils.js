// Utilitaires généraux
const Utils = {
    // Fonction pour formater une date
    formatDate: function(date) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString('fr-FR', options);
    },

    // Fonction pour valider un email
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Fonction pour générer un ID unique
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Fonction pour debounce
    debounce: function(func, wait) {
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
};

// Export pour les modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
