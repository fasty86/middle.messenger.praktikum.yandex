import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ListElement extends Block<ListElementPropsType> {
  render() {
    return `<li class="{{className}}">{{{content}}}</li>`;
  }
}

type ListElementPropsType = PropsType & {
  childrens: {
    content: Block | string;
  };
  attributes: {
    className: string;
  };
};
