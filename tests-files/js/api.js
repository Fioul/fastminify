// Gestion des appels API
class ApiClient {
    constructor(baseURL = 'https://api.example.com') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    // Méthode GET
    async get(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers: { ...this.defaultHeaders, ...options.headers },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    // Méthode POST
    async post(endpoint, data, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: { ...this.defaultHeaders, ...options.headers },
                body: JSON.stringify(data),
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    // Méthode pour gérer les erreurs
    handleError(error) {
        console.error('API Error:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

// Instance par défaut
const apiClient = new ApiClient();
