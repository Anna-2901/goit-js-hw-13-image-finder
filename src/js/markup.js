
function renderMarkup(markup, place) {
  place.insertAdjacentHTML('beforeend', markup);
}

function galleryClr(place) {
  place.innerHTML = '';
}

export default { renderMarkup, galleryClr };
