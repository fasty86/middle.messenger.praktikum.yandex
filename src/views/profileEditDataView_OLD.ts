// import Handlebars from "handlebars";
// import AbstractView from "./abstractView.ts";
// import * as Pages from "../pages/index.ts";
// import {
//     formGroupType,
//     buttonType,
//     imageType,
//     modalType,
// } from "../types/components.ts";
// import { navigateTo } from "../router/router.ts";

// export default class ProfileEditData extends AbstractView {
//     protected template: string;
//     constructor(protected root: HTMLElement) {
//         super(root);
//         this.template = Pages.ProfilePage;
//         this.setTitle("Profile");
//     }
//     async render(source = this.template) {
//         const template = Handlebars.compile(source);
//         this.root.innerHTML = template({
//             data: profileFormData,
//             formClassName: "login__form",
//             actionButtons: actionButtons,
//             username: "Иван Иванов",
//             avatar: avatar,
//             sendButton,
//             modal: uploadAvatarModel,
//         });
//         this.addEvtListeners();
//     }
//     protected addEvtListeners() {
//         document.addEventListener("submit", (e) => {
//             e.preventDefault();
//         });
//         document
//             .querySelector("#profile_button_back_id")
//             ?.addEventListener("click", () => {
//                 navigateTo("/profile");
//             });
//         document
//             .querySelector("#avatar_upload_image_id")
//             ?.addEventListener("click", () => {
//                 const dialog = document.querySelector(
//                     "#modal_upload_avatar_id",
//                 ) as HTMLDialogElement;
//                 super.closeModalOutside(dialog);
//                 dialog.showModal();
//             });
//     }
// }

// const profileFormData: Array<formGroupType> = [
//     {
//         input: {
//             className: "input profile__input",
//             id: "email_id",
//             name: "email",
//             placeholder: "",
//             type: "email",
//             value: "test@yandex.ru",
//             disabled: true,
//         },
//         label: {
//             className: "label form__label profile__label",
//             forAttr: "email_id",
//             text: "Почта",
//         },
//     },
//     {
//         input: {
//             className: "input profile__input",
//             id: "login_id",
//             name: "login",
//             placeholder: "",
//             type: "text",
//             value: "test_login",
//             disabled: true,
//         },
//         label: {
//             className: "label form__label profile__label",
//             forAttr: "login_id",
//             text: "Имя в чате",
//         },
//     },

//     {
//         input: {
//             className: "input profile__input",
//             id: "first_name_id",
//             name: "first_name",
//             placeholder: "",
//             type: "text",
//             value: "Иван",
//             disabled: true,
//         },
//         label: {
//             className: "label form__label profile__label",
//             forAttr: "first_name_id",
//             text: "Имя",
//         },
//     },
//     {
//         input: {
//             className: "input profile__input",
//             id: "last_name_id",
//             name: "second_name",
//             placeholder: "",
//             type: "text",
//             value: "Иванов",
//             disabled: true,
//         },
//         label: {
//             className: "label form__label profile__label",
//             forAttr: "last_name_id",
//             text: "Фамилия",
//         },
//     },
//     {
//         input: {
//             className: "input profile__input",
//             id: "chat_name_id",
//             name: "display_name",
//             placeholder: "",
//             type: "text",
//             value: "Иванов",
//             disabled: true,
//         },
//         label: {
//             className: "label form__label profile__label",
//             forAttr: "chat_name_id",
//             text: "Имя в чате",
//         },
//     },
//     {
//         input: {
//             className: "input profile__input",
//             id: "phone_id",
//             name: "phone",
//             placeholder: "",
//             type: "tel",
//             value: "+7 (909) 967 30 30",
//             disabled: true,
//         },
//         label: {
//             className: "label form__label profile__label",
//             forAttr: "phone_id",
//             text: "Телефон",
//         },
//     },
// ];
// const actionButtons: buttonType[] = [
//     {
//         className: "button form__login-button profile-edit__button",
//         disabled: false,
//         id: "profile_save_changed_data_id",
//         text: "Сохранить",
//         type: "button",
//     },
// ];
// const avatar: imageType = {
//     alt: "avatar",
//     className: "profile_image",
//     src: "/avatar_default.png",
// };

// const sendButton: buttonType = {
//     className: "footer__send-button profile__button",
//     disabled: false,
//     id: "profile_button_back_id",
//     text: "",
//     type: "button",
// };
// const uploadAvatarModel: modalType = {
//     id: "modal_upload_avatar_id",
//     button: {
//         className: "button form__login-button modal__button",
//         disabled: false,
//         id: "upload_avatar_button_id",
//         text: "Поменять",
//         type: "button",
//     },
//     title: "Загрузите файл",
//     formGroup: {
//         input: {
//             className: "upload-avatar__input",
//             id: "upload_avatar_input_id",
//             name: "upload_avatar_login",
//             placeholder: "",
//             type: "file",
//             value: "",
//             disabled: false,
//         },
//         label: {
//             className: "upload-avatar__label",
//             forAttr: "upload_avatar_input_id",
//             text: "Выбрать файл  на компьютере",
//         },
//     },
// };
