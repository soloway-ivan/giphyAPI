import {AbstractController} from "../mvc/controller";
import {SearchBarEvent} from "./search-bar.constants";

export class SearchBarController extends AbstractController {
    constructor(model, view) {
        super(model, view);
        this.registerListener(SearchBarEvent.CLICK_AWESOME_BUTTON, (data) => {this.onClickAwesomeButton(data)})
    }

    onClickAwesomeButton(data) {
        console.log(data);
    }
}