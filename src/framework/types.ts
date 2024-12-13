import Block from "./Block";

export enum BusEvents {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render",
}

export type Cb = (...args: unknown[]) => void;
export type Listener = {
    [key in BusEvents]?: Array<(...args: unknown[]) => void>;
};

export type PropsType = {
    rootData: RootDataType;
    attributes: AttributeType;
    childrens: ChildrensType;
    lists: ListType;
    events: EventsType;
};

export type RootDataType = {
    [key: string]: unknown;
};
export type AttributeType = {
    [key: string]: string;
};

export type ChildrensType = {
    [key: string]: Block;
};
export type ListType = {
    [key: string]: Block[];
};
export type EventsType = {
    [key: string]: (e: Event) => void;
};

export type DefaultObject = {
    [key: string]: unknown;
};
