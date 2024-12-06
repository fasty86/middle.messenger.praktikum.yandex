import Handlebars from 'handlebars';
import AbstractView from './abstractView';
import * as Pages from '../pages/index.ts';
import { formGroupType, buttonType, linkType } from '../types/components.ts';
// import { isButtonElement } from '../types/typeguards.ts';

export default class LoginView extends AbstractView {
  protected template: string;
  constructor(protected root: HTMLElement) {
    super(root);
    this.template = Pages.LoginPage;
    this.setTitle('Login');
  }
  async render() {
    let template;
    template = Handlebars.compile(this.template);
    this.root.innerHTML = template({
      data: loginFormData,
      button: buttonData,
      link: linkData,
      formClassName: 'login__form',
    });
    this.addEvtListeners();
  }
  protected addEvtListeners() {
    document.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}

const loginFormData: Array<formGroupType> = [
  {
    input: {
      className: 'input form__input',
      id: 'name_id',
      name: 'username',
      placeholder: '',
      type: 'text',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'username',
      text: 'Логин',
    },
  },
  {
    input: {
      className: 'input form__input',
      id: 'password_id',
      name: 'password',
      placeholder: '',
      type: 'password',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'password',
      text: 'Пароль',
    },
  },
];

const buttonData: buttonType = {
  className: 'button form__login-button',
  disabled: false,
  id: 'login_button_id',
  text: 'Авторизоваться',
  type: 'submit',
};
const linkData: linkType = {
  className: 'link form__link',
  href: '/registration',
  text: 'Нет аккаунта?',
};
