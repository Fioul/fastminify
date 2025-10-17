// Manipulation du DOM
const DOMHelper = {
    // Sélectionner un élément
    $: function(selector) {
        return document.querySelector(selector);
    },

    // Sélectionner plusieurs éléments
    $$: function(selector) {
        return document.querySelectorAll(selector);
    },

    // Créer un élément
    createElement: function(tag, attributes = {}, textContent = '') {
        const element = document.createElement(tag);

        // Ajouter les attributs
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });

        // Ajouter le contenu texte
        if (textContent) {
            element.textContent = textContent;
        }

        return element;
    },

    // Ajouter un event listener
    on: function(element, event, handler) {
        if (element && typeof handler === 'function') {
            element.addEventListener(event, handler);
        }
    },

    // Toggle une classe
    toggleClass: function(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    // Afficher/masquer un élément
    show: function(element) {
        if (element) {
            element.style.display = 'block';
        }
    },

    hide: function(element) {
        if (element) {
            element.style.display = 'none';
        }
    },

    // Animation fade in/out
    fadeIn: function(element, duration = 300) {
        if (element) {
            element.style.opacity = '0';
            element.style.display = 'block';

            let start = performance.now();

            function animate(time) {
                let elapsed = time - start;
                let progress = elapsed / duration;

                if (progress < 1) {
                    element.style.opacity = progress;
                    requestAnimationFrame(animate);
                } else {
                    element.style.opacity = '1';
                }
            }

            requestAnimationFrame(animate);
        }
    }
};

// Export pour les modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOMHelper;
}
