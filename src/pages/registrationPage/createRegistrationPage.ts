import { PropsType } from "../../framework/types";
import Block from "../../framework/Block";
class RegistrationPage extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<div class="app">
                  {{{Navigation}}}
                  <div class="form">
                    <h1>Регистрация</h1>
                     {{{Form}}}
                  </div>
                </div>`;
    }
}

export { RegistrationPage };

// const registartionPageTemplate = `<div class="app">
// <div class="form">
//   <h1>Регистрация</h1>
//     {{> Form  formGroup=data button=button link=link}}
//   </div>

// </div>`;
// export { registartionPageTemplate as RegistrationPage };
