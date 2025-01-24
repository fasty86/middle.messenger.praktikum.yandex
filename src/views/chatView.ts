import AbstractView from "./abstractView";
import * as Pages from "../pages/index.ts";
import {
  chatListHeaderType,
  menuType,
  headerInfoType,
  footerType,
  buttonType,
  modalType,
} from "../types/components.ts";
import ChatListHeader from "../components/chatListHeader/ChatListHeader.ts";
import Link from "../components/link/Link.ts";
import Search from "../components/search/Search.ts";
import Input from "../components/input/Input.ts";

import Image, { userAvatar } from "../components/image/Image.ts";
import ChatAreaHeader from "../components/chatLAreaHeader/ChatAreaHeader.ts";
import Menu from "../components/menu/Menu.ts";
import Option from "../components/option/Option.ts";
import Button from "../components/button/Button.ts";
import Modal from "../components/modal/Modal.ts";
import FormGroup from "../components/formGroup/FormGroup.ts";
import Label from "../components/label/Label.ts";

import ChatFooter from "../components/chatFooter/ChatFooter.ts";
import Form from "../components/form/Form.ts";
import Tooltip from "../components/tooltip/Tooltip.ts";
import { isInputElement } from "../types/typeguards.ts";
import { Validator } from "../utils/Validator.ts";
import Text, {
  modalFileUploadTitle,
  modalUserAddTitle,
  modalUserDeleteTitle,
  userName,
} from "../components/Text/Text.ts";
import { router } from "../router/router.ts";
import store from "../framework/Store/Store.ts";
import { closeModalOutside } from "../utils/modals.ts";
import { ChatController } from "../framework/Store/controllers/chatController.ts";
import { chats } from "../components/chatList/ChatList.ts";
import { MessageListWithData } from "../components/chatAreaBody/ChatAreaBody.ts";

export default class ChatView extends AbstractView {
  constructor(protected root: HTMLElement) {
    super(root);
    this.setTitle("Chat");
  }
  async render() {
    if (!this.block) this.block = this.buildComponents();
    this.root.replaceChildren(this.block.getContent());
  }
  protected buildComponents() {
    const uploadFileModal = new Modal({
      attributes: {
        id: uploadFileModel.id,
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
                const form = e.target as HTMLFormElement;
                const file: File = new FormData(form).get("file") as File;
                const formData = new FormData();
                formData.append("resource", file);
                const response = await ChatController.send_file_message(formData);
                if (response) {
                  form.reset();
                  const formGroup = this.lists.Elements[0] as FormGroup;
                  if (formGroup.childrens.Input.getContent())
                    formGroup.childrens.Input.getContent().setAttribute("value", "");
                  const label = formGroup.childrens.Label;
                  label.setAtrributies({ text: "Выбрать файл" });
                }
              }
            },
          },
          lists: {
            Elements: [
              new FormGroup({
                childrens: {
                  Input: new Input({
                    attributes: uploadFileModel.formGroup.input,
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
                          e.target.setAttribute("value", e.target.value);
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
                    attributes: uploadFileModel.formGroup.label,
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
              attributes: uploadFileModel.button,
              events: {
                submit: (e) => {
                  e.preventDefault();
                },
              },
            }),
          },
        }),
        Title: new modalFileUploadTitle({}) as Text,
      },
    });
    const addChatModal = new Modal({
      attributes: {
        id: addChatConfig.modal.id,
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
                const chat_name: string = new FormData(e.target as HTMLFormElement).get("chat_name") as string;
                await ChatController.create_chat(chat_name);
                await ChatController.get_chat_list();
              }
            },
          },
          lists: {
            Elements: [
              new FormGroup({
                childrens: {
                  Input: new Input({
                    attributes: addChatConfig.modal.formGroup.input,
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
                          e.target.setAttribute("value", e.target.value);
                        }
                      },
                    },
                    childrens: {
                      Tooltip: new Tooltip({
                        rootData: {
                          text: "введите название чата",
                        },
                        attributes: {
                          className: "tooltip__modal",
                        },
                      }),
                    },
                  }),
                  Label: new Label({
                    attributes: addChatConfig.modal.formGroup.label,
                  }),
                },
              }),
            ],
          },
          childrens: {
            Button: new Button({
              attributes: addChatConfig.modal.button,
              events: {
                submit: (e) => {
                  e.preventDefault();
                },
              },
            }),
          },
        }),
        Title: new Text({
          rootData: {
            text: "Добавить чат",
          },
          attributes: {
            Tag: "p",
            className: "modal__title",
          },
        }),
      },
    });
    const chatListHeader = new ChatListHeader({
      childrens: {
        Link: new Link({
          attributes: {
            href: "/settings",
            text: "Профиль",
            className: "link header__profile-link",
          },
          events: {
            click: function (this: Link, e: Event) {
              e.preventDefault();
              router.go("/settings");
            },
          },
        }),
        Search: new Search({
          childrens: {
            Input: new Input({
              attributes: chatListHeaderData.search,
            }),
          },
        }),
        CreateChat: new Button({
          attributes: addChatConfig.button,
          events: {
            click: function (this: Button) {
              const dialog = document.querySelector("#model_add_chat_id") as HTMLDialogElement;
              closeModalOutside(dialog);
              dialog.showModal();
            },
          },
        }),
        CreateChatModal: addChatModal,
      },
    });

    const chatList = new chats({});
    const headerMenu = new Menu({
      attributes: {
        optionGroupclassName: headerOptions.optionGroupclassName,
      },
      lists: {
        Options: [
          new Option({
            attributes: {
              optionClassName: headerOptions.items[0].optionClassName,
              id: headerOptions.items[0].id,
              textClassName: headerOptions.items[0].textClassName,
            },
            rootData: {
              text: headerOptions.items[0].text,
            },
            childrens: {
              Image: new Image({
                attributes: headerOptions.items[0].imageData,
              }),
            },
            events: {
              click: () => {
                const dialog = document.querySelector("#model_add_user_id") as HTMLDialogElement;
                super.closeModalOutside(dialog);
                dialog.showModal();
              },
            },
          }),
          new Option({
            attributes: {
              optionClassName: headerOptions.items[1].optionClassName,
              id: headerOptions.items[1].id,
              textClassName: headerOptions.items[1].textClassName,
            },
            rootData: {
              text: headerOptions.items[1].text,
            },
            childrens: {
              Image: new Image({
                attributes: headerOptions.items[1].imageData,
              }),
            },
            events: {
              click: () => {
                const dialog = document.querySelector("#model_delete_user_id") as HTMLDialogElement;
                super.closeModalOutside(dialog);
                dialog.showModal();
              },
            },
          }),
        ],
      },
      childrens: {
        Button: new Button({
          attributes: headerOptions.optionButton,
          events: {
            click: () => {
              document.querySelector(".header-options__menu")?.classList.toggle("hidden");
            },
          },
        }),
      },
    });
    const modals = [
      new Modal({
        attributes: {
          id: headerOptions.modal[0].id,
        },
        childrens: {
          Form: new Form({
            events: {
              submit: async function (this: Form, e) {
                e.preventDefault();
                const isValid = this.validateForm();
                if (isValid) {
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const login = formData.get("login") as string;
                  await ChatController.add_user_to_chat(login || "");
                  const formGroup = this.lists.Elements[0] as FormGroup;
                  form.reset();
                  if (formGroup.childrens.Input.getContent())
                    formGroup.childrens.Input.getContent().setAttribute("value", "");
                }
              },
            },
            attributes: {
              formClassName: "login__form modal__form",
            },
            lists: {
              Elements: [
                new FormGroup({
                  childrens: {
                    Input: new Input({
                      attributes: headerOptions.modal[0].formGroup.input,
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
                            text: "от 3 до 20 символов, латиница/кириллица",
                          },
                          attributes: {
                            className: "",
                          },
                        }),
                      },
                    }),
                    Label: new Label({
                      attributes: headerOptions.modal[0].formGroup.label,
                    }),
                  },
                }),
              ],
            },
            childrens: {
              Button: new Button({
                attributes: headerOptions.modal[0].button,
                events: {
                  submit: (e) => {
                    e.preventDefault();
                  },
                },
              }),
            },
          }),
          Title: new modalUserAddTitle({}),
        },
      }),
      new Modal({
        attributes: {
          id: headerOptions.modal[1].id,
        },
        childrens: {
          Form: new Form({
            events: {
              submit: async function (this: Form, e) {
                e.preventDefault();
                const isValid = this.validateForm();
                if (isValid) {
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const login = formData.get("login") as string;
                  await ChatController.delete_user_from_chat(login || "");
                  const formGroup = this.lists.Elements[0] as FormGroup;
                  form.reset();
                  if (formGroup.childrens.Input.getContent())
                    formGroup.childrens.Input.getContent().setAttribute("value", "");
                }
              },
            },
            attributes: {
              formClassName: "login__form modal__form",
            },
            lists: {
              Elements: [
                new FormGroup({
                  childrens: {
                    Input: new Input({
                      attributes: headerOptions.modal[1].formGroup.input,
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
                            text: "от 3 до 20 символов, латиница/кириллица",
                          },
                          attributes: {
                            className: "",
                          },
                        }),
                      },
                    }),
                    Label: new Label({
                      attributes: headerOptions.modal[1].formGroup.label,
                    }),
                  },
                }),
              ],
            },
            childrens: {
              Button: new Button({
                attributes: headerOptions.modal[1].button,
                events: {
                  submit: (e) => {
                    e.preventDefault();
                  },
                },
              }),
            },
          }),
          Title: new modalUserDeleteTitle({}),
        },
      }),
    ];
    const chatAreaHeader = new ChatAreaHeader({
      childrens: {
        Image: new userAvatar({
          attributes: { ...headerInfo.imageData, src: store.getState().user?.avatar ?? "/avatar_default.png" },
        }) as Image,
        Menu: headerMenu,
        UserName: new userName({
          rootData: {
            text: store.getState().user?.display_name ?? "Guest",
          },
          attributes: {
            Tag: "p",
            className: "user-info__name",
          },
        }) as Text,
      },
      lists: {
        ModalList: modals,
      },
    });

    const chatAreaBody = new MessageListWithData({});
    const footerMenu = new Menu({
      attributes: {
        optionGroupclassName: footerData.menu.optionGroupclassName,
      },
      lists: {
        Options: [
          new Option({
            attributes: {
              optionClassName: footerData.menu.items[0].optionClassName,
              id: footerData.menu.items[0].id,
              textClassName: footerData.menu.items[0].textClassName,
            },
            rootData: {
              text: footerData.menu.items[0].text,
            },
            childrens: {
              Image: new Image({
                attributes: footerData.menu.items[0].imageData,
              }),
            },
            events: {
              click: () => {
                const dialog = document.querySelector("#modal_upload_file_id") as HTMLDialogElement;
                super.closeModalOutside(dialog);
                dialog.showModal();
                document.querySelector(".footer__attach-menu")?.classList.toggle("hidden");
              },
            },
          }),
          new Option({
            attributes: {
              optionClassName: footerData.menu.items[1].optionClassName,
              id: footerData.menu.items[1].id,
              textClassName: footerData.menu.items[1].textClassName,
            },
            rootData: {
              text: footerData.menu.items[1].text,
            },
            childrens: {
              Image: new Image({
                attributes: footerData.menu.items[1].imageData,
              }),
            },
          }),
          new Option({
            attributes: {
              optionClassName: footerData.menu.items[2].optionClassName,
              id: footerData.menu.items[1].id,
              textClassName: footerData.menu.items[2].textClassName,
            },
            rootData: {
              text: footerData.menu.items[2].text,
            },
            childrens: {
              Image: new Image({
                attributes: footerData.menu.items[1].imageData,
              }),
            },
          }),
        ],
      },
      childrens: {
        Button: new Button({
          attributes: footerData.menu.optionButton,
          events: {
            click: () => {
              document.querySelector(".footer__attach-menu")?.classList.toggle("hidden");
            },
          },
        }),
      },
    });
    const chatFooter = new ChatFooter({
      childrens: {
        Menu: footerMenu,
        Form: new Form({
          events: {
            submit: async function (this: Form, e) {
              e.preventDefault();
              const isValid = this.validateForm();
              if (isValid) {
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const payload = Object.fromEntries(formData.entries());
                await ChatController.send_text_message(payload);
                const formGroup = this.lists.Elements[0] as FormGroup;
                form.reset();
                if (formGroup.childrens.Input.getContent())
                  formGroup.childrens.Input.getContent().setAttribute("value", "");
              }
            },
          },

          attributes: {
            formClassName: "message__form ",
          },
          lists: {
            Elements: [
              new FormGroup({
                attributes: {
                  className: "form__message",
                },
                childrens: {
                  Input: new Input({
                    attributes: footerData.input,
                    events: {
                      blur: function (this: Input, e) {
                        e.preventDefault();
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
                          text: "не должно быть пустым",
                        },
                        attributes: {
                          className: "tooltip__top",
                        },
                      }),
                    },
                  }),
                },
              }),
            ],
          },
          childrens: {
            Button: new Button({
              attributes: footerData.button,
            }),
          },
        }),
      },
      lists: {
        ModalList: [uploadFileModal],
      },
    });
    const page = new Pages.ChatPage({
      childrens: {
        ChatListHeader: chatListHeader,
        ChatList: chatList,
        ChatAreaHeader: chatAreaHeader,
        ChatAreaBody: chatAreaBody,
        ChatFooter: chatFooter,
      },
    });
    return page;
  }
  protected addEvtListeners() {
    const headerOptionsButton = document.getElementById("header_options_button_id") as HTMLButtonElement;
    headerOptionsButton.addEventListener("click", () => {
      document.querySelector(".header-options__menu")?.classList.toggle("hidden");
    });
    const attachOptionsButton = document.getElementById("attach_button_id") as HTMLButtonElement;
    attachOptionsButton.addEventListener("click", () => {
      document.querySelector(".footer__attach-menu")?.classList.toggle("hidden");
    });
    document.querySelector("#add_user_menu_item_id")?.addEventListener("click", () => {
      const dialog = document.querySelector("#model_add_user_id") as HTMLDialogElement;
      super.closeModalOutside(dialog);
      dialog.showModal();
    });
    document.querySelector("#delete_user_menu_item_id")?.addEventListener("click", () => {
      const dialog = document.querySelector("#model_delete_user_id") as HTMLDialogElement;
      super.closeModalOutside(dialog);
      dialog.showModal();
    });
  }
}

const chatListHeaderData: chatListHeaderType = {
  search: {
    className: "input header__search",
    id: "header_search_id",
    name: "search",
    placeholder: "Поиск",
    type: "text",
    value: "",
  },
};

const headerOptions: menuType = {
  modal: [
    {
      id: "model_add_user_id",
      button: {
        className: "button form__login-button modal__button",
        disabled: "",
        id: "add_user_button_id",
        text: "Добавить",
        type: "submit",
      },
      title: "Добавить пользователя",
      formGroup: {
        input: {
          className: "input form__input",
          id: "add_user_input_id",
          name: "login",
          placeholder: "",
          type: "text",
          value: "",
          disabled: "",
        },
        label: {
          className: "label form__label",
          forAttr: "add_user_input_id",
          text: "Логин",
        },
      },
    },
    {
      id: "model_delete_user_id",
      button: {
        className: "button form__login-button modal__button",
        disabled: "false",
        id: "delete_user_button_id",
        text: "Удалить",
        type: "submit",
      },
      title: "Удалить пользователя",
      formGroup: {
        input: {
          className: "input form__input",
          id: "delete_user_input_id",
          name: "login",
          placeholder: "",
          type: "text",
          value: "",
          disabled: "false",
        },
        label: {
          className: "label form__label",
          forAttr: "delete_user_input_id",
          text: "Логин",
        },
      },
    },
  ],
  optionGroupclassName: "header-options__menu",
  optionButton: {
    className: "chat-area__header-options",
    disabled: "",
    id: "header_options_button_id",
    text: "",
    type: "button",
  },
  items: [
    {
      id: "add_user_menu_item_id",
      imageData: {
        alt: "photo",
        className: "menu-item__img",
        src: "/add_user.png",
      },
      optionClassName: "header__menu-item",
      text: "Добавить пользователя",
      textClassName: "menu-item__text",
    },
    {
      id: "delete_user_menu_item_id",
      imageData: {
        alt: "photo",
        className: "menu-item__img",
        src: "/delete_user.png",
      },
      optionClassName: "header__menu-item",
      text: "Удалить пользователя",
      textClassName: "menu-item__text",
    },
  ],
};
const headerInfo: headerInfoType = {
  imageData: {
    alt: "аватар",
    className: "user-info__img",
    src: "/avatar.jpeg",
  },
  userData: "Федор",
};

//   {
//     contentType: "text",
//     content: "Lorem ipsum dolor sit amet, consectetur adipisic,Lorem ipsum dolor sit amet, consectetur adipisic",
//     date: "11:56",
//   },
//   {
//     contentType: "image",
//     content: {
//       alt: "изображение",
//       src: "/photo.png",
//       className: "chat-area__message-image",
//     },
//     date: "13:55",
//   },
// ];

const footerData: footerType = {
  button: {
    className: "footer__send-button",
    disabled: "false",
    id: "send_button_id",
    text: "",
    type: "submit",
  },
  input: {
    className: "footer__text-input",
    id: "message_input_id",
    name: "message",
    placeholder: "Сообщение",
    type: "text",
    value: "",
  },
  menu: {
    modal: [],
    optionGroupclassName: "footer__attach-menu",
    optionButton: {
      className: "footer__attach-button",
      disabled: "false",
      id: "attach_button_id",
      text: "",
      type: "button",
    },
    items: [
      {
        id: "attach_photo_menu_item_id",
        imageData: {
          alt: "photo",
          className: "menu-item__img",
          src: "/attach_photo.png",
        },
        optionClassName: "footer__menu-item",
        text: "Фото или видео",
        textClassName: "menu-item__text",
      },
      {
        id: "attach_file_menu_item_id",
        imageData: {
          alt: "file",
          className: "menu-item__img",
          src: "/attach_file.png",
        },
        optionClassName: "footer__menu-item",
        text: "Файл",
        textClassName: "menu-item__text",
      },
      {
        id: "attach_location_menu_item_id",
        imageData: {
          alt: "location",
          className: "menu-item__img",
          src: "/attach_location.png",
        },
        optionClassName: "footer__menu-item",
        text: "Локация",
        textClassName: "menu-item__text",
      },
    ],
  },
};

const addChatConfig: {
  button: buttonType;
  modal: modalType;
} = {
  button: {
    className: "button chat-create__button",
    disabled: "",
    id: "add_channel_button_id",
    text: "Добавить чат",
    type: "button",
  },
  modal: {
    id: "model_add_chat_id",
    button: {
      className: "button form__login-button modal__button",
      disabled: "",
      id: "add_chat_button_id",
      text: "Добавить",
      type: "submit",
    },
    title: "Добавить чат",
    formGroup: {
      input: {
        className: "input form__input",
        id: "add_chat_input_id",
        name: "chat_name",
        placeholder: "",
        type: "text",
        value: "",
        disabled: "",
      },
      label: {
        className: "label form__label",
        forAttr: "add_chat_input_id",
        text: "Имя чата",
      },
    },
  },
};
const uploadFileModel: modalType = {
  id: "modal_upload_file_id",
  button: {
    className: "button form__login-button modal__button",
    disabled: "",
    id: "upload_file_button_id",
    text: "Загрузить",
    type: "submit",
  },
  title: "Загрузите файл",
  formGroup: {
    input: {
      className: "upload-file__input",
      id: "upload_file_input_id",
      name: "file",
      placeholder: "",
      type: "file",
      value: "",
      disabled: "",
    },
    label: {
      className: "upload-avatar__label",
      forAttr: "upload_file_input_id",
      text: "Выбрать файл  ",
    },
  },
};
