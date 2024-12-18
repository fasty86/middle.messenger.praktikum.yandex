import "./button.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import { buttonType } from "../../types/components";
export default class Button extends Block<ButtonPropsType> {
  render() {
    return `<button id="{{id}}" class="{{className}}" type="{{type}}">{{text}}</button>`;
  }
}

type ButtonPropsType = PropsType & {
  attributes: buttonType;
};
