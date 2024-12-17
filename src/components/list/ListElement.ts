import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class ListElement extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<li class="{{className}}">{{{content}}}</li>`;
    }
}
