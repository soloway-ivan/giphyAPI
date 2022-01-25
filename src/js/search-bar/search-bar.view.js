import {AbstractView} from "../mvc/view";
import eventEmitter from "../mvc/event-emitter";
import {selectDomElement} from "../utils/dom-selector";
import {SearchBarEvent} from "./search-bar.constants";

const template = `
    <button id="awesome-button">click</button>
`

export class SearchBarView extends AbstractView {

    awesomeButton;

    onViewInit() {
        super.onViewInit();
        this.selector = '#search-bar';
        this.template = template;
    }

    afterViewInit() {
        super.afterViewInit();
        this.awesomeButton = selectDomElement('#awesome-button');
        this.awesomeButton.onclick = this.sendAwesomeEvent.bind(this);
    }

    sendAwesomeEvent() {
        eventEmitter.emit(SearchBarEvent.CLICK_AWESOME_BUTTON, [1,2]);
    }
}