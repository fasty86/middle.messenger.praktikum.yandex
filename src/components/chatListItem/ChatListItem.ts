import "./chatListItem.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Image from "../image/Image";
export default class ChatListItem extends Block<ChatListItemPropsType> {
  render() {
    return `<li class="chat-list__item">
              {{{Image}}}
                <div class="chat-list__info">
                  <span class="chat-list__name">{{username}}</span>
                  <span class="chat-list__message">
                    {{message}}
                  </span>
                </div>
                <div class="chat-list__data">
                  <div class="chat-list__time">{{time}}</div>
                  <div class="chat-list__unread-message">{{unreadMessages}}</div>
                </div>`;
  }
}

type ChatListItemPropsType = PropsType & {
  rootData: {
    username: string;
    message: string;
    time: string;
    unreadMessages: number;
  };
  childrens: {
    Image: Image;
  };
};
