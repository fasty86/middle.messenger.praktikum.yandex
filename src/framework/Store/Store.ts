import { isFunction } from "../../types/typeguards";
import EventBus from "../EventBus";
import { BusEvents } from "../types";
import stateActions from "./actions";
import stateMutations from "./mutations";

export default class Store {
  actions: Actions;
  mutations: Mutations;
  status: StateStatus = "ожидание";
  eventBus: EventBus = new EventBus();
  state: State;
  constructor(props: StateProps) {
    this.actions = props.actions;
    this.mutations = props.mutations;
    this.status = "ожидание";
    this.state = this.proxyfy(props.state);
  }

  private proxyfy<T extends object>(state: T) {
    const that = this;

    return new Proxy(state, {
      get(state, key: Exclude<keyof T, number>) {
        const value = state[key];
        if (isFunction(value)) return value.bind(state);
        else return value;
      },
      set(state, key: Exclude<keyof T, number>, value) {
        const oldState = { ...state };
        state[key] = value;
        that.eventBus.emit(BusEvents.STATE_CHANGE, oldState, state);
        that.status = "ожидание";
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  dispatch(actionKey: ActionKeys, payload: unknown) {
    if (typeof this.actions[actionKey] !== "function") {
      throw new Error(`Нет действия: ${actionKey}`);
    }
    this.status = "действие";
    this.actions[actionKey](this, payload);
    return true;
  }

  commit(mutationKey: MutationKeys, payload: unknown) {
    if (typeof this.mutations[mutationKey] !== "function") {
      throw new Error(`Нет мутации: ${mutationKey}`);
    }
    this.status = "обновление";
    this.mutations[mutationKey](this.state, payload);
    return true;
  }
}

export enum ActionKeys {
  CREATE_USER = "CREATE_USER",
  DELETE_USER = "DELETE_USER",
  UPDATE_USER = "UPDATE_USER",
  GET_USER = "GET_USER",
}
export enum MutationKeys {
  CREATE_CHAT = "CREATE_CHAT",
  DELETE_CHAT = "DELETE_CHAT",
  UPDATE_CHAT = "UPDATE_CHAT",
  GET_CHAT = "GET_CHAT",
}
export type Actions = {
  [key in ActionKeys]?: (store: Store, payload: unknown) => void;
};
export type Mutations = {
  [key in MutationKeys]?: (store: State, payload: unknown) => void;
};
type StateStatus = "ожидание" | "действие" | "обновление";

type StateProps = {
  actions: Actions;
  mutations: Mutations;
  state: State;
};

export type State = {
  [key: string]: unknown;
};

const store = new Store({
  actions: stateActions,
  mutations: stateMutations,
  state: {
    test: "hello",
  },
});

export { store };
