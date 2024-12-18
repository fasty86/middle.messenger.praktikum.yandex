import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Image from "../image/Image";
export default class Option extends Block<OptionPropsType> {
  render() {
    return `
              <div class="{{optionClassName}}" id="{{id}}">
                {{{Image}}}
                <span class="{{textClassName}}">{{text}}</span>
              </div>`;
  }
}

type OptionPropsType = PropsType & {
  attributes: {
    optionClassName: string;
    textClassName: string;
    id: string;
  };
  rootData: {
    text: string;
  };
  childrens: {
    Image: Image;
  };
};
