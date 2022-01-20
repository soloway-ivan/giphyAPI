import {SearchBarModel} from "./search-bar.model";
import {SearchBarView} from "./search-bar.view";
import {SearchBarController} from "./search-bar.controller";

const searchBarModel = new SearchBarModel();
const searchBarView = new SearchBarView();
const searchBarController = new SearchBarController(searchBarModel, searchBarView);

export const searchBarModule = () => {
    return {
        model: searchBarModel,
        view: searchBarView,
        controller: searchBarController
    }
};
