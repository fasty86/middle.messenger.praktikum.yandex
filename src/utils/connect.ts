import Block from "../framework/Block";
import store from "../framework/Store/Store";
import { StateType } from "../framework/Store/types";
import { DefaultObject, PropsType, StoreEvents } from "../framework/types";
import { isEqual } from "./isEqual";
import { merge } from "./merge";

interface Constructor<T, K> {
  new (props: T): K;
}
export type MapStateReturnType = {
  storedState: DefaultObject;
  component: DefaultObject;
};
export type MapStateFn = (state: StateType) => MapStateReturnType;
// export type MapStateFn = (state: StateType) => DefaultObject;
export function connect<T extends PropsType = PropsType>(mapStateToProps: MapStateFn) {
  return function <K extends Block<T>>(Component: Constructor<T, K>) {
    return class extends (Component as Constructor<T, Block<T>>) {
      constructor(props: T) {
        let state = { ...mapStateToProps(store.getState()).storedState };
        super({ ...(merge(props, mapStateToProps(store.getState()).component) as T) });
        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          const { component, storedState } = mapStateToProps(store.getState());
          const newState = storedState;
          // вызываем обновление компонента, передав данные из хранилища
          if (!isEqual(state, newState)) {
            state = { ...newState };
            this.setProps({ ...component });
          }
        });
      }
    } as unknown as Constructor<T, K>;
  };
}
