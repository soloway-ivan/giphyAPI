import { selectDOMElement } from './utils.js';

class GiphyServiceHTML {
  constructor() {
    const wrapper = selectDOMElement("#wrapper");
    const giphyService = `
      <div class="giphy-service">
        <div class="carousel">
          <button class="button button-left id="button-previousSlide">
            <div class="button__arrow-left"></div>
          </button>
          <div class="giphs" id="giphs">
            <div class="giphs__list">
              <div class="giphs__list__item"></div>
            </div>
          </div>
          <button class="button button-right" id="button-nextSlide">
            <div class="button__arrow-right"></div>
          </button>
        </div>
      </div>
    `;
    wrapper.innerHTML += giphyService;
  }
}

export { GiphyServiceHTML }