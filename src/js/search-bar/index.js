import {SearchBarModel} from "./search-bar.model";
import {SearchBarView} from "./search-bar.view";
import {SearchBarController} from "./search-bar.controller";

export class SearchBarModule {
    model;
    view;
    controller;

    constructor() {
        this.model = new SearchBarModel();
        this.view = new SearchBarView();
        this.controller = new SearchBarController(this.model, this.view);
    }
}
