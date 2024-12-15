import "./chat.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ChatPage extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<div class="app">
        {{{Navigation}}}
      <div class="container">
        <aside class="aside">
        {{{ChatListHeader}}}
        {{{ChatList}}}
        </aside>
        <main class="chat-area">
          <header class="chat-area__header">
            {{{ChatAreaHeader}}}
          </header>
          {{{ChatAreaBody}}}
          {{{ChatFooter}}}
        </main>
      </div>
    </div>`;
    }
}
export { ChatPage };
