import refs from '../js/refs.js';
const basicLightbox = require('basiclightbox');
const {
  galleryListRef,
  modalContainer,
  modalCloseBtn,
  modalImageElement,
  overlay,
} = refs;

const galleryModal = basicLightbox.create(modalImageElement);

galleryListRef.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const originalImageSource = event.target.dataset.source;
  modalImageElement.setAttribute('src', originalImageSource);

  galleryModal.show();

  modalContainer.classList.add('is-open');

  window.addEventListener('keydown', onPressEscape);
}

function closeModal() {
  if (event.target.nodeName === 'IMG') {
    return;
  }

  modalImageElement.setAttribute('src', '');
  modalContainer.classList.remove('is-open');

  galleryModal.close();

 
  window.removeEventListener('keydown', onPressEscape);
}


function onPressEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
