import {AbstractView} from "../mvc/view";
import eventEmitter from "../mvc/event-emitter";
import {selectDomElement} from "../utils/dom-selector";
import {SearchBarEvent} from "./search-bar.constants";

const template = `
    <div class="search-bar initial-search-bar" id="search-bar">
        <input class="search-bar__input" id="search-input" type="search" placeholder="Search...">
        <button class ="search-bar__icon" id="search-btn">
            <img src="https://i.ibb.co/d5rcTzD/icons8-magnifying-glass-64.png" alt="search-icon" class ="search-bar__img">
        </button>
    </div>
`

export class SearchBarView extends AbstractView {

    searchButton;

    onViewInit() {
        super.onViewInit();
        this.selector = '#search-system';
        this.template = template;
    }

    afterViewInit() {
        super.afterViewInit();
        this.searchBar = selectDomElement('#search-bar');
        this.searchBtn = selectDomElement('#search-btn');

        selectDomElement('#search-input').onkeyup = (event) => {
            if(event.key === 'Enter') {
                this.sendEvent(SearchBarEvent.CLICK_SEARCH);
            }
        }

        this.searchBar.onclick = () => {
            if (selectDomElement('#search-bar') === null) {
                return;
            }
            this.toggleSearchBar();
        };
    }

    addListenerSearchBtn() {
        this.searchBtn.onclick = () => {
            this.sendEvent(SearchBarEvent.CLICK_SEARCH);
        };
    }

    toggleSearchBar() {
        selectDomElement('#search-input').classList.add('active-search-bar');
        selectDomElement('#search-bar').classList.remove('initial-search-bar');
        this.addListenerSearchBtn();
    }

    sendEvent(event) {
        eventEmitter.emit(event, selectDomElement('#search-input'));
    }
}