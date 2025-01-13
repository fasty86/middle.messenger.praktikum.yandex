import EventBus from "../EventBus";
import { StoreEvents } from "../types";
import { UserInfoType } from "./types";
import { set as setProp } from "../../utils/setProp";
// import { merge } from "../../utils/merge";

export type StateType = {
  user: UserInfoType | null;
};
const initialState: StateType = {
  user: null,
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
  public set(path: string, value: unknown) {
    setProp(this.state, path, value);
    // метод EventBus
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
