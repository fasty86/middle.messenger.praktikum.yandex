import EventBus from "../EventBus";
import { StoreEvents } from "../types";
import { ApiStatus, OPaths, STATUS, UserInfoType } from "./types";
import { set as setProp } from "../../utils/setProp";

export type StateType = {
  user: UserInfoType | null;
  statuses: {
    [key in ApiStatus]: STATUS;
  };
};
export type StorePath = OPaths<StateType>;
const initialState: StateType = {
  user: null,
  statuses: {
    [ApiStatus.AVATAR]: STATUS.PENDING,
  },
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
