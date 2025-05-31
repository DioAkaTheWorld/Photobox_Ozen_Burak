import { loadResource } from './photoloader.js';

let currentGallery = null;

// Charge une page de la galerie (page = numéro de page, size = nombre d'images par page)
export function load(page = 1, size = 10) {
    const url = `/www/canals5/phox/api/photos/?page=${page}&size=${size}`;
    return loadResource(url)
        .then(data => {
            currentGallery = data;
            return currentGallery;
        });
}

// Charge la page suivante si elle existe
export function next() {
    if (!currentGallery || !currentGallery.links.next) {
        return Promise.reject(new Error("Pas de page suivante"));
    }
    return loadResource(currentGallery.links.next.href)
        .then(data => {
            currentGallery = data;
            return currentGallery;
        });
}

// Charge la page précédente si elle existe
export function prev() {
    if (!currentGallery || !currentGallery.links.prev) {
        return Promise.reject(new Error("Pas de page précédente"));
    }
    return loadResource(currentGallery.links.prev.href)
        .then(data => {
            currentGallery = data;
            return currentGallery;
        });
}

// Charge la première page si elle existe
export function first() {
    if (!currentGallery || !currentGallery.links.first) {
        return Promise.reject(new Error("Pas de première page disponible"));
    }
    return loadResource(currentGallery.links.first.href)
        .then(data => {
            currentGallery = data;
            return currentGallery;
        });
}

// Charge la dernière page si elle existe
export function last() {
    if (!currentGallery || !currentGallery.links.last) {
        return Promise.reject(new Error("Pas de dernière page disponible"));
    }
    return loadResource(currentGallery.links.last.href)
        .then(data => {
            currentGallery = data;
            return currentGallery;
        });
}
