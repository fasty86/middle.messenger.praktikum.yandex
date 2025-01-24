import { ChatController } from "../framework/store/controllers/chatController";

class WSSTransport {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number;
  private pingInterval: number;
  private pingTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(url: string, reconnectInterval = 5000, pingInterval = 30000, pingTimeout = 5000) {
    this.url = url;
    this.reconnectInterval = reconnectInterval;
    this.pingInterval = pingInterval;
    this.connect();
  }
  public static buildUrl(userId: string, chatId: string, token: string): string {
    const base = "wss://ya-praktikum.tech/ws/chats";
    return `${base}/${userId}/${chatId}/${token}`;
  }
  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("соединение установлено");
      // this.sendMessage({ type: MessageTypes.MESSAGE, content: "Мое первое сообщение" });
      this.startPing();
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === MessageTypes.PONG) {
        this.resetPing();
      } else if (data.type === MessageTypes.MESSAGE || data.type === MessageTypes.FILE) {
        ChatController.store_chat_message(data);
      } else if (Array.isArray(data)) {
        ChatController.store_chat_message(data);
      }
    };

    this.socket.onclose = (event) => {
      console.log("Соеднинение закрыто");
      this.stopPing();
      if (event.reason !== "forced") {
        console.log(" попытка переподключения...");
        this.reconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.warn("Ошибка вебсокета:", error);
      this.socket?.close();
    };
  }

  private startPing() {
    this.pingTimer = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.sendMessage({ type: MessageTypes.PING });
      }
    }, this.pingInterval);
  }

  private resetPing() {
    if (this.pingTimer) {
      clearTimeout(this.pingTimer);
      this.startPing();
    }
  }

  private stopPing() {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private reconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.reconnectTimer = setTimeout(() => {
      console.log("Переподключение...");
      this.connect();
    }, this.reconnectInterval);
  }

  public sendMessage(msg: Message) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
    } else {
      console.warn("Сокет не готов для отправки сообщения");
      setTimeout(() => this.sendMessage(msg), 500);
    }
  }

  public close() {
    console.warn("Принудительное закрытие сокета");
    this.stopPing();
    this.socket?.close(1000, "forced");
  }
}

export default WSSTransport;

export type Message = {
  type: MessageTypes;
  content?: string;
};
export enum MessageTypes {
  PING = "ping",
  PONG = "pong",
  MESSAGE = "message",
  FILE = "file",
  OLD = "get old",
  STICKER = "sticker",
}

export type responseMessageType = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: MessageTypes;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};
export type responseOldMessageType = responseMessageType[];
