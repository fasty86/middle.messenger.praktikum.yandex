import "./chatListItem.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ChatListItem extends Block {
    constructor(props: PropsType) {
        super(props);
    }

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
