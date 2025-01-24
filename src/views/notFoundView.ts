import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";

import LinkBlock from "../components/link/Link.ts";

export default class NotFoundView extends AbstractView {
  constructor(protected root: HTMLElement) {
    super(root);
    this.setTitle("404");
  }
  async render() {
    this.root.replaceChildren(this.buildComponents().getContent());
  }

  protected buildComponents() {
    const link = new LinkBlock({
      attributes: {
        className: "util-link",
        href: "/messenger",
        text: "назад к чатам",
      },
    });

    const page = new Pages.NotFoundPage({
      rootData: {
        text: "не туда попали?",
      },
      childrens: {
        Link: link,
      },
    });
    return page;
  }
}
