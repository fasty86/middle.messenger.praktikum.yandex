import Block from "../../framework/Block";
// import { createEffect, createSignal } from "../../framework/Signal";
import { PropsType } from "../../framework/types";

export default class Text extends Block<textPropsType> {
  render() {
    // this.makeSignal();
    return `<span>{{{text}}}</span>`;
  }
  // makeSignal() {
  //   const [text, setText] = createSignal(this.rootData.text);

  //   createEffect(() => {
  //     console.log("Text signal changed", text());
  //   });
  //   setTimeout(() => setText("Hello, World!"), 2000);
  //   setTimeout(() => setText("dfdf!"), 4000);
  // }
}

type textPropsType = PropsType & {
  rootData: {
    text: string;
  };
};
