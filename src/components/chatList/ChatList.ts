import "./chatList.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import ListElement from "../list/ListElement";
export default class ChatList extends Block<ChatListPropsType> {
  render() {
    return `<main class="chat-list">
            <ul class="chat-list__container">
              {{{List}}}
            </ul>
          </main>`;
  }
}

type ChatListPropsType = PropsType & {
  lists: {
    List: ListElement[];
  };
};
