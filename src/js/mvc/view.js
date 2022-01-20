export class AbstractView {

    template = '';

    constructor() {
        this.onViewInit();
        this.render();
        this.afterViewInit();
    }

    onViewInit() {}

    render(data) {
        return this.template;
    }

    afterViewInit() {}

    destroyView() {}
}