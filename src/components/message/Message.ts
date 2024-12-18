import "./message.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Message extends Block<MessagePropsType> {
  render() {
    return `<div class="chat-area__message">
                <div class="chat-area__message-content">
                 {{{Content}}}
                </div>
                <div class="chat-area__message-data">{{date}}</div>
              </div>`;
  }
}

type MessagePropsType = PropsType & {
  childrens: {
    Content: Block;
  };
  rootData: {
    date: string;
  };
};
