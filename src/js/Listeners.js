import { selectDOMElement } from "./utils.js";

class Listeners {
  constructor() {
    const searchBtn = selectDOMElement('#search-btn');
    const searchBarOverlay = selectDOMElement('#search-bar-overlay');
    const buttonNext = selectDOMElement("#button-nextSlide");
    const buttonPrevious = selectDOMElement("#button-previousSlide");

    this.searchBtn = searchBtn;
    this.searchBarOverlay = searchBarOverlay;
    this.buttonNext = buttonNext;
    this.buttonPrevious = buttonPrevious;

    let getCommand = () => {};
    this.getCommand = getCommand;

    this.addListenerSearchBarOverlay(this.searchBarOverlay);
    this.addListenerSearchBtn(searchBtn)
    this.addEventListenersOnPagination(buttonNext, buttonPrevious)
  }

  setCurrentCommand = (cb) => {
    this.getCommand = cb
  }

  addEventListenersOnPagination(buttonNext, buttonPrevious) {
    buttonNext.addEventListener('click', () => {
      this.getCommand('NextPage')
    })
    buttonPrevious.addEventListener('click', () => {
      this.getCommand('PreviousPage')
    })
  }

  addListenerSearchBtn(searchBtn) {
    searchBtn.addEventListener('click', () => {
      this.getCommand('Search')
    })
  }

  addListenerSearchBarOverlay(searchBarOverlay) {
    searchBarOverlay.addEventListener('click', () => {
      this.getCommand('Open sesame!')
    })
  }
}

export { Listeners }