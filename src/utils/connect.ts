import Button from "../components/button/Button";
// import ChatAreaBody from "../components/chatAreaBody/ChatAreaBody";
// import ChatFooter from "../components/chatFooter/ChatFooter";
// import ChatAreaHeader from "../components/chatLAreaHeader/ChatAreaHeader";
// import ChatList from "../components/chatList/ChatList";
// import ChatListHeader from "../components/chatListHeader/ChatListHeader";
// import ChatListItem from "../components/chatListItem/ChatListItem";
// import Form from "../components/form/Form";
// import FormGroup from "../components/formGroup/FormGroup";
import Input from "../components/input/Input";
import Text from "../components/Text/Text";
// import Label from "../components/label/Label";
// import Link from "../components/link/Link";
// import Menu from "../components/menu/Menu";
// import Message from "../components/message/Message";
// import Modal from "../components/modal/Modal";
// import Search from "../components/search/Search";
// import Tooltip from "../components/tooltip/Tooltip";
import Block from "../framework/Block";
import store, { StateType } from "../framework/store/Store";
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
        // let state = { ...mapStateToProps(store.getState()) };
        super({ ...(merge(props, mapStateToProps(store.getState()).component) as T) });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          const { component, storedState } = mapStateToProps(store.getState());
          const newState = storedState;
          // вызываем обновление компонента, передав данные из хранилища
          if (this instanceof Text) {
            console.log("Not equal", state, newState);
          }
          if (!isEqual(state, newState)) {
            // if (this instanceof Text) {
            //   console.log("Not equal", state, newState);
            // }

            state = { ...newState };
            this.setProps({ ...component });
          }
        });
      }
    } as unknown as Constructor<T, K>;
  };
}

export type blockClassTypes = typeof Input | typeof Button | typeof Text;

export type ConstructableBlock<T extends Block = Block, P extends PropsType = PropsType> = new (props: P) => T;
