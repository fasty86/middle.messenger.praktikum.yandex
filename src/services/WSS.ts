class WSSTransport {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number;
  private pingInterval: number;
  private pingTimeout: number;
  private pingTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(url: string, reconnectInterval = 5000, pingInterval = 10000, pingTimeout = 5000) {
    this.url = url;
    this.reconnectInterval = reconnectInterval;
    this.pingInterval = pingInterval;
    this.pingTimeout = pingTimeout;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("соединение установлено");
      this.startPing();
    };

    this.socket.onmessage = (event) => {
      if (event.data === "pong") {
        console.log("пинг от сервера");
        this.resetPing();
      } else {
        console.log("Получено сообщение:", event.data);
      }
    };

    this.socket.onclose = () => {
      console.log("Соеднинение закрыто, попытка переподключения...");
      this.stopPing();
      this.reconnect();
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
        this.socket.send("ping");
        this.pingTimeoutHandler();
      }
    }, this.pingInterval);
  }

  private pingTimeoutHandler() {
    setTimeout(() => {
      console.warn("Время пинга вышло, закрытие соединения.");
      this.socket?.close();
    }, this.pingTimeout);
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

  public sendMessage(message: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.warn("Сокет не готов для отправки сообщения");
    }
  }

  public close() {
    this.stopPing();
    this.socket?.close();
  }
}

export default WSSTransport;
