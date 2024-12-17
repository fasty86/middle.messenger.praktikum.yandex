import "./link.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Link extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<a href="{{href}}" class="{{className}}" data-link>{{text}}</a>`;
    }
}
