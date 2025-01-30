import "./link.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Link extends Block<LinkPropsType> {
  render() {
    return `<a href="{{href}}" class="{{className}}" data-link>{{text}}</a>`;
  }
}

type LinkPropsType = PropsType & {
  attributes: {
    className?: string;
    href: string;
  };
  rootData?: {
    text: string;
  };
};
