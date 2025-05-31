export function display_galerie(gallery) {
    const container = document.getElementById('gallery_container');
    let html = '';
    gallery.photos.forEach(({ photo }) => {
        html += `
          <div class="photo-thumb" data-photoId="${photo.id}">
            <img src="https://webetu.iutnc.univ-lorraine.fr${photo.thumbnail.href}" alt="${photo.titre}">
            <p>${photo.titre}</p>
          </div>
        `;
    });
    container.innerHTML = html;

    container.querySelectorAll('.photo-thumb').forEach(div => {
        div.addEventListener('click', () => {
            const photoId = div.getAttribute('data-photoId');
            // On déclenche un événement personnalisé ou callback
            if (typeof window.onPhotoClick === 'function') {
                window.onPhotoClick(photoId);
            }
        });
    });
}
