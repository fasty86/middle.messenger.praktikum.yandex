import "./image.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
export default class Image extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `<img
                  src="{{src}}"
                  alt="{{alt}}"
                  class="{{className}}"
                />`;
    }
}
