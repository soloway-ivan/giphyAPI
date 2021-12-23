import { selectDOMElement } from "./utils.js";
class SearchBar {
  updateSearchInputStyle() {
    const searchInput = selectDOMElement('#search-text')
    const searchBarWrapper = selectDOMElement('#search-bar-overlay')
    searchInput.style.width = 230 + 'px';
    searchInput.style.margin = '0px 40px 0px 15px';
    searchBarWrapper.style.display = 'none';
  }
}

export { SearchBar };