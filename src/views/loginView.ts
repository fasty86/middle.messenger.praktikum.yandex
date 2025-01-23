import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
import { formGroupType, buttonType, linkType } from "../types/components.ts";
import FormGroup from "../components/formGroup/FormGroup.ts";
import Button from "../components/button/Button.ts";
import Input, { userLogin } from "../components/input/Input.ts";
import Label from "../components/label/Label.ts";
import Form from "../components/form/Form.ts";
import Link from "../components/link/Link.ts";
import { isInputElement } from "../types/typeguards.ts";
import { Validator } from "../utils/Validator.ts";
import Tooltip from "../components/tooltip/Tooltip.ts";
import { router } from "../router/router.ts";
import { UserController } from "../framework/store/controllers/userController.ts";
import { UserLoginType } from "../framework/store/types.ts";
import store from "../framework/store/Store.ts";
export default class LoginView extends AbstractView {
  constructor(protected root: HTMLElement) {
    super(root);
    this.setTitle("Login");
  }
  async render() {
    if (!this.block) this.block = this.buildComponents();
    this.root.replaceChildren(this.block.getContent());
  }

  protected buildComponents() {
    const elements: FormGroup[] = [
      new FormGroup({
        childrens: {
          Input: new userLogin({
            attributes: { ...loginFormData[0].input, value: store.getState().user?.login ?? "" },
            events: {
              blur: function (this: Input, e) {
                e.preventDefault();
                this.validate(Validator.validateLogin);
              },
              focus: function (this: Input) {
                this.hideTooltip();
              },
              keyup: function (this: Input, e) {
                if (isInputElement(e.target)) {
                  e.target.setAttribute("value", e.target.value);
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "от 3 до 20 символов, латиница/кириллица,",
                },
                attributes: { className: "" },
              }),
            },
          }) as Input,
          Label: new Label({ attributes: loginFormData[0].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: loginFormData[1].input,
            events: {
              blur: function (this: Input, e) {
                e.preventDefault();
                this.validate(Validator.validatePassword);
              },
              focus: function (this: Input) {
                this.hideTooltip();
              },
              keyup: function (this: Input, e) {
                if (isInputElement(e.target)) {
                  e.target.setAttribute("value", e.target.value);
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "от 8 до 40 символов, хотя бы одна заглавная буква и цифра",
                },
                attributes: {
                  className: "",
                },
              }),
            },
          }),
          Label: new Label({ attributes: loginFormData[1].label }),
        },
      }),
    ];
    const form = new Form({
      events: {
        submit: async function (this: Form, e) {
          e.preventDefault();
          const isValid = this.validateForm();
          if (isValid) {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());
            const response = await UserController.login(payload as UserLoginType);
            if (response) {
              await UserController.getUser();
              form.reset();
              router.go("/messenger");
            }
          }
        },
      },
      attributes: {
        formClassName: "login__form",
      },
      childrens: {
        Button: new Button({
          attributes: buttonData,
          events: {
            submit: function (e) {
              e.preventDefault();
            },
            click: () => {},
          },
        }),
        Link: new Link({
          attributes: linkData,
          events: {
            click: function (this: Link, e: Event) {
              e.preventDefault();
              router.go("/sign-up");
            },
          },
        }),
      },
      lists: {
        Elements: elements,
      },
    });
    const page = new Pages.LoginPage({
      childrens: {
        Form: form,
      },
    });
    return page;
  }
}

const loginFormData: Array<formGroupType> = [
  {
    input: {
      className: "input form__input",
      id: "name_id",
      name: "login",
      placeholder: "",
      type: "text",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "name_id",
      text: "Логин",
    },
  },
  {
    input: {
      className: "input form__input",
      id: "password_id",
      name: "password",
      placeholder: "",
      type: "password",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "password_id",
      text: "Пароль",
    },
  },
];

const buttonData: buttonType = {
  className: "button form__login-button",
  disabled: "false",
  id: "login_button_id",
  text: "Авторизоваться",
  type: "submit",
};
const linkData: linkType = {
  className: "link form__link",
  href: "/sign-up",
  text: "Нет аккаунта?",
};
