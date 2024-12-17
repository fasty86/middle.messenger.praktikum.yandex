// import Handlebars from "handlebars";
// import AbstractView from "./abstractView.ts";
// import * as Pages from "../pages/index.ts";

// export default class ServerErrorview extends AbstractView {
//     protected template: string;
//     constructor(protected root: HTMLElement) {
//         super(root);
//         this.template = Pages.ServerErrorPage;
//         this.setTitle("500");
//     }
//     async render() {
//         const template = Handlebars.compile(this.template);
//         this.root.innerHTML = template({});
//         this.addEvtListeners();
//     }
// }
