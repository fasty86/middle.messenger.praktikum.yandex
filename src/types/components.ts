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
