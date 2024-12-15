import "./form.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Form extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<form class="{{formClassName}}">
                  {{{Elements}}}
                  {{{Button}}}
                  {{{Link}}}
                </form>`;
    }
}
