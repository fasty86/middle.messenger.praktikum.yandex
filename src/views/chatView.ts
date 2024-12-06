import Handlebars from 'handlebars';
import AbstractView from './abstractView';
import * as Pages from '../pages/index.ts';
import {
  chatListHeaderType,
  chatListItemType,
  menuType,
  headerInfoType,
} from '../types/components.ts';
import avatar from '../../public/avatar.jpeg';
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
    });
    this.addEvtListeners();
  }
  protected addEvtListeners() {
    document.addEventListener('submit', (e) => {
      e.preventDefault();
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
    src: '../../public/avatar.jpeg',
  },
  message: 'Привет, мир!',
  time: '12:00',
  unreadMessages: 5,
  username: 'Федор',
});

const headerOptions: menuType = {
  optionGroupclassName: 'header-options__menu options',
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
        src: './public/add_user.png',
      },
      optionClassName: 'header__menu-item',
      text: 'Добавить пользователя',
      textClassName: 'menu-item__text',
    },
    {
      imageData: {
        alt: 'photo',
        className: 'menu-item__img',
        src: './public/delete_user.png',
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
    src: '../../public/avatar.jpeg',
  },
  userData: 'Федор',
};
