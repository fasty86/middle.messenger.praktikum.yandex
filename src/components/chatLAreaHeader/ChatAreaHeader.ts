import "./chatAreaHeader.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ChatAreaHeader extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<header class="chat-area__header">
            <nav class="chat-area_navigation">
              <div class="chat-area__user-info">
                {{{Image}}}
                <p class="user-info__name">{{userData}}</p>
              </div>
              {{{Menu}}}
              {{{ModalList}}}
            </nav>
          </header>
`;
    }
}
