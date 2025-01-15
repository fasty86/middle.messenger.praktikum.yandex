import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
import { formGroupType, buttonType, imageType, modalType } from "../types/components.ts";
// import { navigateTo } from "../router/router_OLD.ts";
import FormGroup from "../components/formGroup/FormGroup.ts";
import Button from "../components/button/Button.ts";
import Input, {
  userDisplayName,
  userEmail,
  userFirstName,
  userLogin,
  userPassword,
  userPhone,
  userSecondName,
} from "../components/input/Input.ts";
import Label from "../components/label/Label.ts";
import Form from "../components/form/Form.ts";
import Image from "../components/image/Image.ts";
// import { NavigationComponent } from "../components/util/Navigation.ts";
import Modal from "../components/modal/Modal.ts";
import Avatar from "../components/avatar/Avatar.ts";
import Tooltip from "../components/tooltip/Tooltip.ts";
import { isInputElement } from "../types/typeguards.ts";
import { Validator } from "../utils/Validator.ts";
import { router } from "../router/router.ts";
import { form as dataForm } from "./profileEditDataView.ts";
import { form as passwordForm } from "./profileEditPasswordView.ts";
import { closeModalOutside } from "../utils/modals.ts";
import store from "../framework/store/Store.ts";
import { UserAvatar } from "../framework/store/types.ts";
import { UserController } from "../framework/store/controllers/userController.ts";
export default class ProfileView extends AbstractView {
  constructor(protected root: HTMLElement) {
    super(root);
    this.setTitle("profile");
  }
  async render() {
    if (!this.block) this.block = this.buildComponents();
    this.root.replaceChildren(this.block.getContent());
  }

  protected buildComponents() {
    console.log("build");
    const actions: Button[] = [
      new Button({
        attributes: actionButtons[0],
        events: {
          click: () => {
            // navigateTo("/profile/edit/data");
            // console.log("btn click");
          },
        },
      }),
      new Button({
        attributes: actionButtons[1],
        events: {
          click: () => {
            // navigateTo("/profile/edit/password");
          },
        },
      }),
      new Button({
        attributes: actionButtons[2],
        events: {
          click: () => {
            console.log("imds");
            const dialog = document.querySelector("#modal_upload_avatar_id") as HTMLDialogElement;
            super.closeModalOutside(dialog);
            dialog.showModal();
          },
        },
      }),
    ];
    const elements: FormGroup[] = [
      new FormGroup({
        childrens: {
          Input: new userEmail({
            attributes: { ...profileFormData[0].input, value: store.getState().user?.email ?? "" },
          }) as Input,
          Label: new Label({ attributes: profileFormData[0].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new userLogin({
            attributes: { ...profileFormData[1].input, value: store.getState().user?.login ?? "" },
          }) as Input,
          Label: new Label({ attributes: profileFormData[1].label }),
        },
      }),
      new FormGroup({
        childrens: {
          // Input: new Input({ attributes: profileFormData[2].input }),
          Input: new userFirstName({
            attributes: { ...profileFormData[2].input, value: store.getState().user?.first_name ?? "" },
          }) as Input,
          Label: new Label({ attributes: profileFormData[2].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new userSecondName({
            attributes: { ...profileFormData[3].input, value: store.getState().user?.second_name ?? "" },
          }) as Input,
          Label: new Label({ attributes: profileFormData[3].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new userDisplayName({
            attributes: { ...profileFormData[4].input, value: store.getState().user?.display_name ?? "" },
          }) as Input,
          Label: new Label({ attributes: profileFormData[4].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new userPhone({
            attributes: { ...profileFormData[5].input, value: store.getState().user?.phone ?? "" },
          }) as Input,
          Label: new Label({ attributes: profileFormData[5].label }),
        },
      }),
      new FormGroup({
        childrens: {
          Input: new userPassword({
            attributes: { ...profileFormData[6].input, value: store.getState().user?.password ?? "" },
          }) as Input,
          Label: new Label({ attributes: profileFormData[6].label }),
        },
      }),
    ];
    const form = new Form({
      attributes: {
        formClassName: "profile_form",
      },
      lists: {
        Elements: elements,
      },
      childrens: {},
    });
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
            submit: async function (this: Form, e) {
              e.preventDefault();
              const isValid = this.validateForm();
              if (isValid) {
                const file: File = new FormData(e.target as HTMLFormElement).get("file") as File;
                const formData = new FormData();
                formData.append("avatar", file);
                const result = await UserController.avatar(formData as UserAvatar);
                console.log("avatar loading:", result);
              }
            },
          },
          lists: {
            Elements: [
              new FormGroup({
                childrens: {
                  Input: new Input({
                    attributes: uploadAvatarModel.formGroup.input,
                    events: {
                      change: function (this: Input, e) {
                        e.preventDefault();
                      },
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
                events: {
                  change: function (this: FormGroup, e) {
                    if (isInputElement(e.target)) {
                      const path = e.target.value.split("\\").pop();
                      const label = this.childrens.Label;
                      label.setAtrributies({ text: String(path) });
                    }
                  },
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
    const page = new Pages.ProfilePage({
      childrens: {
        Button: new Button({
          attributes: sendButton,
          events: {
            click: () => {
              router.go("/messenger");
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
            click: function (this: Avatar) {
              const dialog = document.querySelector("#modal_upload_avatar_id") as HTMLDialogElement;
              closeModalOutside(dialog);
              dialog.showModal();
            },
          },
        }),
        Form: form,
        // Navigation: NavigationComponent,
        Modal: avatarModal,
      },
      lists: {
        ActionButtons: actions,
      },
      events: {
        click: function (this: Pages.ProfilePage, e: Event) {
          if (e.target && "id" in e.target) {
            if (e.target.id === "profile_edit_button_id") {
              this.setLists({
                lists: { ActionButtons: [] },
              });
              this.setChildrens({
                childrens: { Form: dataForm },
              });
            } else if (e.target.id === "profile_change_password_button_id") {
              this.setLists({
                lists: { ActionButtons: [] },
              });
              this.setChildrens({
                childrens: { Form: passwordForm },
              });
            }
          }
        },
      },
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
      disabled: "disabled",
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
      disabled: "disabled",
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
      disabled: "disabled",
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
      disabled: "disabled",
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
      disabled: "disabled",
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
      disabled: "disabled",
    },
    label: {
      className: "label form__label profile__label",
      forAttr: "phone_id",
      text: "Телефон",
    },
  },
  {
    input: {
      className: "input profile__input",
      id: "first_password_id",
      name: "password",
      placeholder: "",
      type: "password",
      value: "12345",
      disabled: "disabled",
    },
    label: {
      className: "label form__label profile__label",
      forAttr: "first_password_id",
      text: "Пароль",
    },
  },
];
const actionButtons: buttonType[] = [
  {
    className: "profile__action-button",
    disabled: "",
    id: "profile_edit_button_id",
    text: "Изменить данные",
    type: "button",
  },
  {
    className: "profile__action-button",
    disabled: "",
    id: "profile_change_password_button_id",
    text: "Изменить пароль",
    type: "button",
  },
  {
    className: "profile__action-button",
    disabled: "",
    id: "profile_exit_button_id",
    text: "Выйти",
    type: "button",
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
      text: "Выбрать файл  ",
    },
  },
};
