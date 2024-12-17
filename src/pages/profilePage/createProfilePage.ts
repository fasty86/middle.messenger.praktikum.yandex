import "./profile.pcss";
import { PropsType } from "../../framework/types";
import Block from "../../framework/Block";
class ProfilePage extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return `<div class="app">
        {{{Navigation}}}
        <div class="container profile__container">
        <aside class="profile_aside">
         {{{Button}}}
        </aside>
         <main class="profile__main">
           {{{Avatar}}}
        <h1 class="profile__username">{{username}}</h1>
        <div id="profile_form_id" class="form profile_form">
          {{{Form}}}
          </div>
          <div class="profile__actions">
          {{{ActionButtons}}}
          {{{Modal}}}
          </div>
          </main>
        </div>
        </div>`;
  }
}

export { ProfilePage };
