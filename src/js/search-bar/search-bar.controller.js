import {AbstractController} from "../mvc/controller";
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