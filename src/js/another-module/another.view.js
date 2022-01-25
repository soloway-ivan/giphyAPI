import {AbstractView} from "../mvc/view";

export class AnotherView extends AbstractView {
    onViewInit() {
        super.onViewInit();
        this.selector = '#another';
    }
}