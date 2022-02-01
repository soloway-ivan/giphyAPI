import {AbstractView} from "../mvc/view";
import eventEmitter from "../mvc/event-emitter";
import {selectDomElement} from "../utils/dom-selector";
import {SearchBarEvent} from "./search-bar.constants";

const template = `
    <div class="search-bar hover-initial-search-bar" id="search-bar">
        <input class="search-bar__input" id="search-input" type="search" placeholder="Search...">
        <button class ="search-bar__icon" id="search-btn">
            <img src="https://i.ibb.co/d5rcTzD/icons8-magnifying-glass-64.png" alt="search-icon" class ="search-bar__img">
        </button>
    <div class="search-bar__overlay" id="search-bar-overlay"></div>
    </div>
`;

export class SearchBarView extends AbstractView {

    searchButton;

    onViewInit() {
        super.onViewInit();
        this.selector = '#search-system';
        this.template = template;
    }

    afterViewInit() {
        super.afterViewInit();
        this.searchBarOverlay = selectDomElement('#search-bar-overlay');
        this.searchBtn = selectDomElement('#search-btn');

        document.onkeyup = (event) => {
            if (event.key === 'Enter') {
                this.sendEvent(SearchBarEvent.CLICK_SEARCH);
            };
        };
        this.searchBarOverlay.onclick = () => { 
            this.sendEvent(SearchBarEvent.CLICK_SEARCHBAR_OVERLAY);
        };
        this.searchBtn.onclick = () => { 
            this.sendEvent(SearchBarEvent.CLICK_SEARCH);
        };
    }

    sendEvent(event) {
        eventEmitter.emit(event, selectDomElement('#search-input'));
    }
}