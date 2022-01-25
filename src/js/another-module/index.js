import {AnotherModel} from "./another.model";
import {AnotherView} from "./another.view";
import {AnotherController} from "./another.controller";

export class AnotherModule {
    constructor() {
        this.model = new AnotherModel();
        this.view = new AnotherView();
        this.controller = new AnotherController(this.model, this.view);
    }
}
