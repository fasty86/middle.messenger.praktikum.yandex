import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
import { formGroupType, buttonType, imageType, modalType } from "../types/components.ts";
import { navigateTo } from "../router/router_OLD.ts";
import FormGroup from "../components/formGroup/FormGroup.ts";
import Button from "../components/button/Button.ts";
import Input from "../components/input/Input.ts";
import Label from "../components/label/Label.ts";
import Form from "../components/form/Form.ts";
import Image from "../components/image/Image.ts";
import { NavigationComponent } from "../components/util/Navigation.ts";
import Modal from "../components/modal/Modal.ts";
import Avatar from "../components/avatar/Avatar.ts";
import Tooltip from "../components/tooltip/Tooltip.ts";
import { isInputElement } from "../types/typeguards.ts";
import { Validator } from "../utils/Validator.ts";
export default class ProfileEditData extends AbstractView {
  constructor(protected root: HTMLElement) {
    super(root);
    this.setTitle("Profile");
  }
  async render() {
    this.root.replaceChildren(this.buildComponents().getContent());
  }

  protected buildComponents() {
    const avatarModal = new Modal({
      rootData: {
        title: uploadAvatarModel.title,
      },
      attributes: {
        id: uploadAvatarModel.id,
      },
      childrens: {
        Form: new Form({
          attributes: {
            formClassName: "login__form modal__form",
          },
          events: {
            submit: function (this: Form, e) {
              e.preventDefault();
              this.validateForm();
            },
          },
          lists: {
            Elements: [
              new FormGroup({
                childrens: {
                  Input: new Input({
                    attributes: uploadAvatarModel.formGroup.input,
                    events: {
                      blur: function (this: Input, e) {
                        e.preventDefault();
                        this.validate(Validator.validateMessage);
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
                          text: "пустой путь к файлу",
                        },
                        attributes: {
                          className: "tooltip__modal",
                        },
                      }),
                    },
                  }),
                  Label: new Label({
                    attributes: uploadAvatarModel.formGroup.label,
                  }),
                },
              }),
            ],
          },
          childrens: {
            Button: new Button({
              attributes: uploadAvatarModel.button,
              events: {
                submit: (e) => {
                  e.preventDefault();
                },
              },
            }),
          },
        }),
      },
    });
    const actions: Button[] = [
      new Button({
        attributes: actionButtons[0],
        events: {
          click: () => {},
          submit: (e) => {
            e.preventDefault();
          },
        },
      }),
    ];
    const elements: FormGroup[] = [
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: profileFormData[0].input,
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
                attributes: { className: "tooltip__profile" },
              }),
            },
          }),
          Label: new Label({ attributes: profileFormData[0].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: profileFormData[1].input,
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
                attributes: { className: "tooltip__profile" },
              }),
            },
          }),
          Label: new Label({ attributes: profileFormData[1].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: profileFormData[2].input,
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
                attributes: { className: "tooltip__profile" },
              }),
            },
          }),
          Label: new Label({ attributes: profileFormData[2].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: profileFormData[3].input,
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
                attributes: { className: "tooltip__profile" },
              }),
            },
          }),
          Label: new Label({ attributes: profileFormData[3].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: profileFormData[4].input,
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
                attributes: { className: "tooltip__profile" },
              }),
            },
          }),
          Label: new Label({ attributes: profileFormData[4].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new Input({
            attributes: profileFormData[5].input,
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
                attributes: {
                  className: "tooltip__profile",
                },
              }),
            },
          }),
          Label: new Label({ attributes: profileFormData[5].label }),
        },
      }),
    ];
    const form = new Form({
      events: {
        submit: function (this: Form, e: Event) {
          e.preventDefault();
          this.validateForm();
        },
      },
      attributes: {
        formClassName: "form profile_form",
      },
      lists: {
        Elements: elements,
      },
      childrens: {
        Button: actions[0],
      },
    });
    const page = new Pages.ProfilePage({
      childrens: {
        Button: new Button({
          attributes: sendButton,
          events: {
            click: () => {
              navigateTo("/chat");
            },
          },
        }),
        Avatar: new Avatar({
          attributes: {
            className: "profile__avatar-container",
            id: "avatar_upload_image_id",
          },
          childrens: {
            Image: new Image({
              attributes: avatar,
            }),
          },
          events: {
            click: () => {
              const dialog = document.querySelector("#modal_upload_avatar_id") as HTMLDialogElement;
              super.closeModalOutside(dialog);
              dialog.showModal();
            },
          },
        }),
        Form: form,
        Navigation: NavigationComponent,
        Modal: avatarModal,
      },
      lists: {},
    });
    return page;
  }
}

const profileFormData: Array<formGroupType> = [
  {
    input: {
      className: "input profile__input",
      id: "email_id",
      name: "email",
      placeholder: "",
      type: "email",
      value: "test@yandex.ru",
      disabled: "",
    },
    label: {
      className: "label form__label profile__label",
      forAttr: "email_id",
      text: "Почта",
    },
  },
  {
    input: {
      className: "input profile__input",
      id: "login_id",
      name: "login",
      placeholder: "",
      type: "text",
      value: "test_login",
      disabled: "",
    },
    label: {
      className: "label form__label profile__label",
      forAttr: "login_id",
      text: "Логин",
    },
  },

  {
    input: {
      className: "input profile__input",
      id: "first_name_id",
      name: "first_name",
      placeholder: "",
      type: "text",
      value: "Иван",
      disabled: "",
    },
    label: {
      className: "label form__label profile__label",
      forAttr: "first_name_id",
      text: "Имя",
    },
  },
  {
    input: {
      className: "input profile__input",
      id: "last_name_id",
      name: "second_name",
      placeholder: "",
      type: "text",
      value: "Иванов",
      disabled: "",
    },
    label: {
      className: "label form__label profile__label",
      forAttr: "last_name_id",
      text: "Фамилия",
    },
  },
  {
    input: {
      className: "input profile__input",
      id: "chat_name_id",
      name: "display_name",
      placeholder: "",
      type: "text",
      value: "Иванов",
      disabled: "",
    },
    label: {
      className: "label form__label profile__label",
      forAttr: "chat_name_id",
      text: "Имя в чате",
    },
  },
  {
    input: {
      className: "input profile__input",
      id: "phone_id",
      name: "phone",
      placeholder: "",
      type: "tel",
      value: "+7 (909) 967 30 30",
      disabled: "",
    },
    label: {
      className: "label form__label profile__label",
      forAttr: "phone_id",
      text: "Телефон",
    },
  },
];
const actionButtons: buttonType[] = [
  {
    className: "button form__login-button profile-edit__button",
    disabled: "",
    id: "profile_save_changed_data_id",
    text: "Сохранить",
    type: "submit",
  },
];
const avatar: imageType = {
  alt: "avatar",
  className: "profile_image",
  src: "/avatar_default.png",
};

const sendButton: buttonType = {
  className: "footer__send-button profile__button",
  disabled: "",
  id: "profile_button_back_id",
  text: "",
  type: "button",
};
const uploadAvatarModel: modalType = {
  id: "modal_upload_avatar_id",
  button: {
    className: "button form__login-button modal__button",
    disabled: "",
    id: "upload_avatar_button_id",
    text: "Поменять",
    type: "submit",
  },
  title: "Загрузите файл",
  formGroup: {
    input: {
      className: "upload-avatar__input",
      id: "upload_avatar_input_id",
      name: "file",
      placeholder: "",
      type: "file",
      value: "",
      disabled: "",
    },
    label: {
      className: "upload-avatar__label",
      forAttr: "upload_avatar_input_id",
      text: "Выбрать файл  на компьютере",
    },
  },
};
