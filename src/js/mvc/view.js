import {selectDomElement} from "../utils/dom-selector";

export class AbstractView {

    template = '';
    selector = '';
    viewElement = null;

    constructor() {
        this.onViewInit();
        this.render();
        this.afterViewInit();
    }

    onViewInit() {}

    render(data) {
        this.updateTemplate(data);
        this.viewElement = selectDomElement(this.selector);
        if (!this.viewElement) {
            return;
        }
        this.viewElement.innerHTML += this.template;
    }

    updateTemplate(data) {

    }

    afterViewInit() {}

    destroy() {
        this.viewElement.innerHTML = '';
    }
}