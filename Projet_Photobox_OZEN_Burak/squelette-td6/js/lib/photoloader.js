// js/lib/photoloader.js
import { API_BASE_URL } from './config.js';

// Chargement d'une image depuis l'API avec son id
export const loadPicture = (idPicture) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_BASE_URL}/photos/${idPicture}`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération :", error.message);
                reject(error);
            });
    });
};


export function loadResource(uri) {
    const completeUrl = `https://webetu.iutnc.univ-lorraine.fr${uri}`;
    return fetch(completeUrl, { credentials: 'include' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status} lors du chargement de ${uri}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error(`Erreur lors du chargement de la ressource ${uri}:`, error);
            throw error;
        });
}

export function loadPhotoList(page = 1, size = 10) {
    const uri = `/photos/?page=${page}&size=${size}`;
    return loadResource(uri);
}
