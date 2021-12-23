import { constants } from "./constants.js";
import { giphsGallery } from "./giphs-gallery.js";
import { selectDOMElement } from "./utils.js";
import { GiphsService } from './GiphsService.js'
import { SearchBar } from './SearchBar.js'

import { SearchSystemHTML } from './SearchSystemHTML.js'
import { GiphyServiceHTML } from './GiphyServiceHTML.js'


const searchSystem = new SearchSystemHTML;
// const GiphyService = new giphyServiceHTML; wip


const searchBtn = selectDOMElement('#search-btn');
const searchInput = selectDOMElement('#search-bar');
const textInput = selectDOMElement('#search-text')
const searchBarWrapper = selectDOMElement('#search-bar-overlay')


searchBarWrapper.addEventListener('click', () => {
  new SearchBar().updateSearchInputStyle()
})

let giphsService;
searchBtn.addEventListener('click', () => {
  giphsService = new GiphsService(constants.API).getResponseURL(textInput);
  if (textInput.value !== '') {
    giphsService
      .then(content => {
        if (content.data.length !== 0) {
          console.log(content, content.data);
          console.log("META", content.meta);
          let obj = {};
          return obj = {
            'title': content.data[0].title,
            'height': content.data[0].images.downsized.height,
            'width': content.data[0].images.downsized.width,
            'url': content.data[0].images.downsized.url
          },
            giphsGallery.unshift = obj;
        } else {
          alert('Ops, invalid request :(')
        }   
      })
  } else {
    alert('Try to intoduct something!')
  }
})