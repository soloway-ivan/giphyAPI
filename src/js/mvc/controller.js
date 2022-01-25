import eventEmitter from "./event-emitter";

export class AbstractController {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    registerListener(event, cb) {
        eventEmitter.on(event, (data) => { cb(data); })
    }
}