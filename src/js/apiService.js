const apiKey = '19922500-0aa846c7df203c993f2ecb489';
const BASE_URL = 'https://pixabay.com/api/';

export default {
  searchQuery: '',
  pageNumber: 1,
  perPage: 12,
  totalPage: 0,
  isLastPage: false,

  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.perPage}&key=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits, totalHits }) => {
        this.totalPage = Math.ceil(totalHits / this.perPage);

        
        if (this.totalPage === this.pageNumber) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
        if (this.incrementPage());
        return hits;
      });
  },
  resetPage() {
    this.pageNumber = 1;
  },
  incrementPage() {
    this.pageNumber += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  },
};
