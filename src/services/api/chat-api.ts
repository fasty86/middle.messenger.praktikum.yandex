import { HTTPTransport } from "../XHR";
import { BaseAPI } from "./base-api";

const chatAPIInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/chats");

export class ChatAPI extends BaseAPI {
  static async add_chat(data: ChatCreateData) {
    return chatAPIInstance.post("", {
      data,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }

  static async get_chat_list() {
    return chatAPIInstance.get("", {
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
  static async get_active_chat_token(chatId: string) {
    return chatAPIInstance.post(`/token/${chatId}`, {
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
}

export type ChatCreateData = {
  title: string;
};
