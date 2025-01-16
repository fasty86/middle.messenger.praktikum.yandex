import "./chatAreaHeader.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Menu from "../menu/Menu";
import Modal from "../modal/Modal";
import Image from "../image/Image";
import Text from "../Text/Text";
export default class ChatAreaHeader extends Block<ChatAreaHeaderPropsType> {
  render() {
    return `<header class="chat-area__header">
            <nav class="chat-area_navigation">
              <div class="chat-area__user-info">
                {{{Image}}}
                {{{UserName}}}
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
    UserName: Text;
  };
  lists: {
    ModalList: Modal[];
  };
};
