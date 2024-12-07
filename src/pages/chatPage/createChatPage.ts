import './chat.pcss';
const createChatPage = `<div class="app">
      <div class="container">
        <aside class="aside">
        {{> ChatListHeader data=chatListHeaderData }}
        {{> ChatList chatListItem=chatListData }}
        </aside>
        <main class="chat-area">
          <header class="chat-area__header">
            {{> ChatAreaHeader chatAreaHeaderData=chatAreaHeaderData }}
          </header>
          {{> ChatAreaBody data=messageData}}
          {{> ChatFooter footerData=footerData}}
        </main>
      </div>
    </div>`;
export { createChatPage as ChatPage };
