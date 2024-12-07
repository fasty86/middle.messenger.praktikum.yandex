import Handlebars from 'handlebars';
import AbstractView from './abstractView';
import * as Pages from '../pages/index.ts';
import {
  chatListHeaderType,
  chatListItemType,
  menuType,
  headerInfoType,
  messageType,
  footerType,
} from '../types/components.ts';
// import avatar from '../../public/avatar.jpeg';
// import { isButtonElement } from '../types/typeguards.ts';

export default class ChatView extends AbstractView {
  protected template: string;
  constructor(protected root: HTMLElement) {
    super(root);
    this.template = Pages.ChatPage;
    this.setTitle('Chat');
  }
  async render() {
    let template;
    template = Handlebars.compile(this.template);
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
      'header_options_button_id'
    ) as HTMLButtonElement;
    headerOptionsButton.addEventListener('click', () => {
      document
        .querySelector('.header-options__menu')
        ?.classList.toggle('hidden');
    });
    const attachOptionsButton = document.getElementById(
      'attach_button_id'
    ) as HTMLButtonElement;
    attachOptionsButton.addEventListener('click', () => {
      document
        .querySelector('.footer__attach-menu')
        ?.classList.toggle('hidden');
    });
  }
}

const chatListHeader: chatListHeaderType = {
  search: {
    className: 'input header__search',
    id: 'header_search_id',
    name: 'search',
    placeholder: 'Поиск',
    type: 'text',
    value: '',
  },
};

const chatList: Array<chatListItemType> = new Array(15).fill({
  imageData: {
    alt: 'аватар',
    className: 'chat_list__image',
    src: '/avatar.jpeg',
  },
  message: 'Привет, мир!',
  time: '12:00',
  unreadMessages: 5,
  username: 'Федор',
});

const headerOptions: menuType = {
  optionGroupclassName: 'header-options__menu',
  optionButton: {
    className: 'chat-area__header-options',
    disabled: false,
    id: 'header_options_button_id',
    text: '',
    type: 'button',
  },
  items: [
    {
      imageData: {
        alt: 'photo',
        className: 'menu-item__img',
        src: '/add_user.png',
      },
      optionClassName: 'header__menu-item',
      text: 'Добавить пользователя',
      textClassName: 'menu-item__text',
    },
    {
      imageData: {
        alt: 'photo',
        className: 'menu-item__img',
        src: '/delete_user.png',
      },
      optionClassName: 'header__menu-item',
      text: 'Удалить пользователя',
      textClassName: 'menu-item__text',
    },
  ],
};
const headerInfo: headerInfoType = {
  imageData: {
    alt: 'аватар',
    className: 'user-info__img',
    src: '/avatar.jpeg',
  },
  userData: 'Федор',
};

const messages: messageType[] = [
  {
    contentType: 'text',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisic,Lorem ipsum dolor sit amet, consectetur adipisic',
    date: '11:56',
  },
  {
    contentType: 'image',
    content: {
      alt: '',
      src: 'photo.png',
      className: 'chat-area__message-image',
    },
    date: '13:55',
  },
];

const footerData: footerType = {
  button: {
    className: 'footer__send-button',
    disabled: false,
    id: 'send_button_id',
    text: '',
    type: 'button',
  },
  input: {
    className: 'footer__text-input',
    id: 'message_input_id',
    name: 'message_input',
    placeholder: 'Сообщение',
    type: 'text',
    value: '',
  },
  menu: {
    optionGroupclassName: 'footer__attach-menu',
    optionButton: {
      className: 'footer__attach-button',
      disabled: false,
      id: 'attach_button_id',
      text: '',
      type: 'button',
    },
    items: [
      {
        imageData: {
          alt: 'photo',
          className: 'menu-item__img',
          src: '/attach_photo.png',
        },
        optionClassName: 'footer__menu-item',
        text: 'Фото или видео',
        textClassName: 'menu-item__text',
      },
      {
        imageData: {
          alt: 'file',
          className: 'menu-item__img',
          src: '/attach_file.png',
        },
        optionClassName: 'footer__menu-item',
        text: 'Файл',
        textClassName: 'menu-item__text',
      },
      {
        imageData: {
          alt: 'location',
          className: 'menu-item__img',
          src: '/attach_location.png',
        },
        optionClassName: 'footer__menu-item',
        text: 'Локация',
        textClassName: 'menu-item__text',
      },
    ],
  },
};
