export type labelType = {
  forAttr: string;
  className: string;
  text: string;
};

export type inputType = {
  id: string;
  name: string;
  type:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  placeholder: string;
  value: string;
  className: string;
};

export type buttonType = {
  id: string;
  type: 'button' | 'submit' | 'reset';
  text: string;
  disabled: boolean;
  className: string;
};
export type linkType = {
  href: string;
  text: string;
  className: string;
};

export type formGroupType = {
  label: labelType;
  input: inputType;
};

export type chatListHeaderType = {
  search: inputType;
};
export type imageType = {
  src: string;
  alt: string;
  className: string;
};

export type chatListItemType = {
  username: string;
  message: string;
  time: string;
  unreadMessages: number;
  imageData: imageType;
};

export type menuItemType = {
  imageData: imageType;
  text: string;
  textClassName: string;
  optionClassName: string;
};

export type menuType = {
  optionGroupclassName: string;
  optionButton: buttonType;
  items: menuItemType[];
};

export type headerInfoType = {
  imageData: imageType;
  userData: string;
};

export type messageType = {
  contentType: 'text' | 'image';
  content: imageType | string;
  date: string;
};

export type footerType = {
  input: inputType;
  button: buttonType;
  menu?: menuType;
};
