import "./modal.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Modal extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<dialog  class="dialog" id="{{id}}">
                  <div class="dialog__container">
                    <h3 class="modal__title">{{title}}</h3>
                    {{{FormGroup}}}
                    {{{Button}}}
                  </dialog>`;
    }
}
