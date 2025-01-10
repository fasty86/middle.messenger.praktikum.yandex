import { HTTPTransport } from "../XHR";
import { BaseAPI } from "./base-api";

const chatAPIInstance = new HTTPTransport("api/v1/chats");

export class ChatAPI extends BaseAPI {
  create() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.post("/", { data: { title: "string" } });
  }

  request() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.get("/full");
  }
}
