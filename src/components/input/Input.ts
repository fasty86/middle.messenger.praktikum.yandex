import "./input.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Tooltip from "../tooltip/Tooltip";
import { isInputElement } from "../../types/typeguards";
export default class Input extends Block<InputPropsType> {
  showTooltip() {
    if ("Tooltip" in this.childrens) {
      const tooltip = this.childrens.Tooltip as Tooltip;
      tooltip.onShow(this);
    }
  }
  hideTooltip() {
    if ("Tooltip" in this.childrens) {
      const tooltip = this.childrens.Tooltip as Tooltip;
      tooltip.onHide();
    }
  }
  validate(validator: (value: string) => boolean): boolean {
    const input = this.getContent();
    if (isInputElement(input)) {
      const validationResult = validator(input.value);
      if (!validationResult) this.showTooltip();
      return validationResult;
    }
    return false;
  }

  render() {
    return `<input id="{{id}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" class="{{className}}" {{disabled}}>`;
  }
}

type InputPropsType = PropsType & {
  attributes: {
    className: string;
    disabled?: string;
    id: string;
    name: string;
    placeholder: string;
    type: string;
    value: string;
  };
};
