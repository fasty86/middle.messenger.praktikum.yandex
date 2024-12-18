import { Validator, ValidatorMapping } from "../utils/Validator";

export function isAnchorElement(element: HTMLElement | null | EventTarget): element is HTMLAnchorElement {
  return element instanceof HTMLAnchorElement;
}
export function isButtonElement(element: HTMLElement): element is HTMLButtonElement {
  return element instanceof HTMLButtonElement;
}
export function isFunction(prop: unknown): prop is Function {
  return typeof prop === "function";
}
export function isHTMLElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}
export function isInputElement(element: unknown): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}

export function isValidatorExist(value: string): value is ValidatorMapping {
  return value in Validator.mapping;
}
