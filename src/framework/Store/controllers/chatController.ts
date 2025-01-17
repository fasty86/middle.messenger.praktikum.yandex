import { ChatAPI, ChatCreateData } from "../../../services/api/chat-api";
import WSSTransport, { MessageTypes } from "../../../services/WSS";
import store from "../Store";
import { ChatListType } from "../types";

export class ChatController {
  public static async create_chat(chat_name: string) {
    const data: ChatCreateData = {
      title: chat_name,
    };
    const response = await ChatAPI.add_chat(data);
    console.log(response.json(), `status:${response.status}`);
  }
  public static async get_active_chat_token(chatId: string) {
    const response = await ChatAPI.get_active_chat_token(chatId);
    console.log(response.json(), `status:${response.status}`);
    if (response.ok) {
      const { user = null, activeChat = null } = store.getState();
      const token = response.json<{ token: string }>();
      if (user && activeChat) {
        activeChat.socket.close();
      }
      if (user) {
        const socket = new WSSTransport(WSSTransport.buildUrl(String(user.id), chatId, token.token));
        store.set("activeChat", { token, socket });
        ChatController.get_chat_messages(0);
        // setTimeout(() => store.getState().activeChat.socket.close(), 5000);
      }
    }
  }
  public static async get_chat_messages(offset: number) {
    const socket = store.getState()?.activeChat?.socket;
    if (socket) {
      socket.sendMessage({
        content: offset.toString(),
        type: MessageTypes.OLD,
      });
    }
  }
  public static async get_chat_list() {
    const response = await ChatAPI.get_chat_list();
    if (response.ok) {
      const data = response.json<ChatListType>();
      store.set("chatList", data);
    }
    console.log(response.json(), `status:${response.status}`);
    return response.ok;
  }
  public static close_active_chat() {}
}
