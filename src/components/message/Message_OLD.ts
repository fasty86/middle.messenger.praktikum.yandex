import "./message.pcss";

export default `<div class="chat-area__message">
                <div class="chat-area__message-content">
                  {{#if (ifEquals data.contentType "text")}}
                  {{data.content}}
                  {{else}}
                  {{> Image data=data.content}}
                  {{/if}}
                </div>
                <div class="chat-area__message-data">{{data.date}}</div>
              </div>`;
