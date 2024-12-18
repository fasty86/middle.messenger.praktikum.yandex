import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Avatar extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return `<div class="{{className}}" id="{{id}}">
                  {{{Image}}}
                    </div>`;
  }
}
