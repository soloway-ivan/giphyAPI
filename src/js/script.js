import { constants } from "./constants.js";
import { selectDOMElement } from "./utils.js";
import { GiphyService } from './GiphyService.js';
import { SearchBar } from './SearchBar.js';
import { giphsPages } from './giphsList.js';
import { Pagination } from "./Pagination.js";
import { Listeners } from "./Listeners.js";

class MainScriptJS {
  constructor() {
    const searchBar = new SearchBar(constants.searchInputWidth);
    this.searchBar = searchBar;

    const giphyService = new GiphyService();
    this.giphyService = giphyService;

    const pagination = new Pagination();
    this.pagination = pagination;
    const listeners = new Listeners();
    this.listeners = listeners;

    this.giphsPages = giphsPages;

    let currentStep = 1;
    this.currentStep = currentStep;
    const textInput = selectDOMElement('#search-text');
    this.textInput = textInput;
    const giphsList = selectDOMElement('#giphs-list');
    this.giphsList = giphsList;

    this.getCommands();
  };

  stepUpdates() {
    this.giphyService.onStepUpdate((step) => {
      this.currentStep = step;
    });
  };

  getValue() {
    return this.currentStep;
  };

  checkRequest(giphs) {
    if (giphs === constants.emptyRequest) {
      alert(constants.tryToWriteSmth);
      return false;
    };

    if (giphs === constants.tryToEnterSmth) {
      alert(constants.tryToEnterSmth);
      return false;
    } else {
      return true;
    };
  };

  updatePage(value) {
    console.log(value);
    this.giphyService.updateGiphsPage(`${this.giphsPages[value]}`);
  };

  checkGiphsPages() {
    let page = Object.keys(this.giphsPages);
    for (let key of page) {
      if (key == this.getValue())
        return constants.useAlreadyCreatedPage;
    };
  };

  async getPageOfGiphs() {
    const giphs = await this.giphyService.getGiphs(this.textInput, this.getValue());
    if (!this.checkRequest(giphs)) {
      return false;
    };
    const giphsList = giphs.generatedGiphs;
    return [this.giphsPages[`${this.getValue()}`] = giphsList, giphs.giphsCount];
  };

  resetGiphsPages() {
    for (const prop of Object.keys(this.giphsPages)) {
      delete this.giphsPages[prop];
    };
    return;
  };

  async getGiphs(param) {
    if (param === constants.newRequest) {
      this.resetGiphsPages();
      if (!await this.getPageOfGiphs()) {
        return false;
      } else {
        this.pagination.createPagination(1000);
        this.listeners.addListenersOnPagination();
        this.updatePage(this.getValue());
      };
    };

    if (this.checkGiphsPages() === constants.useAlreadyCreatedPage) {
      this.giphyService.buttonsActiveController(this.getValue());
      this.updatePage(this.getValue());
    };

    if (param) {
      if (!await this.getPageOfGiphs()) {
        return false;
      } else {
        this.updatePage(this.getValue());
      };
    };
    this.pagination.activeCurrentPageBtn(this.getValue())
  };

  updateGiphsPage() {
  }

  updateStep(step) {
    if (step === constants.nextPage) {
      this.currentStep++;
      if (this.currentStep >= constants.MAXSTEP) {
        this.currentStep = constants.MAXSTEP;
      };
      return this.getGiphs(this.currentStep);
    };

    if (step === constants.previousPage) {
      this.currentStep--;
      if (this.currentStep === 0) {
        return false;
      };
      if (this.currentStep <= constants.MINSTEP) {
        this.currentStep = constants.MINSTEP;
      };
      return this.getGiphs(this.currentStep);
    };
  };

  getCommands() {
    this.listeners.setCurrentCommand((step) => {
      switch (step) {
        case constants.openSesame:
          return this.searchBar.updateSearchInputStyle();
          break;
        case constants.search:
          this.currentStep = 1;
          return this.getGiphs(constants.newRequest);
          break;
        case constants.nextPage:
        case constants.previousPage:
          return this.updateStep(step);
        case step :
          this.currentStep = step;
          return this.getGiphs(step);
      };
    });
  };
};

new MainScriptJS();