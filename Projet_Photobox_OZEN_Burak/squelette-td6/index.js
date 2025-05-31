import { loadPicture } from './js/lib/photoloader.js';
import { displayCategory, displayPicture, displayComments } from './js/lib/ui.js';
import { load, next, prev, first, last } from './js/lib/gallery.js';
import { display_galerie } from './js/lib/gallery_ui.js';

// Fonction principale pour récupérer et afficher la photo, catégorie et commentaires
function getPicture(id) {
    loadPicture(id)
        .then(photoData => {
            console.log(`Titre: ${photoData.photo.titre}`);
            console.log(`Type: ${photoData.photo.type}`);
            console.log(`URL: ${photoData.photo.file}`);

            // Affiche la photo
            displayPicture(photoData.photo);

            // Charge catégorie et commentaires en parallèle
            return Promise.all([
                getCategory(photoData),
                getComments(photoData)
            ]);
        })
        .then(([categoryData, commentsData]) => {
            displayCategory(categoryData);
            displayComments(commentsData);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
}

// Récupère l’ID de l’URL (#105 → 105), sinon 105 par défaut
const handleHash = () => {
    let id = 105;
    if (window.location.hash) {
        const hashValue = parseInt(window.location.hash.substring(1));
        if (!isNaN(hashValue)) {
            id = hashValue;
        }
    }
    getPicture(id);
};

// Charge les données de la catégorie via l’URL retournée dans links
export const getCategory = (photoData) => {
    const categoryUrl = "https://webetu.iutnc.univ-lorraine.fr" + photoData.links.categorie.href;
    return fetch(categoryUrl, { credentials: 'include' })
        .then(response => {
            if (!response.ok) throw new Error("Erreur HTTP pour la catégorie");
            return response.json();
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de la catégorie :", error);
            throw error;
        });
};

// Charge les commentaires via l’URL retournée dans links
export const getComments = (photoData) => {
    const commentsUrl = "https://webetu.iutnc.univ-lorraine.fr" + photoData.links.commentaires.href;
    return fetch(commentsUrl, { credentials: 'include' })
        .then(response => {
            if (!response.ok) throw new Error("Erreur HTTP pour les commentaires");
            return response.json();
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des commentaires :", error);
            throw error;
        });
};

const btnLoadGallery = document.getElementById('loadGalleryBtn');

btnLoadGallery.addEventListener('click', () => {
    load(1, 10)  // charge la première page avec 10 photos
        .then(gallery => {
            display_galerie(gallery);
        })
        .catch(error => {
            console.error("Erreur lors du chargement de la galerie :", error);
        });
});

window.onPhotoClick = function(photoId) {
    loadPicture(photoId)
        .then(photoData => {
            displayPicture(photoData.photo);
        })
        .catch(err => console.error('Erreur chargement photo:', err));
};

// Charger la galerie initiale quand on clique sur le bouton "Charger la galerie"
document.getElementById('loadGalleryBtn').addEventListener('click', () => {
    load() // charge page 1 par défaut
        .then(gallery => {
            display_galerie(gallery);
        })
        .catch(err => console.error(err));
});

// Charger la page précédente
document.getElementById('prevBtn').addEventListener('click', () => {
    prev()
        .then(gallery => {
            display_galerie(gallery);
        })
        .catch(err => alert(err.message));  // par exemple alerte si pas de page précédente
});

// Charger la page suivante
document.getElementById('nextBtn').addEventListener('click', () => {
    next()
        .then(gallery => {
            display_galerie(gallery);
        })
        .catch(err => alert(err.message));  // alerte si pas de page suivante
});

// Navigation première page
document.getElementById('firstBtn').addEventListener('click', () => {
    first()
        .then(gallery => display_galerie(gallery))
        .catch(err => alert(err.message));
});

// Navigation dernière page
document.getElementById('lastBtn').addEventListener('click', () => {
    last()
        .then(gallery => display_galerie(gallery))
        .catch(err => alert(err.message));
});

window.addEventListener('DOMContentLoaded', handleHash);
window.addEventListener('hashchange', handleHash);
