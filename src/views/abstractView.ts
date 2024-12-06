import Handlebars from 'handlebars';

// Register partials
import Input from '../components/input/Input.ts';
import Label from '../components/label/Label.ts';
import Button from '../components/button/Button.ts';
import Form from '../components/form/Form.ts';
import Link from '../components/link/Link.ts';
import Search from '../components/search/Search.ts';
import ChatListHeader from '../components/chatListHeader/ChatListHeader.ts';
import Image from '../components/image/Image.ts';
import ChatListItem from '../components/chatListItem/ChatListItem.ts';
import Option from '../components/option/Option.ts';
import Menu from '../components/menu/Menu.ts';
import ChatAreaHeader from '../components/chatLAreaHeader/ChatAreaHeader.ts';
import ChatList from '../components/chatList/ChatList.ts';

// Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Form', Form);
Handlebars.registerPartial('Label', Label);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Search', Search);
Handlebars.registerPartial('ChatListHeader', ChatListHeader);
Handlebars.registerPartial('Image', Image);
Handlebars.registerPartial('ChatListItem', ChatListItem);
Handlebars.registerPartial('ChatList', ChatList);
Handlebars.registerPartial('Option', Option);
Handlebars.registerPartial('Menu', Menu);
Handlebars.registerPartial('ChatAreaHeader', ChatAreaHeader);

export default class {
  constructor(protected root: HTMLElement) {
    this.root = root;
  }

  protected setTitle(title: string) {
    document.title = title;
  }
  async render() {
    // Implement the render method here
  }
  protected addEvtListeners() {}
}