import "./form.pcss";
export default `<form class={{formClassName}}>
          {{#each formGroup}}
          <div class="form__group">
            {{> Input id=this.input.id name=this.input.name type=this.input.type placeholder=this.input.placeholder value=this.input.value  className=this.input.className disabled=this.input.disabled}}
            {{> Label forAttr=this.label.forAttr text=this.label.text className=this.label.className}}
             </div>
          {{/each}}
            {{#if button}}
              {{> Button id=button.id type=button.type text=button.text disabled=button.disabled className=button.className}}
              {{> Link href=link.href text=link.text className=link.className}}
            {{/if}}
    </form>`;
