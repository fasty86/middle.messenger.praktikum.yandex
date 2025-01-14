import { PropsType } from "../../framework/types";
import Block from "../../framework/Block";
import { UserController } from "../../framework/store/controllers/userController";
import { userData } from "../../services/api/user-api";
const testuser: userData = {
  first_name: "test",
  second_name: "test",
  login: "hobo86testPractickum",
  email: "hobo86testPractickum@yandex.ru",
  password: "12345",
  phone: "1234567890",
};
class LoginPage extends Block {
  constructor(props: PropsType) {
    super(props);
    // UserController.register(testuser);
    UserController.login({
      login: testuser.login,
      password: testuser.password,
    });
    // UserController.getUser();
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
