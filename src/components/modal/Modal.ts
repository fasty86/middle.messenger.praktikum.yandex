import "./modal.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Form from "../form/Form";
import Text from "../Text/Text";
export default class Modal extends Block<ModalPropsType> {
  render() {
    return `<dialog  class="dialog" id="{{id}}">
                  <div class="dialog__container">
                    {{{Title}}}
                    {{{Form}}}
                  </dialog>`;
  }
}

type ModalPropsType = PropsType & {
  attributes: {
    id: string;
  };
  childrens: {
    Form: Form;
    Title: Text;
  };
};
