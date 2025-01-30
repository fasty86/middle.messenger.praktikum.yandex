import "./formGroup.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Input from "../input/Input";
import Label from "../label/Label";
export default class FormGroup extends Block<FormGroupPropsType> {
  render() {
    return `<div class="form__group {{className}}" >
                  {{{Input}}}
                  {{{Label}}}
                </div>`;
  }
}

type FormGroupPropsType = PropsType & {
  attributes?: {
    className?: string;
  };
  childrens: {
    Input: Input;
    Label?: Label;
  };
};
