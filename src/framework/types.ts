import Block from "./Block";

export enum BusEvents {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
  STATE_CHANGE = "state:change",
}
export enum StoreEvents {
  Updated = "store:updated",
  NEW_MESSAGE = "new:message",
}

export type Cb = (...args: unknown[]) => void;
export type Listener = {
  [key in BusEvents | StoreEvents]?: Array<(...args: unknown[]) => void>;
};

export type PropsType = {
  rootData?: RootDataType;
  attributes?: AttributeType;
  childrens?: ChildrensType;
  lists?: ListType;
  events?: EventsType;
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
  [key: string]: Array<Block | string>;
};
export type EventsType = {
  [key: string]: (e: Event | CustomEvent) => void;
};

export type DefaultObject = {
  [key: string]: unknown;
};
