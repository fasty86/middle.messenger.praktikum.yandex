import "./formGroup.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class FormGroup extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<div class="form__group {{className}}" >
                  {{{Input}}}
                  {{{Label}}}
                </div>`;
    }
}
