import { ChatAPI, ChatCreateData } from "../../../services/api/chat-api";
import { ResourceAPI } from "../../../services/api/resources-api";
import WSSTransport, { Message, MessageTypes, responseMessageType } from "../../../services/WSS";
import { sanitizeInput } from "../../../utils/sanitize";
import { showToast } from "../../../utils/toast";
import { DefaultObject } from "../../types";
import store from "../Store";
import { ChatListType, STATUS, UserChatInfo } from "../types";
import { UserController } from "./userController";

export class ChatController {
  public static async create_chat(chat_name: string) {
    const data: ChatCreateData = {
      title: chat_name,
    };
    const response = await ChatAPI.add_chat(data);
    if (response.ok) {
      showToast("Чат создан", "success");
    } else {
      const reason = response.json<{ reason: string }>().reason || "Ошибка";
      showToast(`${reason}`, "error");
    }
    return response.ok;
  }
  public static async select_chat(chatId: string) {
    const response = await ChatAPI.get_active_chat_token(chatId);
    if (response.ok) {
      const { user = null, activeChat = null } = store.getState();
      const token = response.json<{ token: string }>();
      if (user && activeChat) {
        activeChat.socket.close();
        activeChat.messages = [];
        activeChat.token = "";
        activeChat.chatId = null;
      }
      if (user) {
        const socket = new WSSTransport(WSSTransport.buildUrl(String(user.id), chatId, token.token));
        store.set("activeChat", { token, socket, chatId });
        await ChatController.get_chat_messages(0);
        await ChatController.get_chat_users(Number(chatId));
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
  public static store_chat_message(data: responseMessageType | responseMessageType[]) {
    let messages = store.getState().activeChat?.messages || [];
    if (Array.isArray(data)) {
      messages = [...messages, ...data.reverse()];
      store.set("activeChat.messages", messages);
    } else {
      store.set_new_message(data);
    }
  }
  public static async get_chat_list() {
    const response = await ChatAPI.get_chat_list();
    if (response.ok) {
      const data = response.json<ChatListType>();
      store.set("chatList", data);
    }
    return response.ok;
  }
  public static async get_chat_users(chatId: number) {
    const response = await ChatAPI.get_chat_users(chatId);
    if (response.ok) {
      const data = response.json<UserChatInfo>();
      store.set("activeChat.users", data);
    }
    return response.ok;
  }

  public static async send_text_message(data: DefaultObject) {
    const socket = store.getState()?.activeChat?.socket;

    const message: Message = {
      type: MessageTypes.MESSAGE,
      content: sanitizeInput(data.message as string),
    };
    if (socket) {
      socket.sendMessage(message);
    }
  }
  public static async send_file_message(data: FormData) {
    const socket = store.getState()?.activeChat?.socket;
    // загружаем файл на сервер ресурсов
    const response = await ResourceAPI.file_upload(data);
    if (response.ok) {
      showToast("Файл загружен", "success");
      store.set("statuses.fileLoading", STATUS.SUCCESS);
      const responseData = response.json<FileUploadResponse>();
      const message: Message = {
        type: MessageTypes.FILE,
        content: String(responseData.id),
      };
      if (socket) {
        socket.sendMessage(message);
      }
    } else {
      showToast(`Ошибка попробуйте еще раз}`, "error");
      store.set("statuses.fileLoading", STATUS.ERROR);
    }
    return response.ok;
  }
  public static async add_user_to_chat(login: string) {
    const activeChat = store.getState().activeChat;
    const userId = await UserController.search_user(login);
    if (userId) {
      const data: AddUserToChat = {
        users: [userId],
        chatId: activeChat?.chatId || 0,
      };
      const response = await ChatAPI.add_user_to_chat(data);
      if (response.ok) store.set("statuses.userAdding", STATUS.SUCCESS);
      else store.set("statuses.userAdding", STATUS.ERROR);
      return response.ok;
    }
    store.set("statuses.userAdding", STATUS.ERROR);
    return false;
  }
  public static async delete_user_from_chat(login: string) {
    const activeChat = store.getState().activeChat;
    const userId = await UserController.search_user(login);
    if (userId) {
      const data: AddUserToChat = {
        users: [userId],
        chatId: activeChat?.chatId || 0,
      };
      const response = await ChatAPI.delete_user_from_chat(data);
      if (response.ok) store.set("statuses.userDeleting", STATUS.SUCCESS);
      else store.set("statuses.userDeleting", STATUS.ERROR);
      return response.ok;
    }
    return false;
  }
}

type FileUploadResponse = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type AddUserToChat = {
  users: number[];
  chatId?: number;
};
