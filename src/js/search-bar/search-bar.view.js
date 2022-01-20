import {AbstractView} from "../mvc/view";
import eventEmitter from "../mvc/event-emitter";

const template = `
    <button>click</button>
`

export class SearchBarView extends AbstractView {
    constructor() {
        super();
        setTimeout(() => {eventEmitter.emit("custom_event")}, 5000);
    }
}