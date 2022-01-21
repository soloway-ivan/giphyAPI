import { selectDOMElement } from './utils.js';

class Pagination {
  constructor() {
    const wrapper = selectDOMElement('#wrapper');
    this.wrapper = wrapper;

    const pagination =
      `
        <div class="pagination" id="pagination">
        </div>
      `;
    this.pagination = pagination;
    wrapper.insertAdjacentHTML('beforeend', pagination);
  }

  activeCurrentPageBtn(currentPage) {
    for (let i = 1; i <= 10; i++) {
      selectDOMElement(`div[data-numbering-id="${i}"]`).classList.remove('activePage');
    }
    selectDOMElement(`div[data-numbering-id="${currentPage}"]`).classList.add('activePage');
  }

  paginationCreator(list) {
    return selectDOMElement('#pagination').innerHTML = list;
  }

  paginationPageCreator(countOfGiphs) {
    let countOfPages = this.counterOfPaginationPages(countOfGiphs);

    for (let num = 1; num <= countOfPages; num++) {
      let paginationPage =
      `
        <div class="pagination__btn" id="pagination-page--${num}" data-numbering-id = ${num}>
          <div class="pagination__page">
            ${num}
          </div>
        </div>
      `;
      this.pagesList += paginationPage;
    }
    return this.pagesList;
  }

  counterOfPaginationPages(countOfGiphs) {
    if (countOfGiphs <= 100) {
      for (let i = 1; i <= 100; i++) {
        if (countOfGiphs === i) {
          const countOfPages = Math.ceil(countOfGiphs / 10)
          console.log(countOfPages);
          return countOfPages;
        }
      }
    }
    if (countOfGiphs === 0) {
      return countOfGiphs
    }
    if (countOfGiphs >= 100) {
      return 10;
    }
  }

  createPagination(countOfPaginationPages) {
    if (!selectDOMElement('#pagination-page--1')) {
      this.paginationPageCreator(countOfPaginationPages);
      const pagination = this.paginationCreator(this.pagesList);
      return pagination;
    }
  }
}

export { Pagination }