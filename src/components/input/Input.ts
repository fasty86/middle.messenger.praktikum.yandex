import "./input.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Tooltip from "../tooltip/Tooltip";
export default class Input extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    showTooltip() {
        if ("Tooltip" in this.childrens) {
            const tooltip = this.childrens.Tooltip as Tooltip;
            tooltip.onShow(this);
        }
    }
    hideTooltip() {
        if ("Tooltip" in this.childrens) {
            const tooltip = this.childrens.Tooltip as Tooltip;
            tooltip.onHide();
        }
    }

    render() {
        return `<input id="{{id}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" class="{{className}}">`;
    }
}
