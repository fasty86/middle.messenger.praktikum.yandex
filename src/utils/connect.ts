import Button from "../components/button/Button";
import ChatAreaBody from "../components/chatAreaBody/ChatAreaBody";
import ChatFooter from "../components/chatFooter/ChatFooter";
import ChatAreaHeader from "../components/chatLAreaHeader/ChatAreaHeader";
import ChatList from "../components/chatList/ChatList";
import ChatListHeader from "../components/chatListHeader/ChatListHeader";
import ChatListItem from "../components/chatListItem/ChatListItem";
import Form from "../components/form/Form";
import FormGroup from "../components/formGroup/FormGroup";
import Input, { InputPropsType } from "../components/input/Input";
import Label from "../components/label/Label";
import Link from "../components/link/Link";
import Menu from "../components/menu/Menu";
import Message from "../components/message/Message";
import Modal from "../components/modal/Modal";
import Search from "../components/search/Search";
import Tooltip from "../components/tooltip/Tooltip";
import Block from "../framework/Block";
import store, { StateType } from "../framework/store/Store";
import { DefaultObject, PropsType, StoreEvents } from "../framework/types";

// interface Constructor<T, K> {
//   new (props: T): K;
// }
export function connect<T extends PropsType = PropsType>(mapStateToProps: (state: StateType) => DefaultObject) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: T) {
        super({ ...props, ...mapStateToProps(store.getState()) });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // вызываем обновление компонента, передав данные из хранилища
          // this.setProps({ ...mapStateToProps(store.getState()) });
          console.log({ ...mapStateToProps(store.getState()) });
        });
      }
    };
  };
}

export const withUserFisrtName = connect<InputPropsType>((state) => ({
  first_name: state.user?.first_name ?? "Guest",
}));

export type blockClassTypes =
  | Input
  | Button
  | ChatAreaBody
  | ChatFooter
  | ChatAreaHeader
  | ChatList
  | ChatListHeader
  | ChatListItem
  | Form
  | FormGroup
  | Input
  | Label
  | Link
  | Menu
  | Message
  | Modal
  | Search
  | Tooltip;

export type ConstructableBlock<T extends Block = Block, P extends PropsType = PropsType> = new (props: P) => T;
