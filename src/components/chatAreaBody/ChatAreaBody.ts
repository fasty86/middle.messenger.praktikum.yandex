import "./chatAreaBody.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ChatAreaBody extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return `<section class="chat-area__body">
            <div class="chat-area__message-date">{{currentDate}}</div>
            <div class="chat-area__message-container">
             {{{MessageList}}}
              </div>
            </div>
          </section>`;
  }
}
