import "./chatListHeader.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Link from "../link/Link";
import Search from "../search/Search";
import Button from "../button/Button";
import Modal from "../modal/Modal";
export default class ChatListHeader extends Block<ChatListHeaderPropsType> {
  render() {
    return `<header class="header">
            <nav class="header__nav">
             {{{Link}}}
              <div class="header__search-container">
                <i class="header__search-icon"></i>
              {{{Search}}}
              {{{CreateChat}}}
              {{{CreateChatModal}}}
              </div>
            </nav>
          </header>
`;
  }
}

type ChatListHeaderPropsType = PropsType & {
  childrens: {
    Link: Link;
    Search: Search;
    CreateChat: Button;
    CreateChatModal: Modal;
  };
};
