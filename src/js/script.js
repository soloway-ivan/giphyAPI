import { constants } from "./constants.js";
import { selectDOMElement } from "./utils.js";
import { GiphyService } from './GiphyService.js';
import { SearchBar } from './SearchBar.js';
import { giphsPages } from './giphsList.js';
// import { Pagination } from "./Pagination.js"; WIP
import { Listeners } from "./Listeners.js";

const searchBar = new SearchBar(constants.searchInputWidth);

const giphyService = new GiphyService();
// const pagination = new Pagination();WIP
const listeners = new Listeners();

let currentStep = 1;
const textInput = selectDOMElement('#search-text');
const giphsList = selectDOMElement('#giphs-list');

const getValue = () => {
  return currentStep;
};

const checkRequest = (giphs) => {
  if (giphs === constants.emptyRequest) {
    alert(constants.tryToWriteSmth)
    return false;
  }

  if (giphs === constants.tryToEnterSmth) {
    alert(constants.tryToEnterSmth)
    return false;
  } else {
    return true;
  }
};

const updatePage = (value) => {
  console.log(value);
  giphyService.updateGiphsPage(`${giphsPages[value]}`);
};

const checkObj = () => {
  let a = Object.keys(giphsPages);
  for (let key of a) {
    if (key == getValue())
      return constants.useAlreadyCreatedPage;
  };
};

const getPageOfGiphs = async () => {
  const giphs = await giphyService.getGiphs(textInput, getValue());
  if (!checkRequest(giphs)) {
    return false;
  };
  const giphsList = giphs.generatedGiphs;
  return giphsPages[`${getValue()}`] = giphsList;
}

const getGiphs = async (param) => {
  if (param === constants.newRequest) {
    await getPageOfGiphs();
    return updatePage(getValue());
  }

  if (checkObj() === constants.useAlreadyCreatedPage) {
    updatePage(getValue())
    return;
  }

  await getPageOfGiphs()
  return updatePage(getValue());
}

giphyService.onStepUpdate((step) =>  {
  currentStep = step;
});

const updateStep = (step) => {
  if (step === constants.nextPage) {
    currentStep++;
    if (currentStep >= constants.MAXSTEP) {
      currentStep = constants.MAXSTEP;
    };
  };
  if (step === constants.previousPage) {
    currentStep--;
    if (currentStep <= constants.MINSTEP) {
      currentStep = constants.MINSTEP;
    };
  };
  return getGiphs(currentStep);
};

listeners.setCurrentCommand((step) => {
  switch (step) {
    case constants.openSesame: 
      return searchBar.updateSearchInputStyle();
      break;
    case constants.search:
      currentStep = 1;
      return getGiphs(constants.newRequest);
      break;
    case constants.nextPage:
    case constants.previousPage:
      updateStep(step);
  }
});