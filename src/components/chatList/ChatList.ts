import "./chatList.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ChatList extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<main class="chat-list">
            <ul class="chat-list__container">
              {{{List}}}
            </ul>
          </main>`;
    }
}
