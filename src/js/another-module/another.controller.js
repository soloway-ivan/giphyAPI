import {AbstractController} from "../mvc/controller";
import {SearchBarEvent} from "../search-bar/search-bar.constants";

export class AnotherController extends AbstractController {
    constructor(model, view) {
        super(model, view);
        this.registerListener(SearchBarEvent.CLICK_AWESOME_BUTTON, (data) => {this.onClickAwesomeButton(data)})
    }

    onClickAwesomeButton(data) {
        console.log('From [Another] module');
        console.log(data);
    }
}