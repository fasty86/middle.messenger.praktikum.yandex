import Handlebars from "handlebars";
import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";

export default class NotFoundView extends AbstractView {
    protected template: string;
    constructor(protected root: HTMLElement) {
        super(root);
        this.template = Pages.NotFoundPage;
        this.setTitle("404");
    }
    async render() {
        const template = Handlebars.compile(this.template);
        this.root.innerHTML = template({});
        this.addEvtListeners();
    }
}
