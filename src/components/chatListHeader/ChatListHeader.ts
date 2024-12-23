import "./chatListHeader.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Link from "../link/Link";
import Search from "../search/Search";
export default class ChatListHeader extends Block<ChatListHeaderPropsType> {
  render() {
    return `<header class="header">
            <nav class="header__nav">
             {{{Link}}}
              <div class="header__search-container">
                <i class="header__search-icon"></i>
              {{{Search}}}
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
  };
};
