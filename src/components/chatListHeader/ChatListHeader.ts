import "./chatListHeader.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ChatListHeader extends Block {
    constructor(props: PropsType) {
        super(props);
    }

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
