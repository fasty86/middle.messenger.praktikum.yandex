import EventBus from "../EventBus";
import { StoreEvents } from "../types";

export type StateType = {
  user?: string;
};
// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state: StateType = {};
  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }
  public set(path: string, value: unknown) {
    // set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
