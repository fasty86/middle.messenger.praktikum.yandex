import { ChatAPI, ChatCreateData } from "../../../services/api/chat-api";

export class ChatController {
  public static async create_chat(chat_name: string) {
    const data: ChatCreateData = {
      title: chat_name,
    };
    const response = await ChatAPI.add_chat(data);
    console.log(response.json(), `status:${response.status}`);
  }
  public static async get_chat_list() {
    const response = await ChatAPI.get_chat_list();
    console.log(response.json(), `status:${response.status}`);
  }
}
