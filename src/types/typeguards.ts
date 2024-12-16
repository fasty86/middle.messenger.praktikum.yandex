export function isAnchorElement(
    element: HTMLElement,
): element is HTMLAnchorElement {
    return element instanceof HTMLAnchorElement;
}
export function isButtonElement(
    element: HTMLElement,
): element is HTMLButtonElement {
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
