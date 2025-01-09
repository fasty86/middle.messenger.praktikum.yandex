import AbstractView from "./abstractView";
import * as Pages from "../pages/index.ts";
import {
  chatListHeaderType,
  chatListItemType,
  menuType,
  headerInfoType,
  messageType,
  footerType,
  imageType,
} from "../types/components.ts";
import ChatListHeader from "../components/chatListHeader/ChatListHeader.ts";
import Link from "../components/link/Link.ts";
import Search from "../components/search/Search.ts";
import Input from "../components/input/Input.ts";
import ChatList from "../components/chatList/ChatList.ts";
import ChatListItem from "../components/chatListItem/ChatListItem.ts";
import Image from "../components/image/Image.ts";
import ChatAreaHeader from "../components/chatLAreaHeader/ChatAreaHeader.ts";
import Menu from "../components/menu/Menu.ts";
import Option from "../components/option/Option.ts";
import Button from "../components/button/Button.ts";
import Modal from "../components/modal/Modal.ts";
import FormGroup from "../components/formGroup/FormGroup.ts";
import Label from "../components/label/Label.ts";
import ChatAreaBody from "../components/chatAreaBody/ChatAreaBody.ts";
import Message from "../components/message/Message.ts";
import ChatFooter from "../components/chatFooter/ChatFooter.ts";
import { NavigationComponent } from "../components/util/Navigation.ts";
import Form from "../components/form/Form.ts";
import Tooltip from "../components/tooltip/Tooltip.ts";
import { isInputElement } from "../types/typeguards.ts";
import { Validator } from "../utils/Validator.ts";
import Text from "../components/Text/Text.ts";

export default class ChatView extends AbstractView {
  constructor(protected root: HTMLElement) {
    super(root);
    this.setTitle("Chat");
  }
  async render() {
    this.root.replaceChildren(this.block.getContent());
  }
  protected buildComponents() {
    const chatListHeader = new ChatListHeader({
      childrens: {
        Link: new Link({
          attributes: {
            href: "/profile",
            text: "Профиль",
            className: "link header__profile-link",
          },
        }),
        Search: new Search({
          childrens: {
            Input: new Input({
              attributes: chatListHeaderData.search,
            }),
          },
        }),
      },
    });
    const chatList = new ChatList({
      lists: {
        List: [
          new ChatListItem({
            rootData: {
              ...chatListData[0],
            },
            childrens: {
              Image: new Image({
                attributes: chatListData[0].imageData,
              }),
            },
          }),
          new ChatListItem({
            rootData: {
              ...chatListData[0],
            },
            childrens: {
              Image: new Image({
                attributes: chatListData[0].imageData,
              }),
            },
          }),
          new ChatListItem({
            rootData: {
              ...chatListData[0],
            },
            childrens: {
              Image: new Image({
                attributes: chatListData[0].imageData,
              }),
            },
          }),
          new ChatListItem({
            rootData: {
              ...chatListData[0],
            },
            childrens: {
              Image: new Image({
                attributes: chatListData[0].imageData,
              }),
            },
          }),
          new ChatListItem({
            rootData: {
              ...chatListData[0],
            },
            childrens: {
              Image: new Image({
                attributes: chatListData[0].imageData,
              }),
            },
          }),
        ],
      },
    });
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
        rootData: {
          title: headerOptions.modal[0].title,
        },
        attributes: {
          id: headerOptions.modal[0].id,
        },
        childrens: {
          Form: new Form({
            events: {
              submit: function (this: Form, e) {
                e.preventDefault();
                this.validateForm();
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
                            this.setAtrributies({
                              value: e.target.value ? "nonempty" : "",
                            });
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
        },
      }),
      new Modal({
        rootData: {
          title: headerOptions.modal[1].title,
        },
        attributes: {
          id: headerOptions.modal[1].id,
        },
        childrens: {
          Form: new Form({
            events: {
              submit: function (this: Form, e) {
                e.preventDefault();
                this.validateForm();
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
                            this.setAtrributies({
                              value: e.target.value ? "nonempty" : "",
                            });
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
        },
      }),
    ];
    const chatAreaHeader = new ChatAreaHeader({
      childrens: {
        Image: new Image({
          attributes: headerInfo.imageData,
        }),
        Menu: headerMenu,
      },
      lists: {
        ModalList: modals,
      },
      rootData: {
        userData: headerInfo.userData,
      },
    });
    const chatAreaBody = new ChatAreaBody({
      rootData: {
        currentDate: " 14 января",
      },
      lists: {
        MessageList: [
          new Message({
            rootData: {
              date: messages[0].date,
            },
            childrens: {
              Content: new Text({
                rootData: {
                  text: messages[0].content as string,
                },
              }),
            },
          }),
          new Message({
            rootData: {
              date: messages[1].date,
              contentType: messages[1].contentType,
            },
            childrens: {
              Content: new Image({
                attributes: messages[1].content as imageType,
              }),
            },
          }),
        ],
      },
    });
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
            submit: function (this: Form, e) {
              e.preventDefault();
              this.validateForm();
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
    });
    const page = new Pages.ChatPage({
      childrens: {
        Navigation: NavigationComponent,
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

const chatListData: Array<chatListItemType> = new Array(15).fill({
  imageData: {
    alt: "аватар",
    className: "chat_list__image",
    src: "/avatar.jpeg",
  },
  message: "Привет, мир!",
  time: "12:00",
  unreadMessages: 5,
  username: "Федор",
});

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

const messages: messageType[] = [
  {
    contentType: "text",
    content: "Lorem ipsum dolor sit amet, consectetur adipisic,Lorem ipsum dolor sit amet, consectetur adipisic",
    date: "11:56",
  },
  {
    contentType: "image",
    content: {
      alt: "изображение",
      src: "/photo.png",
      className: "chat-area__message-image",
    },
    date: "13:55",
  },
];

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
