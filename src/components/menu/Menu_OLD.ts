import "./menu.pcss";

export default `<div class="options-group">
               {{#with data}}
               <div class="{{optionGroupclassName}}">
                   {{#each items }}
                     {{> Option data=items }}
                    {{/each}}
                </div>
                 {{> Button id=optionButton.id type=optionButton.type text=optionButton.text disabled=optionButton.disabled className=optionButton.className}}
               {{/with}}
              </div>
             `;
