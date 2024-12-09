import Handlebars from 'handlebars';
import AbstractView from './abstractView.ts';
import * as Pages from '../pages/index.ts';
import {
  formGroupType,
  buttonType,
  imageType,
  modalType,
} from '../types/components.ts';
import { navigateTo } from '../router/router.ts';

export default class ProfileEditPassword extends AbstractView {
  protected template: string;
  constructor(protected root: HTMLElement) {
    super(root);
    this.template = Pages.ProfilePage;
    this.setTitle('Profile');
  }
  async render(source = this.template) {
    let template;
    template = Handlebars.compile(source);
    this.root.innerHTML = template({
      data: profileFormData,
      formClassName: 'profile_form',
      actionButtons: actionButtons,
      username: 'Иван Иванов',
      avatar: avatar,
      sendButton,
      modal: uploadAvatarModel,
    });
    this.addEvtListeners();
  }
  protected addEvtListeners() {
    document.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    document
      .querySelector('#profile_button_back_id')
      ?.addEventListener('click', (_) => {
        navigateTo('/profile');
      });
    document
      .querySelector('#avatar_upload_image_id')
      ?.addEventListener('click', (_) => {
        const dialog = document.querySelector(
          '#modal_upload_avatar_id'
        ) as HTMLDialogElement;
        super.closeModalOutside(dialog);
        dialog.showModal();
      });
  }
}

const profileFormData: Array<formGroupType> = [
  {
    input: {
      className: 'input profile__input',
      id: 'old_password_id',
      name: 'oldPassword',
      placeholder: '',
      type: 'password',
      value: '12345',
      disabled: false,
    },
    label: {
      className: 'label form__label profile__label',
      forAttr: 'old_password_id',
      text: 'Старый пароль',
    },
  },
  {
    input: {
      className: 'input profile__input',
      id: 'new_password_id',
      name: 'newPassword',
      placeholder: '',
      type: 'password',
      value: '12345',
      disabled: false,
    },
    label: {
      className: 'label form__label profile__label',
      forAttr: 'new_password_id',
      text: 'Новый пароль',
    },
  },
  {
    input: {
      className: 'input profile__input',
      id: 'new_password_second_id',
      name: 'confirmNewPassword',
      placeholder: '',
      type: 'password',
      value: '32434',
      disabled: true,
    },
    label: {
      className: 'label form__label profile__label',
      forAttr: 'new_password_second_id',
      text: 'Повторите новый пароль',
    },
  },
];
const actionButtons: buttonType[] = [
  {
    className: 'button form__login-button profile-edit__button',
    disabled: false,
    id: 'profile_save_changed_password_id',
    text: 'Сохранить',
    type: 'button',
  },
];
const avatar: imageType = {
  alt: 'avatar',
  className: 'profile_image',
  src: '/avatar_default.png',
};

const sendButton: buttonType = {
  className: 'footer__send-button profile__button',
  disabled: false,
  id: 'profile_button_back_id',
  text: '',
  type: 'button',
};
const uploadAvatarModel: modalType = {
  id: 'modal_upload_avatar_id',
  button: {
    className: 'button form__login-button modal__button',
    disabled: false,
    id: 'upload_avatar_button_id',
    text: 'Поменять',
    type: 'button',
  },
  title: 'Загрузите файл',
  formGroup: {
    input: {
      className: 'upload-avatar__input',
      id: 'upload_avatar_input_id',
      name: 'avatar',
      placeholder: '',
      type: 'file',
      value: '',
      disabled: false,
    },
    label: {
      className: 'upload-avatar__label',
      forAttr: 'upload_avatar_input_id',
      text: 'Выбрать файл  на компьютере',
    },
  },
};
