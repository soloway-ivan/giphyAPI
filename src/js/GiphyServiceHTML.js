import { selectDOMElement } from './utils.js';

class GiphyServiceHTML {
  constructor() {
    const wrapper = selectDOMElement("#wrapper");
    const giphyService = `
      <div class="giphy-service">
        <div class="carousel">
          <button class="button button-left">
            <div class="button__arrow-left"></div>
          </button>
          <div class="giphs">
            <div class="giphs-list">
              <div class="current-giph"></div>
            </div>
          </div>
          <button class="button button-right">
            <div class="button__arrow-right"></div>
          </button>
        </div>
      </div>
    `;

    wrapper.innerHTML += giphyService;
  }
}

export { GiphyServiceHTML }