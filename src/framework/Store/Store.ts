import EventBus from "../EventBus";
import { StoreEvents } from "../types";
import { ApiStatus, ChatListType, OPaths, STATUS, UserInfoType } from "./types";
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
}
const store = new Store();
// setTimeout(() => store.set("user", { email: "12424@gmail.com", login: "fsdfsdf" }), 5000);
export default store;
