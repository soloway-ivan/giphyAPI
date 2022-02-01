import {AbstractController} from "../mvc/controller";
import { selectDomElement } from "../utils/dom-selector";
import {SearchBarEvent} from "./search-bar.constants";

export class SearchBarController extends AbstractController {
    constructor(model, view) {
        super(model, view);
        this.registerListener(SearchBarEvent.CLICK_SEARCHBAR_OVERLAY, (data) => { this.onClickSearchBarOverlay(data)})
        this.registerListener(SearchBarEvent.CLICK_SEARCH, (data) => { this.onClickSearchBtn(data)})
    }

    onClickSearchBarOverlay(DOMElement) {
        DOMElement.classList.add('active-search-bar');
        selectDomElement('#search-bar-overlay').style.display = 'none';
        selectDomElement('#search-bar').classList.remove('hover-initial-search-bar');
    }

    onClickSearchBtn(data) {
        console.log(data.value);
    }
}