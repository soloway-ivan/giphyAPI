import { selectDOMElement } from './utils.js';

class SearchSystemHTML {
  constructor() {
    const wrapper = selectDOMElement("#wrapper");

  const searchSystem = ` 
    <div class="search-system" id="search-system">
      <div class="search-bar__wrapper" id="search-bar-wrapper"></div>
      <div class="search-bar" id="search-bar">
        <input class="search-bar__input" id="search-text" type="search" placeholder="Search...">
        <button class ="search-bar__icon" id="search-btn">
          <img src="https://i.ibb.co/d5rcTzD/icons8-magnifying-glass-64.png" alt="search-icon" class ="search-bar__img">
        </button>
      </div>
    </div>
  `
    wrapper.innerHTML += searchSystem;
  }
}

export { SearchSystemHTML }