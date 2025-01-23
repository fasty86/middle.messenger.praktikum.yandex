import EventBus from "../EventBus";
import { StoreEvents } from "../types";
import { ApiStatus, ChatListType, OPaths, STATUS, UserChatInfo, UserInfoType } from "./types";
import { set as setProp } from "../../utils/setProp";
import WSSTransport, { responseMessageType } from "../../services/WSS";

export type StateType = {
  user: UserInfoType | null;
  statuses: {
    [key in ApiStatus]: STATUS;
  };
  chatList: ChatListType;
  activeChat: {
    chatId: number | null;
    token: string;
    socket: WSSTransport;
    messages: responseMessageType[];
    users: UserChatInfo[];
  } | null;
};
export type StorePath = OPaths<StateType>;
const initialState: StateType = {
  user: null,
  chatList: [],
  statuses: {
    [ApiStatus.AVATAR]: STATUS.PENDING,
    [ApiStatus.FILE]: STATUS.PENDING,
    [ApiStatus.USER_ADD]: STATUS.PENDING,
    [ApiStatus.USER_DELETE]: STATUS.PENDING,
  },
  activeChat: null,
};
// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state = initialState;

  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }
  public set(path: StorePath, value: unknown) {
    setProp(this.state, path, value);
    console.log("update state :", this.state);
    this.emit(StoreEvents.Updated);
  }
  public set_new_message(message: responseMessageType) {
    if (this.state.activeChat) {
      // this.state.activeChat.messages.push(message);
      this.emit(StoreEvents.NEW_MESSAGE, message);
    }
  }
}
const store = new Store();
export default store;
