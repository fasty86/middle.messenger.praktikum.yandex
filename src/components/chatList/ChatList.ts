import "./chatList.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import ListElement from "../list/ListElement";
import { connect } from "../../utils/connect";
import ChatListItem from "../chatListItem/ChatListItem";
import Image from "../image/Image";
import { ChatController } from "../../framework/store/controllers/chatController";
import { getDateInfo } from "../../utils/date";
export default class ChatList extends Block {
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
  const chatList = state.chatList;
  let items: ChatListItem[] = [];
  if (chatList.length) {
    items = chatList.map((chat) => {
      return new ChatListItem({
        rootData: {
          message: chat.last_message?.content || "",
          time: getDateInfo(chat.last_message?.time || ""),
          unreadMessages: chat.unread_count || 0,
          username: chat.title,
          chatId: chat.id,
        },
        events: {
          click: async function (this: ChatListItem, _e) {
            console.log("chat clicked", this.rootData.chatId);
            ChatController.get_active_chat_token(this.rootData.chatId as string);
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
  return chatListItems;
});
export const chats = withChatList(ChatList);
// imageData: {
//   alt: "аватар",
//   className: "chat_list__image",
//   src: "/avatar.jpeg",
// },
// message: "Привет, мир!",
// time: "12:00",
// unreadMessages: 5,
// username: "Федор",
// });
