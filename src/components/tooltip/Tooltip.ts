import "./tooltip.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Tooltip extends Block<ToolTipType> {
  onShow = (sourceEl: Block) => {
    this.getContent().classList.add(`tooltip-active`);
    sourceEl.getContent().after(this.getContent());
  };
  onHide() {
    this.getContent().classList.remove(`tooltip-active`);
  }
  render() {
    return `<div class="tooltip {{className}}">{{text}}</div>`;
  }
}

type ToolTipType = PropsType & {
  rootData: {
    text: string;
  };
  attributes: {
    className: string;
  };
};
