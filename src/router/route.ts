import { isHTMLElement } from "../types/typeguards";
import { isEqual } from "../utils/equal";

import { Constructable, viewClassTypes, routeProps } from "./types";

export class Route {
  private _pathname: string;
  private _blockClass: Constructable<viewClassTypes>;
  private _props: routeProps;
  private _block: viewClassTypes | null;
  constructor(pathname: string, view: Constructable<viewClassTypes>, props: routeProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {}

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  private getRootElement(query: string): HTMLElement | null {
    const root = document.querySelector(query);
    if (root && isHTMLElement(root)) return root;
    return null;
  }
  render() {
    const root = this.getRootElement(this._props.rootQuery);
    if (!root) return;
    if (!this._block) {
      this._block = new this._blockClass(root);
      this._block.render();
      return;
    }
    this._block.render();
  }
}
