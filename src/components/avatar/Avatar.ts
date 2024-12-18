import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Image from "../image/Image";
export default class Avatar extends Block<AvatarPropsType> {
  render() {
    return `<div class="{{className}}" id="{{id}}">
                  {{{Image}}}
                    </div>`;
  }
}

type AvatarPropsType = PropsType & {
  childrens: {
    Image: Image;
  };
};
