import './menu.pcss';

export default `<div class="options-group">
                <div class={{data.optionGroupclassName}}>
                   {{#each data.items }}
                     {{> Option data=data.items }}
                    {{/each}}
                </div>
                <button class="chat-area__header-options"></button>
              </div>`;
