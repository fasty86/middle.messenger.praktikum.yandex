import './option.pcss';

export default `
 <div class={{this.optionClassName}}>
   {{> Image data=this.imageData }}
   <span class={{this.textClassName}}>{{this.text}}</span>
 </div>`;
