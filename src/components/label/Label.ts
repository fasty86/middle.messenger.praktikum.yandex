import "./label.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Label extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return `<label for="{{forAttr}}" class="{{className}}">{{text}}</label>`;
  }
}
