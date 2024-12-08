import './chatAreaBody.pcss';
export default `<section class="chat-area__body">
            <div class="chat-area__message-date">12 июня</div>   
            <div class="chat-area__message-container">
              {{#each data}}
             {{> Message data=this }}
              {{/each}}
              <div class="chat-area__message">
                <div class="chat-area__message-content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro, debitis molestias?
                </div>
                <div class="chat-area__message-data">11:56</div>
              </div>
            </div>
          </section>`;
