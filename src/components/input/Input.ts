import "./input.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Tooltip from "../tooltip/Tooltip";
import { isInputElement } from "../../types/typeguards";
import { connect } from "../../utils/connect";

export default class Input extends Block<InputPropsType> {
  constructor(props: InputPropsType) {
    super(props);
  }
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

export type InputPropsType = PropsType & {
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
export const withUserFisrtName = connect<InputPropsType>((state) => {
  return { attributes: { value: state.user?.first_name ?? "Guest" } };
});
export const withUserSecondName = connect<InputPropsType>((state) => {
  return { attributes: { value: state.user?.second_name ?? "" } };
});
export const withUserEmail = connect<InputPropsType>((state) => {
  return { attributes: { value: state.user?.email ?? "" } };
});
export const withUserLogin = connect<InputPropsType>((state) => {
  return { attributes: { value: state.user?.login ?? "" } };
});
export const withUserPhone = connect<InputPropsType>((state) => {
  return { attributes: { value: state.user?.phone ?? "" } };
});
export const withUserDispayName = connect<InputPropsType>((state) => {
  return { attributes: { value: state.user?.display_name ?? "" } };
});
export const withUserPassword = connect<InputPropsType>((state) => {
  return { attributes: { value: state.user?.password ?? "" } };
});
export const userFirstName = withUserFisrtName(Input);
export const userSecondName = withUserSecondName(Input);
export const userEmail = withUserEmail(Input);
export const userLogin = withUserLogin(Input);
export const userPhone = withUserPhone(Input);
export const userDisplayName = withUserDispayName(Input);
export const userPassword = withUserPassword(Input);
