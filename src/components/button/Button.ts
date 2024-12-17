import "./button.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Button extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return `<button id="{{id}}" class="{{className}}" type="{{type}}">{{text}}</button>`;
  }
}
