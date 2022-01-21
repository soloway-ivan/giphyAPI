import { selectDOMElement } from './utils.js';
import { constants } from './constants.js';

class GiphyService {
  constructor() {
    const wrapper = selectDOMElement("#wrapper");
    this.wrapper = wrapper;

    const giphyService = `
      <div class="giphy-service" id="giphy-service" style="display: none">
        <div class="carousel">
          <button class="button button-left hover" id="button-previousSlide">
            <div class="button__arrow-left">PREV</div>
          </button>
          <div class="giphs" id="giphs">
            <div class="giphs__page" id="giphs-page">
            </div>
            <div class="loading-spinner" id="loading-spinner">
              <div class="loading-spinner__item" id="loading-spinner-item"></div>
            </div>
          </div>
          <button class="button button-right hover" id="button-nextSlide">
            <div class="button__arrow-right">NEXT</div>
          </button>
        </div>
      </div>
    `;
    this.giphyService = giphyService;
    this.generateGiphyService();

    this.buttonsActiveController();
  };
  
  generateGiphyService() {
    return this.wrapper.insertAdjacentHTML('beforeend', this.giphyService);
  };

  stepChangeCB() { }

  onStepUpdate = (cb) => {
    this.stepChangeCB = cb;
  };

  buttonsActiveController(step) {
    const btnPrev = selectDOMElement('#button-previousSlide');
    const btnNext = selectDOMElement('#button-nextSlide');
    if (step !== 10 && step !== 1) {
      btnPrev.classList.remove('disActiveButton');
      btnNext.classList.remove('disActiveButton');
      btnNext.classList.add('hover');
      btnPrev.classList.add('hover');
    }
    if (step === 1) {
      btnPrev.classList.remove('hover');
      btnPrev.classList.add('disActiveButton');
  
      btnNext.classList.remove('disActiveButton');
      btnNext.classList.add('hover');

    }
    if (step === 10) {
      btnPrev.classList.add('hover');
      btnNext.classList.remove('hover');
      btnNext.classList.add('disActiveButton');
      btnPrev.classList.remove('disActiveButton');
    }
  }

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


  getStatusOfLoadingGiphs() {
    const listOfGiphsWrapper = selectDOMElement('#giphs-page').children;
    let statusLoading = [];

    for (let index = 0; index <= listOfGiphsWrapper.length - 1; index++) {
      statusLoading.push(listOfGiphsWrapper[index].childNodes[1].complete)
    }

    return statusLoading;
  }

  checkStatusOfLoading(src) {
    const areLoaded = (element) => {
      return element === true;
    }
    if (src.every(areLoaded)) {
      return constants.loadingComplete;
    }
  }

  checkImgsLoading() {
    const imageInterval = setInterval(() => {
      let statusLoading = this.getStatusOfLoadingGiphs()

      if (this.checkStatusOfLoading(statusLoading) === constants.loadingComplete) {
        selectDOMElement('#loading-spinner').style.opacity = 0;
        clearInterval(imageInterval); //this
      }
    }, 50)
  }

  updateGiphsPage(giphs) {
    selectDOMElement("#giphs-page").innerHTML = giphs;
    selectDOMElement('#loading-spinner').style.opacity = 1;
    this.checkImgsLoading()
  };

  getURLForResponse(API, textInput, page) {
    const offset = page * 10;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API}&limit=10&offset=${offset}&q=${this.getRequestText(textInput)}`;
    return url;
  };

  async getResponse(url) {
    let response;
    try {
      response = await fetch(url);
    } catch(err) {
      alert(constants.smthWentWrong)
    }
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
    this.buttonsActiveController(page)

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