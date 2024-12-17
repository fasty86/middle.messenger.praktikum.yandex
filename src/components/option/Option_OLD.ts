export default `
 <div class="{{this.optionClassName}}" id="{{this.id}}">
   {{> Image data=this.imageData }}
   <span class="{{this.textClassName}}">{{this.text}}</span>
 </div>`;
