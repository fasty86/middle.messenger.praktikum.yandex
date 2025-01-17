class WSSTransport {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number;
  private pingInterval: number;
  private pingTimeout: number;
  private pingTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(url: string, reconnectInterval = 5000, pingInterval = 30000, pingTimeout = 5000) {
    this.url = url;
    this.reconnectInterval = reconnectInterval;
    this.pingInterval = pingInterval;
    this.pingTimeout = pingTimeout;
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
      this.sendMessage({ type: MessageTypes.MESSAGE, content: "Мое первое сообщение" });
      this.startPing();
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "pong") {
        console.log("пинг от сервера", event);
        this.resetPing();
      } else {
        // console.log("Получено сообщение:", event.data);
      }
    };

    this.socket.onclose = (event) => {
      console.log("Соеднинение закрыто");
      this.stopPing();
      console.log(event.code);

      if (event.reason !== "forced") {
        console.log(" попытка переподключения...");

        this.reconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error("Ошибка вебсокета:", error);
      this.socket?.close();
    };
  }

  private startPing() {
    this.pingTimer = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        console.log("Ответный пинг серверу...");
        this.sendMessage({ type: MessageTypes.PING });
        // this.pingTimeoutHandler();
      }
    }, this.pingInterval);
  }

  // private pingTimeoutHandler() {
  //   setTimeout(() => {
  //     console.warn("Время пинга вышло, закрытие соединения.");
  //     this.socket?.close();
  //   }, this.pingTimeout);
  // }

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
    console.log("Принудительное закрытие сокета");

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
