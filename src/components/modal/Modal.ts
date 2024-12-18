import "./modal.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Form from "../form/Form";
export default class Modal extends Block<ModalPropsType> {
  render() {
    return `<dialog  class="dialog" id="{{id}}">
                  <div class="dialog__container">
                    <h3 class="modal__title">{{title}}</h3>
                    {{{Form}}}
                  </dialog>`;
  }
}

type ModalPropsType = PropsType & {
  rootData: {
    title: string;
  };
  attributes: {
    id: string;
  };
  childrens: {
    Form: Form;
  };
};
