import "./menu.pcss";

import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Menu extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return `<div class="options-group">
               <div class="{{optionGroupclassName}}">
                   {{{Options}}}
                </div>
                 {{{Button}}}
              </div>
             `;
  }
}
