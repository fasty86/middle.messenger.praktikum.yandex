import "./chatListItem.pcss";
export default `<li class="chat-list__item">
              {{> Image data=this.imageData }}
                <div class="chat-list__info">
                  <span class="chat-list__name">{{this.username}}</span>
                  <span class="chat-list__message">
                    {{this.message}}
                  </span>
                </div>
                <div class="chat-list__data">
                  <div class="chat-list__time">{{this.time}}</div>
                  <div class="chat-list__unread-message">{{this.unreadMessages}}</div>
                </div>
                </li>`;
