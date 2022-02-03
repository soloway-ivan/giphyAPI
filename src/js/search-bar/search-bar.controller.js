import {AbstractController} from "../mvc/controller";
// import eventEmitter from "../mvc/event-emitter";

import {SearchBarView} from "../search-bar/search-bar.view"
import {SearchBarEvent} from "./search-bar.constants";

export class SearchBarController extends AbstractController {
    constructor(model, view) {
        super(model, view);
        this.registerListener(SearchBarEvent.CLICK_SEARCH, (data) => { this.onClickSearchBtn(data)})
    }

    onClickSearchBtn(data) {
        console.log(data.value);
    }
}