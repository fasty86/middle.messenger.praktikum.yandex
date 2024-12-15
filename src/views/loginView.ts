import AbstractView from "./abstractView.ts";
import * as Pages from "../pages/index.ts";
import { formGroupType, buttonType, linkType } from "../types/components.ts";
import { navigateTo } from "../router/router.ts";
import FormGroup from "../components/formGroup/FormGroup.ts";
import Button from "../components/button/Button.ts";
import Input from "../components/input/Input.ts";
import Label from "../components/label/Label.ts";
import Form from "../components/form/Form.ts";
import Link from "../components/link/Link.ts";
import { NavigationComponent } from "../components/util/Navigation.ts";
export default class LoginView extends AbstractView {
    constructor(protected root: HTMLElement) {
        super(root);
        this.setTitle("Login");
    }
    async render() {
        this.root.replaceChildren(this.buildComponents().getContent());
    }

    protected buildComponents() {
        const elements: FormGroup[] = [
            new FormGroup({
                childrens: {
                    Input: new Input({ attributes: loginFormData[0].input }),
                    Label: new Label({ attributes: loginFormData[0].label }),
                },
            }),
            new FormGroup({
                childrens: {
                    Input: new Input({ attributes: loginFormData[1].input }),
                    Label: new Label({ attributes: loginFormData[1].label }),
                },
            }),
        ];
        const form = new Form({
            attributes: {
                formClassName: "login__form",
            },
            childrens: {
                Button: new Button({
                    attributes: buttonData,
                    events: {
                        submit: (e) => {
                            e.preventDefault();
                        },
                        click: () => {
                            navigateTo("/chat");
                        },
                    },
                }),
                Link: new Link({
                    attributes: linkData,
                }),
            },
            lists: {
                Elements: elements,
            },
        });
        const page = new Pages.LoginPage({
            childrens: {
                Form: form,
                Navigation: NavigationComponent,
            },
        });
        return page;
    }
}

const loginFormData: Array<formGroupType> = [
    {
        input: {
            className: "input form__input",
            id: "name_id",
            name: "login",
            placeholder: "",
            type: "text",
            value: "",
            disabled: false,
        },
        label: {
            className: "label form__label",
            forAttr: "name_id",
            text: "Логин",
        },
    },
    {
        input: {
            className: "input form__input",
            id: "password_id",
            name: "password",
            placeholder: "",
            type: "password",
            value: "",
            disabled: false,
        },
        label: {
            className: "label form__label",
            forAttr: "password_id",
            text: "Пароль",
        },
    },
];

const buttonData: buttonType = {
    className: "button form__login-button",
    disabled: false,
    id: "login_button_id",
    text: "Авторизоваться",
    type: "submit",
};
const linkData: linkType = {
    className: "link form__link",
    href: "/registration",
    text: "Нет аккаунта?",
};
