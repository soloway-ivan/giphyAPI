import { selectDOMElement } from "./utils.js";
class SearchBar {
  constructor(value) {
    const wrapper = selectDOMElement("#wrapper");

    this.value = value;

    const searchSystem = ` 
      <div class="search-system" id="search-system">
        <div class="search-bar" id="search-bar">
          <input class="search-bar__input" id="search-text" type="search" placeholder="Search...">
          <button class ="search-bar__icon" id="search-btn">
            <img src="https://i.ibb.co/d5rcTzD/icons8-magnifying-glass-64.png" alt="search-icon" class ="search-bar__img">
          </button>
          <div class="search-bar__overlay" id="search-bar-overlay"></div>
        </div>
      </div>
    `
    wrapper.innerHTML += searchSystem;
  }

  updateSearchInputStyle() {
    const searchInput = selectDOMElement('#search-text')
    const searchBarWrapper = selectDOMElement('#search-bar-overlay')
    searchInput.style.width = this.value + 'px';
    searchInput.style.margin = '0px 40px 0px 15px';
    searchBarWrapper.style.display = 'none';
  }
}

export { SearchBar };