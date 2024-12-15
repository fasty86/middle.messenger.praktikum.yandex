import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Option extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `
              <div class="{{optionClassName}}" id="{{id}}">
                {{{Image}}}
                <span class="{{textClassName}}">{{text}}</span>
              </div>`;
    }
}
