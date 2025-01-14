import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
import { formGroupType, buttonType, linkType } from "../types/components.ts";
import FormGroup from "../components/formGroup/FormGroup.ts";
import Button from "../components/button/Button.ts";
import Input from "../components/input/Input.ts";
import Label from "../components/label/Label.ts";
import Form from "../components/form/Form.ts";
import Link from "../components/link/Link.ts";
// import { NavigationComponent } from "../components/util/Navigation.ts";
import { isInputElement } from "../types/typeguards.ts";
import { Validator } from "../utils/Validator.ts";
import Tooltip from "../components/tooltip/Tooltip.ts";
import { UserController } from "../framework/store/controllers/userController.ts";
import { UserAuthType } from "../framework/store/types.ts";
import { router } from "../router/router.ts";

export default class RegistrationView extends AbstractView {
  constructor(protected root: HTMLElement) {
    super(root);
    this.setTitle("Registration");
  }
  async render() {
    this.root.replaceChildren(this.block.getContent());
  }
  protected buildComponents() {
    const elements: FormGroup[] = [
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: registrationFormData[0].input,
            events: {
              blur: function (this: Input, e) {
                e.preventDefault();
                this.validate(Validator.validateEmail);
              },
              focus: function (this: Input) {
                this.hideTooltip();
              },
              keyup: function (this: Input, e) {
                if (isInputElement(e.target)) {
                  this.setAtrributies({
                    value: e.target.value ? "nonempty" : "",
                  });
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "латиница, цифры ,- ,_ обязательно должна быть «собака»",
                },
                attributes: { className: "" },
              }),
            },
          }),
          Label: new Label({
            attributes: registrationFormData[0].label,
          }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: registrationFormData[1].input,
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
                  this.setAtrributies({
                    value: e.target.value ? "nonempty" : "",
                  });
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "от 3 до 20 символов, латиница, может содержать цифры",
                },
                attributes: { className: "" },
              }),
            },
          }),
          Label: new Label({
            attributes: registrationFormData[1].label,
          }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: registrationFormData[2].input,
            events: {
              blur: function (this: Input, e) {
                e.preventDefault();
                this.validate(Validator.validateUsername);
              },
              focus: function (this: Input) {
                this.hideTooltip();
              },
              keyup: function (this: Input, e) {
                if (isInputElement(e.target)) {
                  this.setAtrributies({
                    value: e.target.value ? "nonempty" : "",
                  });
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "латиница или кириллица, первая буква должна быть заглавной",
                },
                attributes: { className: "" },
              }),
            },
          }),
          Label: new Label({
            attributes: registrationFormData[2].label,
          }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: registrationFormData[3].input,
            events: {
              blur: function (this: Input, e) {
                e.preventDefault();
                this.validate(Validator.validateUsername);
              },
              focus: function (this: Input) {
                this.hideTooltip();
              },
              keyup: function (this: Input, e) {
                if (isInputElement(e.target)) {
                  this.setAtrributies({
                    value: e.target.value ? "nonempty" : "",
                  });
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "латиница или кириллица, первая буква должна быть заглавной",
                },
                attributes: { className: "" },
              }),
            },
          }),
          Label: new Label({
            attributes: registrationFormData[3].label,
          }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: registrationFormData[4].input,
            events: {
              blur: function (this: Input, e) {
                e.preventDefault();
                this.validate(Validator.validatePhoneNumber);
              },
              focus: function (this: Input) {
                this.hideTooltip();
              },
              keyup: function (this: Input, e) {
                if (isInputElement(e.target)) {
                  this.setAtrributies({
                    value: e.target.value ? "nonempty" : "",
                  });
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
                },
                attributes: { className: "" },
              }),
            },
          }),
          Label: new Label({
            attributes: registrationFormData[4].label,
          }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: registrationFormData[5].input,
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
                  this.setAtrributies({
                    value: e.target.value ? "nonempty" : "",
                  });
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "от 8 до 40 символов,  одна заглавная буква и цифра",
                },
                attributes: { className: "" },
              }),
            },
          }),
          Label: new Label({
            attributes: registrationFormData[5].label,
          }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: registrationFormData[6].input,
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
                  this.setAtrributies({
                    value: e.target.value ? "nonempty" : "",
                  });
                }
              },
            },
            childrens: {
              Tooltip: new Tooltip({
                rootData: {
                  text: "от 8 до 40 символов,  одна заглавная буква и цифра",
                },
                attributes: { className: "" },
              }),
            },
          }),
          Label: new Label({
            attributes: registrationFormData[6].label,
          }),
        },
      }),
    ];
    const form = new Form({
      events: {
        submit: async function (this: Form, e: Event) {
          e.preventDefault();
          const isValid = this.validateForm();
          if (isValid) {
            const formData = new FormData(e.target as HTMLFormElement);
            const payload = Object.fromEntries(formData.entries());
            await UserController.register(payload as UserAuthType);
            await UserController.getUser();
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
            click: () => {},
          },
        }),
        Link: new Link({
          attributes: linkData,
          events: {
            click: function (this: Link, e: Event) {
              e.preventDefault();
              router.go("/");
            },
          },
        }),
      },
      lists: {
        Elements: elements,
      },
    });
    const page = new Pages.RegistrationPage({
      childrens: {
        Form: form,
        // Navigation: NavigationComponent,
      },
    });
    return page;
  }
}

const registrationFormData: Array<formGroupType> = [
  {
    input: {
      className: "input form__input",
      id: "email_id",
      name: "email",
      placeholder: "",
      type: "email",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "email_id",
      text: "Почта",
    },
  },
  {
    input: {
      className: "input form__input",
      id: "login_id",
      name: "login",
      placeholder: "",
      type: "text",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "login_id",
      text: "Логин",
    },
  },

  {
    input: {
      className: "input form__input",
      id: "first_name_id",
      name: "first_name",
      placeholder: "",
      type: "text",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "first_name_id",
      text: "Имя",
    },
  },
  {
    input: {
      className: "input form__input",
      id: "last_name_id",
      name: "second_name",
      placeholder: "",
      type: "text",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "last_name_id",
      text: "Фамилия",
    },
  },
  {
    input: {
      className: "input form__input",
      id: "phone_id",
      name: "phone",
      placeholder: "",
      type: "tel",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "phone_id",
      text: "Телефон",
    },
  },
  {
    input: {
      className: "input form__input",
      id: "first_password_id",
      name: "password",
      placeholder: "",
      type: "password",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "first_password_id",
      text: "Пароль",
    },
  },
  {
    input: {
      className: "input form__input",
      id: "second_password_id",
      name: "passwordConfirm",
      placeholder: "",
      type: "password",
      value: "",
    },
    label: {
      className: "label form__label",
      forAttr: "second_password_id",
      text: "Пароль еще раз",
    },
  },
];

const buttonData: buttonType = {
  className: "button form__registration-button",
  disabled: "false",
  id: "registration_button_id",
  text: "Зарегистрироваться",
  type: "submit",
};
const linkData: linkType = {
  className: "link form__link",
  href: "/login",
  text: "Войти",
};
