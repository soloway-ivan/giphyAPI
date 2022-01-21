import { selectDOMElement } from "./utils.js";
import { constants } from "./constants.js";

class Listeners {
  constructor() {
    const searchBtn = selectDOMElement('#search-btn');
    const searchBarOverlay = selectDOMElement('#search-bar-overlay');
    const buttonNext = selectDOMElement("#button-nextSlide");
    const buttonPrevious = selectDOMElement("#button-previousSlide");
    const paginationPages = selectDOMElement('#pagination');

    this.searchBtn = searchBtn;
    this.searchBarOverlay = searchBarOverlay;
    this.buttonNext = buttonNext;
    this.buttonPrevious = buttonPrevious;
    this.paginationPages = paginationPages;

    this.addListenerSearchBarOverlay(this.searchBarOverlay);
    this.addListenerSearchBtn(searchBtn);
    this.addListenersOnPaginationButtons(buttonNext, buttonPrevious);
    this.addListenersOnPagination(paginationPages);
  };

  getCommand = () => { };

  setCurrentCommand = (cb) => {
    this.getCommand = cb;
  };

  addListenersOnPaginationButtons(buttonNext, buttonPrevious) {
    buttonNext.addEventListener('click', () => {
      this.getCommand(constants.nextPage);
    });
    buttonPrevious.addEventListener('click', () => {
      this.getCommand(constants.previousPage);
    });
  };

  addListenerSearchBtn(searchBtn) {
    searchBtn.addEventListener('click', () => {
      this.getCommand(constants.search);
    });
  };

  addListenerSearchBtn(searchBtn) {
    searchBtn.addEventListener('click', () => {
      this.getCommand(constants.search);
    });
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.getCommand(constants.search);
      }
    });
  };


  addListenerSearchBarOverlay(searchBarOverlay) {
    searchBarOverlay.addEventListener('click', () => {
      this.getCommand(constants.openSesame);
    });
  };

  addListenersOnPagination() {
    const pagination = selectDOMElement('#pagination');
    for (let page = 0; page <= pagination.children.length - 1; page++) {
      let paginationPage = pagination.children[page];

      paginationPage.addEventListener('click', () => {
        this.getCommand(Number(paginationPage.dataset.numberingId));
      });
    };
  };
};

export { Listeners };