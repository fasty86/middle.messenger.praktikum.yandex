import "./chatList.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import ListElement from "../list/ListElement";
import { connect, MapStateReturnType } from "../../utils/connect";
import ChatListItem from "../chatListItem/ChatListItem";
import Image from "../image/Image";
import { ChatController } from "../../framework/store/controllers/chatController";
import { getDateInfo } from "../../utils/date";
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
  lists?: {
    List: ListElement[];
  };
};

export const withChatList = connect<ChatListPropsType>((state) => {
  const storedState = state.chatList;
  const activeChatID = state.activeChat?.chatId || 0;
  let items: ChatListItem[] = [];
  if (storedState.length) {
    items = storedState.map((chat) => {
      return new ChatListItem({
        rootData: {
          message: chat.last_message?.content || "",
          time: getDateInfo(chat.last_message?.time || ""),
          unreadMessages: chat.unread_count || 0,
          username: chat.title,
          chatId: chat.id,
          className: chat.id === activeChatID ? "chat-list__item-active" : "",
        },
        events: {
          click: async function (this: ChatListItem, _e) {
            await ChatController.select_chat(this.rootData.chatId as string);
            clearChatListSelection();
            this.getContent().classList.add("chat-list__item-active");
          },
        },
        childrens: {
          Image: new Image({
            attributes: {
              alt: "аватар",
              className: "chat_list__image",
              src: chat.avatar || "/avatar.jpeg",
            },
          }),
        },
      });
    });
  }
  const chatListItems = {
    lists: {
      List: items,
    },
  };

  return { storedState, component: chatListItems } as unknown as MapStateReturnType;
});
export const chats = withChatList(ChatList);

function clearChatListSelection() {
  const chatListItems = document.querySelectorAll(".chat-list__item-active");
  chatListItems.forEach((item) => {
    item.classList.remove("chat-list__item-active");
  });
}
