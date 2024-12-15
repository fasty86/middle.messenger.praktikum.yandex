import "./input.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Input extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<input id="{{id}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" class="{{className}}" >`;
    }
}
