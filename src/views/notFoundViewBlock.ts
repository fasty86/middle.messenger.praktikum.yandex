// import Handlebars from "handlebars";
import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
// import Block from "../framework/Block.ts";
import LinkBlock from "../components/link/Link_block.ts";

const link = new LinkBlock({
    rootData: {
        className: "util-link",
        href: "/chat",
        text: "назад к чатам",
    },
});

const NotFoundViewBlockV = new Pages.NotFoundPageBlock({
    rootData: {
        className: "",
        text: "не туда попали?",
    },
    childrens: {
        Link: link,
    },
});
export default class NotFoundViewBlock extends AbstractView {
    protected template: string;
    constructor(protected root: HTMLElement) {
        super(root);
        this.template = Pages.NotFoundPage;
        this.setTitle("404");
    }
    async render() {
        // const template = Handlebars.compile(this.template);
        // this.root.innerHTML = template({});
        this.root.replaceChildren(NotFoundViewBlockV.getContent());
        this.addEvtListeners();
    }
}
