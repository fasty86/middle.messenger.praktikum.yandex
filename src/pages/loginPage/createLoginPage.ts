import { PropsType } from "../../framework/types";
import Block from "../../framework/Block";
class LoginPage extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return `<div class="app">
                  {{{Navigation}}}
                  <div class="form">
                    <h1>Вход</h1>
                     {{{Form}}}
                  </div>
                </div>`;
  }
}

export { LoginPage };
