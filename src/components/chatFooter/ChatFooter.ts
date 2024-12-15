import "./chatFooter.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ChatFooter extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<footer class="footer">
            {{{Menu}}}
            {{{Input}}}
            {{{Button}}}
          </footer>`;
    }
}
