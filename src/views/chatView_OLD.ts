import Handlebars from "handlebars";
import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
import {
    chatListHeaderType,
    chatListItemType,
    menuType,
    headerInfoType,
    messageType,
    footerType,
} from "../types/components.ts";

export default class ChatView extends AbstractView {
    protected template: string;
    constructor(protected root: HTMLElement) {
        super(root);
        this.template = Pages.ChatPage;
        this.setTitle("Chat");
    }
    async render() {
        const template = Handlebars.compile(this.template);
        this.root.innerHTML = template({
            chatListHeaderData: chatListHeader,
            chatListData: chatList,
            chatAreaHeaderData: {
                headerOptionsData: headerOptions,
                headerInfoData: headerInfo,
            },
            messageData: messages,
            footerData: footerData,
        });
        this.addEvtListeners();
    }
    protected addEvtListeners() {
        const headerOptionsButton = document.getElementById(
            "header_options_button_id",
        ) as HTMLButtonElement;
        headerOptionsButton.addEventListener("click", () => {
            document
                .querySelector(".header-options__menu")
                ?.classList.toggle("hidden");
        });
        const attachOptionsButton = document.getElementById(
            "attach_button_id",
        ) as HTMLButtonElement;
        attachOptionsButton.addEventListener("click", () => {
            document
                .querySelector(".footer__attach-menu")
                ?.classList.toggle("hidden");
        });
        document
            .querySelector("#add_user_menu_item_id")
            ?.addEventListener("click", () => {
                const dialog = document.querySelector(
                    "#model_add_user_id",
                ) as HTMLDialogElement;
                super.closeModalOutside(dialog);
                dialog.showModal();
            });
        document
            .querySelector("#delete_user_menu_item_id")
            ?.addEventListener("click", () => {
                const dialog = document.querySelector(
                    "#model_delete_user_id",
                ) as HTMLDialogElement;
                super.closeModalOutside(dialog);
                dialog.showModal();
            });
    }
}

const chatListHeader: chatListHeaderType = {
    search: {
        className: "input header__search",
        id: "header_search_id",
        name: "search",
        placeholder: "Поиск",
        type: "text",
        value: "",
    },
};

const chatList: Array<chatListItemType> = new Array(15).fill({
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
                disabled: false,
                id: "add_user_button_id",
                text: "Добавить",
                type: "button",
            },
            title: "Добавить пользователя",
            formGroup: {
                input: {
                    className: "input form__input",
                    id: "add_user_input_id",
                    name: "add_user_login",
                    placeholder: "",
                    type: "text",
                    value: "",
                    disabled: false,
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
                disabled: false,
                id: "delete_user_button_id",
                text: "Удалить",
                type: "button",
            },
            title: "Удалить пользователя",
            formGroup: {
                input: {
                    className: "input form__input",
                    id: "delete_user_input_id",
                    name: "delete_user_login",
                    placeholder: "",
                    type: "text",
                    value: "",
                    disabled: false,
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
        disabled: false,
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
        content:
            "Lorem ipsum dolor sit amet, consectetur adipisic,Lorem ipsum dolor sit amet, consectetur adipisic",
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
        disabled: false,
        id: "send_button_id",
        text: "",
        type: "button",
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
        optionGroupclassName: "footer__attach-menu",
        optionButton: {
            className: "footer__attach-button",
            disabled: false,
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
