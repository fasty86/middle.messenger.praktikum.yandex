export type labelType = {
  forAttr: string;
  className: string;
  text: string;
};
export type inputTypes =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";
export type inputType = {
  id: string;
  name: string;
  type: inputTypes;
  placeholder: string;
  value: string;
  className: string;
  disabled?: string;
};

export type buttonType = {
  id: string;
  type: "button" | "submit" | "reset";
  text: string;
  disabled: string;
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
  id: string;
  imageData: imageType;
  text: string;
  textClassName: string;
  optionClassName: string;
};

export type menuType = {
  optionGroupclassName: string;
  modal: modalType[];
  optionButton: buttonType;
  items: menuItemType[];
};

export type headerInfoType = {
  imageData: imageType;
  userData: string;
};

export type messageType = {
  contentType: "text" | "image";
  content: imageType | string;
  date: string;
};

export type footerType = {
  input: inputType;
  button: buttonType;
  menu: menuType;
};

export type modalType = {
  id: string;
  title: string;
  formGroup: formGroupType;
  button: buttonType;
};
