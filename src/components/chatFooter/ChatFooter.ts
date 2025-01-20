import "./chatFooter.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Form from "../form/Form";
import Menu from "../menu/Menu";
import Modal from "../modal/Modal";
export default class ChatFooter extends Block<ChatFooterPropsType> {
  render() {
    return `<footer class="footer">
            {{{Menu}}}
            {{{Form}}}
            {{{ModalList}}}
          </footer>`;
  }
}

type ChatFooterPropsType = PropsType & {
  childrens: {
    Menu: Menu;
    Form: Form;
  };
  lists?: {
    ModalList: Modal[];
  };
};
