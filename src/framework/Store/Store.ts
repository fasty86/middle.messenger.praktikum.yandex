import EventBus from "../EventBus";
import { StoreEvents } from "../types";
import { ApiStatus, StateType, STATUS, StorePath } from "./types";
import { set as setProp } from "../../utils/setProp";
import { responseMessageType } from "../../services/WSS";

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
const initialState: StateType = {
  chatInterValId: null,
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
    this.emit(StoreEvents.Updated);
  }
  public set_new_message(message: responseMessageType) {
    if (this.state.activeChat) {
      this.emit(StoreEvents.NEW_MESSAGE, message);
    }
  }
}
export const store = new Store();
export default store;
