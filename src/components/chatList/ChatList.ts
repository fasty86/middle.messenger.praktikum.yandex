import './chatList.pcss';

export default `<main class="chat-list">
            <ul class="chat-list__container">
           {{#each chatListItem}}
           {{> ChatListItem data=chatListItem }}
           {{/each}}
            </ul>
          </main>`;
