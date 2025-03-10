import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
import LinkBlock from "../components/link/Link.ts";

export default class ServerErrorView extends AbstractView {
  constructor(protected root: HTMLElement) {
    super(root);
    this.setTitle("505");
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

    const page = new Pages.ServerErrorPage({
      rootData: {
        text: "мы уже фиксим",
      },
      childrens: {
        Link: link,
      },
    });
    return page;
  }
}
