import './menu.pcss';

export default `<div class="options-group">
                <div class={{data.optionGroupclassName}}>
                   {{#each data.items }}
                     {{> Option data=data.items }}
                    {{/each}}
                </div>
                 {{> Button id=data.optionButton.id type=data.optionButton.type text=data.optionButton.text disabled=data.optionButton.disabled className=data.optionButton.className}}
              </div>
             `;
