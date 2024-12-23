import "./chatAreaHeader.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Menu from "../menu/Menu";
import Modal from "../modal/Modal";
import Image from "../image/Image";
export default class ChatAreaHeader extends Block<ChatAreaHeaderPropsType> {
  render() {
    return `<header class="chat-area__header">
            <nav class="chat-area_navigation">
              <div class="chat-area__user-info">
                {{{Image}}}
                <p class="user-info__name">{{userData}}</p>
              </div>
              {{{Menu}}}
              {{{ModalList}}}
            </nav>
          </header>
`;
  }
}

type ChatAreaHeaderPropsType = PropsType & {
  childrens: {
    Image: Image;
    Menu: Menu;
  };
  lists: {
    ModalList: Modal[];
  };
  rootData: { userData: string };
};
