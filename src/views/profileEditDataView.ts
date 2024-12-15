import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
import {
    formGroupType,
    buttonType,
    imageType,
    modalType,
} from "../types/components.ts";
import { navigateTo } from "../router/router.ts";
import FormGroup from "../components/formGroup/FormGroup.ts";
import Button from "../components/button/Button.ts";
import Input from "../components/input/Input.ts";
import Label from "../components/label/Label.ts";
import Form from "../components/form/Form.ts";
import Image from "../components/image/Image.ts";
import { NavigationComponent } from "../components/util/Navigation.ts";
import Modal from "../components/modal/Modal.ts";
import Avatar from "../components/avatar/Avatar.ts";
export default class ProfileEditData extends AbstractView {
    constructor(protected root: HTMLElement) {
        super(root);
        this.setTitle("Profile");
    }
    async render() {
        this.root.replaceChildren(this.buildComponents().getContent());
    }

    protected buildComponents() {
        const actions: Button[] = [
            new Button({
                attributes: actionButtons[0],
                events: {
                    click: () => {
                        navigateTo("/profile/edit/data");
                    },
                },
            }),
        ];
        const elements: FormGroup[] = [
            new FormGroup({
                childrens: {
                    Input: new Input({ attributes: profileFormData[0].input }),
                    Label: new Label({ attributes: profileFormData[0].label }),
                },
            }),
            new FormGroup({
                childrens: {
                    Input: new Input({ attributes: profileFormData[1].input }),
                    Label: new Label({ attributes: profileFormData[1].label }),
                },
            }),
            new FormGroup({
                childrens: {
                    Input: new Input({ attributes: profileFormData[2].input }),
                    Label: new Label({ attributes: profileFormData[2].label }),
                },
            }),
            new FormGroup({
                childrens: {
                    Input: new Input({ attributes: profileFormData[3].input }),
                    Label: new Label({ attributes: profileFormData[3].label }),
                },
            }),
            new FormGroup({
                childrens: {
                    Input: new Input({ attributes: profileFormData[4].input }),
                    Label: new Label({ attributes: profileFormData[4].label }),
                },
            }),
            new FormGroup({
                childrens: {
                    Input: new Input({ attributes: profileFormData[5].input }),
                    Label: new Label({ attributes: profileFormData[5].label }),
                },
            }),
        ];
        const form = new Form({
            attributes: {
                formClassName: "form profile_form",
            },
            lists: {
                Elements: elements,
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
                            console.log("imds");
                            const dialog = document.querySelector(
                                "#modal_upload_avatar_id",
                            ) as HTMLDialogElement;
                            super.closeModalOutside(dialog);
                            dialog.showModal();
                        },
                    },
                }),
                Form: form,
                Navigation: NavigationComponent,
                Modal: new Modal({
                    rootData: {
                        title: uploadAvatarModel.title,
                    },
                    attributes: {
                        id: uploadAvatarModel.id,
                    },
                    childrens: {
                        FormGroup: new FormGroup({
                            childrens: {
                                Input: new Input({
                                    attributes:
                                        uploadAvatarModel.formGroup.input,
                                }),
                                Label: new Label({
                                    attributes:
                                        uploadAvatarModel.formGroup.label,
                                }),
                            },
                        }),
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
            lists: {
                ActionButtons: actions,
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
            disabled: true,
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
            disabled: true,
        },
        label: {
            className: "label form__label profile__label",
            forAttr: "login_id",
            text: "Имя в чате",
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
            disabled: true,
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
            disabled: true,
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
            disabled: true,
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
            disabled: true,
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
        disabled: false,
        id: "profile_save_changed_data_id",
        text: "Сохранить",
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
    disabled: false,
    id: "profile_button_back_id",
    text: "",
    type: "button",
};
const uploadAvatarModel: modalType = {
    id: "modal_upload_avatar_id",
    button: {
        className: "button form__login-button modal__button",
        disabled: false,
        id: "upload_avatar_button_id",
        text: "Поменять",
        type: "button",
    },
    title: "Загрузите файл",
    formGroup: {
        input: {
            className: "upload-avatar__input",
            id: "upload_avatar_input_id",
            name: "upload_avatar_login",
            placeholder: "",
            type: "file",
            value: "",
            disabled: false,
        },
        label: {
            className: "upload-avatar__label",
            forAttr: "upload_avatar_input_id",
            text: "Выбрать файл  на компьютере",
        },
    },
};
