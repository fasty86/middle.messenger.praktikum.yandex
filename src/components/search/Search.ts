import "./search.pcss";

import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Search extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<div class='header__search-container'>
                  <i class='header__search-icon'></i>
                   {{{Input}}}
                </div>`;
    }
}
