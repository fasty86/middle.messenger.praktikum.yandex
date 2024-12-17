// import Handlebars from "handlebars";

// Register partials
// import Input from "../components/input/Input_OLD.ts";
// import Label from "../components/label/Label_OLD.ts";
// import Button from "../components/button/Button_OLD.ts";
// import Form from "../components/form/Form_OLD.ts";
// import Link from "../components/link/Link_OLD.ts";
// import Search from "../components/search/Search_OLD.ts";
// // import ChatListHeader from "../components/chatListHeader/ChatListHeader.ts";
// import Image from "../components/image/Image_OLD.ts";
// import ChatListItem from "../components/chatListItem/ChatListItem_OLD.ts";
// import Option from "../components/option/Option_OLD.ts";
// import Menu from "../components/menu/Menu.ts";
// import ChatAreaHeader from "../components/chatLAreaHeader/ChatAreaHeader_OLD.ts";
// import ChatList from "../components/chatList/ChatList_OLD.ts";
// // import ChatAreaBody from "../components/chatAreaBody/ChatAreaBody.ts";
// import ChatFooter from "../components/chatFooter/ChatFooter_OLD.ts";
// import Message from "../components/message/Message_OLD.ts";
// import Modal from "../components/modal/Modal_OLD.ts";
// import Navigation from "../components/util/Navigation_OLD.ts";

// // Handlebars.registerPartial('Input', Input);
// Handlebars.registerPartial("Button", Button);
// Handlebars.registerPartial("Form", Form);
// Handlebars.registerPartial("Label", Label);
// Handlebars.registerPartial("Input", Input);
// Handlebars.registerPartial("Link", Link);
// Handlebars.registerPartial("Search", Search);
// // Handlebars.registerPartial("ChatListHeader", ChatListHeader);
// Handlebars.registerPartial("Image", Image);
// Handlebars.registerPartial("ChatListItem", ChatListItem);
// Handlebars.registerPartial("ChatList", ChatList);
// Handlebars.registerPartial("Option", Option);
// // Handlebars.registerPartial("Menu", Menu);
// Handlebars.registerPartial("ChatAreaHeader", ChatAreaHeader);
// // Handlebars.registerPartial("ChatAreaBody", ChatAreaBody);
// Handlebars.registerPartial("ChatFooter", ChatFooter);
// Handlebars.registerPartial("Message", Message);
// Handlebars.registerPartial("Modal", Modal);
// Handlebars.registerPartial("Navigation", Navigation);

// Handlebars.registerHelper("ifEquals", function (arg1, arg2) {
//     return arg1 == arg2 ? true : false;
// });

export default class {
    constructor(protected root: HTMLElement) {
        this.root = root;
    }

    protected setTitle(title: string) {
        document.title = title;
    }
    async render() {}
    closeModalOutside(dialog: HTMLDialogElement) {
        dialog.addEventListener("click", function (event) {
            const rect = dialog.getBoundingClientRect();
            const isInDialog =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (!isInDialog) {
                dialog.close();
            }
        });
    }
    protected buildComponents() {}
    protected addEvtListeners() {}
}
