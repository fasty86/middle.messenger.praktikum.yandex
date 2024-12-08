import './modal.pcss';
export default `
<dialog  class="dialog" id="{{data.id}}">
<div class="dialog__container">
  <h3 class="modal__title">{{data.title}}</h3>
   <div class="form__group">
   {{#with data.formGroup}}
          {{> Input id=input.id name=input.name type=input.type placeholder=input.placeholder value=input.value  className=input.className disabled=input.disabled}}
          {{> Label forAttr=label.forAttr text=label.text className=label.className}}
        {{/with}}
             </div>
  {{> Button id=data.button.id type=data.button.type text=data.button.text disabled=data.button.disabled className=data.button.className}}
 </div>
 </dialog>`;
