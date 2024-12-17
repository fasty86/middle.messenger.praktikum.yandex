import "./button.pcss";
export default `<button id="{{id}}" class="{{className}} type="{{type}}" text={{text}}
{{#if disabled}}
  disabled
{{/if}}>{{text}}</button>`;
