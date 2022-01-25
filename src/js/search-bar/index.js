import {SearchBarModel} from "./search-bar.model";
import {SearchBarView} from "./search-bar.view";
import {SearchBarController} from "./search-bar.controller";

export const searchBarModule = () => {
    const searchBarModel = new SearchBarModel();
    const searchBarView = new SearchBarView();
    const searchBarController = new SearchBarController(searchBarModel, searchBarView);

    return {
        model: searchBarModel,
        view: searchBarView,
        controller: searchBarController
    }
};
