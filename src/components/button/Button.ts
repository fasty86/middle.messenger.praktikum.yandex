import './button.pcss';
export default `<button id="{{id}}" class="{{className}}" 
{{#if disabled}}
  disabled
{{/if}}>{{text}}</button>`;
