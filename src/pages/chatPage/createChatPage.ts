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
          <section class="chat-area__body">
            <div class="chat-area__message-date">12 июня</div>
            <div class="chat-area__message-container">
              <div class="chat-area__message">
                <div class="chat-area__message-content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro, debitis molestias?
                </div>
                <div class="chat-area__message-data">11:56</div>
              </div>

              <div class="chat-area__message">
                <div class="chat-area__message-content">
                  <img
                    src="photo.png"
                    alt=""
                    class="chat-area__message-image"
                  />
                </div>
                <div class="chat-area__message-data">11:56</div>
              </div>
              <div class="chat-area__message">
                <div class="chat-area__message-content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro, debitis molestias?
                </div>
                <div class="chat-area__message-data">11:56</div>
              </div>
            </div>
          </section>
          <footer class="footer">
            <div class="footer__attach-group">
              <div class="footer__attach-menu">
                <div class="footer__menu-item">
                  <img
                    src="./public/attach_photo.png"
                    alt="photo"
                    class="menu-item__img"
                  /><span class="menu-item__text">Фото или видео</span>
                </div>
                <div class="footer__menu-item">
                  <img
                    src="./public/attach_file.png"
                    alt="file"
                    class="menu-item__img"
                  /><span class="menu-item__text">Файл</span>
                </div>
                <div class="footer__menu-item">
                  <img
                    src="./public/attach_location.png"
                    alt="location"
                    class="menu-item__img"
                  /><span class="menu-item__text">Локация</span>
                </div>
              </div>
              <button class="footer__attach-button"></button>
            </div>
            <input
              type="text"
              class="footer__text-input"
              placeholder="Сообщение"
            />
            <button class="footer__send-button"></button>
          </footer>
        </main>
      </div>
    </div>`;
export { createChatPage as ChatPage };
