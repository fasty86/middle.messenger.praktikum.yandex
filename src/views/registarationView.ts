import Handlebars from 'handlebars';
import AbstractView from './abstractView.ts';
import * as Pages from '../pages/index.ts';
import { formGroupType, buttonType, linkType } from '../types/components.ts';
import { navigateTo } from '../router/router.ts';

export default class RegistrationView extends AbstractView {
  protected template: string;
  constructor(protected root: HTMLElement) {
    super(root);
    this.template = Pages.RegistrationPage;
    this.setTitle('Registration');
  }
  async render() {
    let template;
    template = Handlebars.compile(this.template);
    this.root.innerHTML = template({
      data: registrationFormData,
      button: buttonData,
      link: linkData,
      formClassName: 'registartion__form',
    });
    this.addEvtListeners();
  }
  protected addEvtListeners() {
    document.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    document
      .querySelector('#registration_button_id')
      ?.addEventListener('click', (_) => {
        navigateTo('/chat');
      });
  }
}

const registrationFormData: Array<formGroupType> = [
  {
    input: {
      className: 'input form__input',
      id: 'email_id',
      name: 'email',
      placeholder: '',
      type: 'email',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'email_id',
      text: 'Почта',
    },
  },
  {
    input: {
      className: 'input form__input',
      id: 'login_id',
      name: 'login',
      placeholder: '',
      type: 'text',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'login_id',
      text: 'Логин',
    },
  },

  {
    input: {
      className: 'input form__input',
      id: 'first_name_id',
      name: 'first_name',
      placeholder: '',
      type: 'text',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'first_name_id',
      text: 'Имя',
    },
  },
  {
    input: {
      className: 'input form__input',
      id: 'last_name_id',
      name: 'second_name',
      placeholder: '',
      type: 'text',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'last_name_id',
      text: 'Фамилия',
    },
  },
  {
    input: {
      className: 'input form__input',
      id: 'phone_id',
      name: 'phone',
      placeholder: '',
      type: 'tel',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'phone_id',
      text: 'Телефон',
    },
  },
  {
    input: {
      className: 'input form__input',
      id: 'first_password_id',
      name: 'password',
      placeholder: '',
      type: 'password',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'first_password_id',
      text: 'Пароль',
    },
  },
  {
    input: {
      className: 'input form__input',
      id: 'second_password_id',
      name: 'passwordConfirm',
      placeholder: '',
      type: 'password',
      value: '',
    },
    label: {
      className: 'label form__label',
      forAttr: 'second_password_id',
      text: 'Пароль еще раз',
    },
  },
];

const buttonData: buttonType = {
  className: 'button form__registration-button',
  disabled: false,
  id: 'registration_button_id',
  text: 'Зарегистрироваться',
  type: 'submit',
};
const linkData: linkType = {
  className: 'link form__link',
  href: '/login',
  text: 'Войти',
};
