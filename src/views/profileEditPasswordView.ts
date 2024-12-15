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
export default class ProfileEditPassword extends AbstractView {
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
            id: "old_password_id",
            name: "oldPassword",
            placeholder: "",
            type: "password",
            value: "12345",
            disabled: false,
        },
        label: {
            className: "label form__label profile__label",
            forAttr: "old_password_id",
            text: "Старый пароль",
        },
    },
    {
        input: {
            className: "profile__input input",
            id: "new_password_id",
            name: "newPassword",
            placeholder: "",
            type: "password",
            value: "12345",
            disabled: false,
        },
        label: {
            className: "label form__label profile__label",
            forAttr: "new_password_id",
            text: "Новый пароль",
        },
    },
    {
        input: {
            className: "input profile__input",
            id: "new_password_second_id",
            name: "confirmNewPassword",
            placeholder: "",
            type: "password",
            value: "32434",
            disabled: true,
        },
        label: {
            className: "label form__label profile__label",
            forAttr: "new_password_second_id",
            text: "Повторите новый пароль",
        },
    },
];
const actionButtons: buttonType[] = [
    {
        className: "button form__login-button profile-edit__button",
        disabled: false,
        id: "profile_save_changed_password_id",
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
            name: "avatar",
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
