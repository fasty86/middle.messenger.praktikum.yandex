import "./chatAreaBody.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Message from "../message/Message";
export default class ChatAreaBody extends Block<ChatAreaBodyPropsType> {
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

type ChatAreaBodyPropsType = PropsType & {
  lists: {
    MessageList: Message[];
  };
  rootData: {
    currentDate: string;
  };
};
