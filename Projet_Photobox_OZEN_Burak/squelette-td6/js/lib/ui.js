import Handlebars from 'handlebars';

// Affiche la photo dans #la_photo avec Handlebars
export const displayPicture = (photoData) => {
    const templateSource = document.querySelector('#photoTemplate').innerHTML;
    const template = Handlebars.compile(templateSource);
    const data = {
        titre: photoData.titre,
        descr: photoData.descr,
        type: photoData.type,
        width: photoData.def.width,
        height: photoData.def.height,
        fileUrl: "https://webetu.iutnc.univ-lorraine.fr" + photoData.url.href
    };
    const html = template(data);
    const container = document.querySelector('#la_photo');
    container.innerHTML = html;
};

// Affiche le nom de la catégorie dans #la_categorie
export function displayCategory(categoryData) {
    const categoryElement = document.querySelector('#la_categorie');
    categoryElement.textContent = `catégorie : ${categoryData.nom}`;
}

// Affiche la liste des commentaires dans #les_commentaires
export function displayComments(commentsData) {
    const ul = document.getElementById('les_commentaires');
    ul.innerHTML = '';
    commentsData.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = `${comment.pseudo} : ${comment.contenu}`;
        ul.appendChild(li);
    });
}


export function displayGallery(photoCollection) {
    const templateSource = document.querySelector('#galleryTemplate').innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template(photoCollection); // photoCollection doit contenir un tableau "photos"
    const container = document.querySelector('#gallery_container'); // prévoir un div avec cet id
    container.innerHTML = html;
}