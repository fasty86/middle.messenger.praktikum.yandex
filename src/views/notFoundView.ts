// import Handlebars from "handlebars";
import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
// import { NavigationComponent } from "../components/util/Navigation.ts";
import LinkBlock from "../components/link/Link.ts";
import { NavigationComponent } from "../components/util/Navigation.ts";

export default class NotFoundView extends AbstractView {
  // protected template: string;
  constructor(protected root: HTMLElement) {
    super(root);
    // this.template = Pages.NotFoundPage;
    this.setTitle("404");
  }
  async render() {
    this.root.replaceChildren(this.buildComponents().getContent());
  }

  protected buildComponents() {
    const link = new LinkBlock({
      attributes: {
        className: "util-link",
        href: "/chat",
        text: "назад к чатам",
      },
    });

    const page = new Pages.NotFoundPage({
      rootData: {
        text: "не туда попали?",
      },
      childrens: {
        Navigation: NavigationComponent,
        Link: link,
      },
    });
    return page;
  }
}
