import "./menu.pcss";

import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Option from "../option/Option";
import Button from "../button/Button";
export default class Menu extends Block<MenuPropsType> {
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

type MenuPropsType = PropsType & {
  attributes: {
    optionGroupclassName: string;
  };
  childrens: {
    Button: Button;
  };
  lists: {
    Options: Option[];
  };
};
