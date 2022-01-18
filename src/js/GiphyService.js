import { selectDOMElement } from './utils.js';
import { constants } from './constants.js';

class GiphyService {
  constructor() {
    const wrapper = selectDOMElement("#wrapper");
    this.wrapper = wrapper;

    const giphyService = `
      <div class="giphy-service" id="giphy-service" style="display: none">
        <div class="carousel">
          <button class="button button-left" id="button-previousSlide">
            <div class="button__arrow-left">PREV</div>
          </button>
          <div class="giphs" id="giphs">
            <div class="giphs__page" id="giphs-page">
            </div>
            <div class="giphs__loading-overlay" id="giphs-loading-overlay"></div>
          </div>
          <button class="button button-right" id="button-nextSlide">
            <div class="button__arrow-right">NEXT</div>
          </button>
        </div>
      </div>
    `;
    this.giphyService = giphyService;
    this.generateGiphyService();
  };
  
  generateGiphyService() {
    return this.wrapper.insertAdjacentHTML('beforeend', this.giphyService );
  };

  // getCurrentStep() {
  //   return this.step;
  // };


  // setCurrentStep = (cb) => {
  //   const value = cb;
  // };
  stepChangeCB() { }

  onStepUpdate = (cb) => {
    this.stepChangeCB = cb;
  };

  showGiphyService() {
    selectDOMElement("#giphy-service").style.display = "flex";
  };

  getRequestText(textInput) {
    let str = textInput.value.trim();
    return str;
  };

  checkInputText(textInput) {
    return textInput.value !== '';
  };

  updateGiphsPage(giphs) {
    selectDOMElement('#giphs-loading-overlay').style.opacity = 0;
    return selectDOMElement("#giphs-page").innerHTML = giphs;
  };

  getURLForResponse(API, textInput, page) {
    const offset = page * 10;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API}&limit=10&offset=${offset}&q=${this.getRequestText(textInput)}`;
    return url;
  };

  async getResponse(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };


  updateGiphsGallery(content) {
    let giphsGallery = {};

    for (let i in content) {
      let obj = {
        'title': content[i].title,
        'height': content[i].images.downsized.height,
        'width': content[i].images.downsized.width,
        'url': content[i].images.downsized.url
      }
      giphsGallery[`${Number(i)+1}`] = obj;
    }
    return giphsGallery;
  };

  generateGiphs(giphsList) {
    let string = '';
    for (const key in giphsList) {
      let img = `
        <div class="giphs__wrapper">
          <img src="${giphsList[key].url}" alt="Giph" class="giphs__item" id="giphs-item"></img>
        </div>
      `;
      string += img
    }
    console.log(string);
    return string
  }

  newRequest(param) {
    if (param === constants.newRequest) {
      return constants.newRequest;
    }
  };

  async getGiphs(textInput, page) {
    if (!this.checkInputText(textInput)) {
      return constants.emptyRequest;
    };

    const url = this.getURLForResponse(constants.API, textInput, page);
    const response = await this.getResponse(url);

    if(response.data.length === 0) {
      return constants.tryToEnterSmth;
    };

    const {data, pagination} = response;

    const content = data;
    const giphsCount = pagination.total_count;
    const giphsList = this.updateGiphsGallery(content);
    const generatedGiphs = this.generateGiphs(giphsList);
    this.showGiphyService()

    return {
      generatedGiphs,
      giphsCount
    };
  };
};


export { GiphyService };











 // activeCurrentPage(value) {
  //   const giphsList = selectDOMElement("#giphs-page");
  //   this.giphsList = giphsList;
  //   selectDOMElement(`#giphs-page--${value}`).classList.remove('hidden');

  //   for (let i = 1; i <= this.giphsList.children.length; i++) {
  //     if (i !== value) {
  //       if (!selectDOMElement(`#giphs-page--${i}`).classList.contains('hidden')) {
  //         selectDOMElement(`#giphs-page--${i}`).classList.add('hidden');
  //       };
  //     };
  //   };
  // };

  // createGiphsPage(page) {
  //   let newGiphsPage =
  //     `
  //     <div class="giphs__page hidden" id="giphs-page--${page}"></div>
  //   `;
  //   // return selectDOMElement("#giphs-list").insertAdjacentHTML('beforeend', newGiphsPage);
  //   return selectDOMElement("#giphs-list").innerHTML =  newGiphsPage;
  // };



    // getGiphsPage(page) {
  //   const giphsPage = selectDOMElement(`#giphs-page--${page}`);
  //   return giphsPage;
  // };

  // generatePageOfGiphs(giphs, page) {
  //   if (this.wrapper.contains(selectDOMElement(`#giphs-page--${page}`))) {
  //     return false;
  //   }

  //   if (selectDOMElement("#giphy-service") !== null) {
  //     this.createGiphsPage(page);
  //     this.showGiphyService();

  //     this.activeCurrentPage(page);

  //     // return this.getGiphsPage(page).insertAdjacentHTML('beforeend', giphs);
  //     return this.getGiphsPage(page).innerHTML = giphs;
  //   };
  //   // this.wrapper.insertAdjacentHTML('beforeend', this.getGiphsPage(page));
  //   this.wrapper.innerHTML =  this.getGiphsPage(page);
  // };