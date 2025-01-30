import "./label.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Label extends Block<LabelPropsType> {
  render() {
    return `<label for="{{forAttr}}" class="{{className}}">{{text}}</label>`;
  }
}

type LabelPropsType = PropsType & {
  attributes: {
    className: string;
    forAttr: string;
    text: string;
  };
};
