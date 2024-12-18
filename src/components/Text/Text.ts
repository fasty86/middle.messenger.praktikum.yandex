import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";

export default class Text extends Block<textPropsType> {
  render() {
    return `<span>{{{text}}}</span>`;
  }
}

type textPropsType = PropsType & {
  rootData: {
    text: string;
  };
};
