import './profile.pcss';
const profilePageTemplate = `<div class="app">
{{> Navigation}}
<div class="container profile__container">
<aside class="profile_aside">
 {{> Button text=sendButton.text id=sendButton.id type=sendButton.type className=sendButton.className disabled=sendButton.disabled}}
</aside>
 <main class="profile__main">
   <div class="profile__avatar-container" id="avatar_upload_image_id">
   {{> Image data=avatar}}   
</div>
<h1 class="profile__username">{{username}}</h1>
<div id="profile_form_id" class="form profile_form">
 {{> Form  formGroup=data button=button link=link}}
  </div>
  <div class="profile__actions">
   {{#each actionButtons }}
    {{> Button text=this.text id=this.id type=this.type className=this.className disabled=this.disabled}}
  {{/each}}
  {{> Modal  data=modal}}
  </div>
  </main>
</div>
</div>`;
export { profilePageTemplate as ProfilePage };
