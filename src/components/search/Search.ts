import "./search.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Input from "../input/Input";
export default class Search extends Block<searchPropsType> {
  render() {
    return `<div class='header__search-container'>
                  <i class='header__search-icon'></i>
                   {{{Input}}}
                </div>`;
  }
}

type searchPropsType = PropsType & {
  childrens: {
    Input: Input;
  };
};
