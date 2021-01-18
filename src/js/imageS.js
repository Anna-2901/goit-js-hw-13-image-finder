
import refs from './refs.js';
import photoCard from '../templates/photoCard.hbs';
import pixabayApi from './apiService.js';
import markupApi from './markup.js';
import loadMoreBtnApi from './loadMoreBtn.js';


const { galleryListRef, searchFormRef, loadMoreBtnRef } = refs;
const {  renderMarkup, galleryClr } = markupApi;

loadMoreBtnApi.hide();

searchFormRef.addEventListener('submit', onImageSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);


function showSearchResult() {
  pixabayApi
    .fetchImages()
    .then(dataArray => photoCard(dataArray))
    .then(markup => {
       renderMarkup(markup, galleryListRef);
      if (pixabayApi.pageNumber > 2) {
        window.scrollBy({
          top: window.innerHeight - 110,
          behavior: 'smooth',
        });
      }
      if (pixabayApi.isLastPage) {
        loadMoreBtnApi.hide();
      } else {
        loadMoreBtnApi.show();
        loadMoreBtnApi.enable();
      }
    })
}

function onImageSearch(event) {
  event.preventDefault();

  pixabayApi.query = searchFormRef.elements.query.value;

  galleryClr(galleryListRef);
  pixabayApi.resetPage();

  showSearchResult();

  searchFormRef.reset();
}

function onLoadMore() {
  loadMoreBtnApi.disable();
  showSearchResult();
}
