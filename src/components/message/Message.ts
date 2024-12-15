import "./message.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Message extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<div class="chat-area__message">
                <div class="chat-area__message-content">
                 {{{Content}}}
                </div>
                <div class="chat-area__message-data">{{date}}</div>
              </div>`;
    }
}
