import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { AttributeType, BusEvents, ChildrensType, DefaultObject, EventsType, ListType, RootDataType } from "./types";
import { PropsType } from "./types";
import { isFunction, isHTMLElement } from "../types/typeguards";

export default class Block<T extends PropsType = PropsType> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: Element | null = null;
  _meta: DefaultObject & { _id: number };
  rootData: RootDataType;
  lists: ListType;
  attributes: AttributeType;
  childrens: ChildrensType;
  events: EventsType;
  _id: number;
  eventBus: () => EventBus;
  bindedEvents: EventsType;

  constructor(props: T, tagName = "div") {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
      _id: this.generateId(),
    };
    const { rootData = {}, attributes = {}, childrens = {}, lists = {}, events = {} } = props;
    this.rootData = this._makePropsProxy(rootData);
    this.lists = this._makePropsProxy(lists);
    this.attributes = this._makePropsProxy(attributes);
    this.childrens = this._makePropsProxy(childrens);
    this.events = events;
    this._id = this.generateId();
    this.eventBus = (): EventBus => eventBus;
    this._registerEvents(eventBus);
    this.bindedEvents = this.bindEvents(events);
    eventBus.emit(BusEvents.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(BusEvents.INIT, this.init.bind(this));
    eventBus.on(BusEvents.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BusEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BusEvents.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {}

  private init() {
    this._createResources();
    this.eventBus().emit(BusEvents.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }
  parseProps(initialProps: PropsType) {
    let [props, childrens, lists] = [{}, {}, {}];
    Object.entries(initialProps).forEach(([key, value]) => {
      if (value instanceof Block) childrens = { ...childrens, ...{ [key]: value } };
      else if (Array.isArray(value)) lists = { ...lists, ...{ [key]: value } };
      else props = { ...props, ...{ [key]: value } };
    });
    return [props, childrens];
  }

  protected componentDidMount() {}

  protected dispatchComponentDidMount() {
    this.eventBus().emit(BusEvents.FLOW_CDM);
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (response) {
      this.eventBus().emit(BusEvents.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: PropsType) => {
    if (!nextProps) {
      return;
    }
    const { rootData = {}, attributes = {}, childrens = {}, lists = {}, events = {} } = nextProps;
    Object.assign(this.rootData, rootData);
    Object.assign(this.attributes, attributes);
    Object.assign(this.childrens, childrens);
    Object.assign(this.lists, lists);
    Object.assign(this.events, events);
  };
  setChildrens = (nextProps: PropsType) => {
    if (!nextProps) {
      return;
    }
    const childrens = nextProps.childrens;
    Object.assign(this.childrens, childrens);
  };
  setLists = (nextProps: PropsType) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.lists, nextProps.lists);
  };
  setHtmlAttribute(attrs: { [key: string]: string }) {
    this.attributes = { ...this.attributes, ...attrs };
    this.setAtrributies(this.attributes);
  }

  _render() {
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    const content = this.getContentElements();
    // формируем шаблон с заглушками для Block элементов и списков
    fragment.innerHTML = Handlebars.compile(this.render())({
      ...this.rootData,
      ...this.attributes,
      ...content,
    });
    // Замещаем заглушки на реальные элементы
    this.replaceLists(fragment);
    this.replaceChildrens(fragment);
    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      // this.removeEventListeners();
      this._element.replaceWith(newElement);
      this._element = newElement;
      this.bindedEvents = this.bindEvents(this.events);
      this.addEventListeners(this.bindedEvents, newElement as HTMLElement);
    } else {
      this.removeEventListeners();
      this._element = newElement;
      this.bindedEvents = this.bindEvents(this.events);
      this.addEventListeners(this.bindedEvents, this._element as HTMLElement);
    }

    this.eventBus().emit(BusEvents.FLOW_CDM);
  }

  render() {}

  getContent(): HTMLElement {
    return this._element as HTMLElement;
  }

  private _makePropsProxy<T extends object>(target: T) {
    const that = this;

    return new Proxy(target, {
      get(target, prop: Exclude<keyof T, number>) {
        const value = target[prop];
        if (isFunction(value)) return value.bind(target);
        else return value;
      },
      set(target, prop: Exclude<keyof T, number>, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        that.eventBus().emit(BusEvents.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    if (isHTMLElement(this._element)) this._element.style.display = "block";
  }

  hide() {
    if (isHTMLElement(this._element)) this._element.style.display = "none";
  }

  destroy() {
    if (isHTMLElement(this._element)) this._element = null;
  }
  setAtrributies(attributes: AttributeType) {
    Object.assign(this.attributes, attributes);
  }
  protected generateId() {
    const id = Math.floor(Math.random() * Date.now());
    return id;
  }
  protected addEventListeners(events: EventsType, target: HTMLElement) {
    Object.entries(events).forEach(([eventName, callback]) => {
      target.addEventListener(eventName, callback);
    });
  }
  protected removeEventListeners() {
    Object.entries(this.bindEvents).forEach(([eventName, callback]) => {
      if (isHTMLElement(this._element)) this._element.removeEventListener(eventName, callback);
    });
  }
  protected getContentElements() {
    const content: DefaultObject = {};
    // добавляем заготовки для Block элементов
    Object.entries(this.childrens).forEach(([key, value]) => {
      content[key] = `<div data-id="${value._meta._id}"></div>`;
    });
    // Добавляем заглушки для списков элементов
    Object.entries(this.lists).forEach(([key]) => {
      content[key] = `<div data-id="l_${key}_${this._meta._id}"></div>`;
    });
    return content;
  }
  protected replaceChildrens(fragment: HTMLTemplateElement) {
    Object.values(this.childrens).forEach((child) => {
      const childPlace = fragment.content.querySelector(`[data-id="${child._meta._id}"]`);
      if (childPlace) {
        childPlace.replaceWith(child.getContent());
      }
    });
  }

  protected replaceLists(fragment: HTMLTemplateElement) {
    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement("template") as HTMLTemplateElement;
      child.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          const template = document.createElement("template");
          template.innerHTML = item.trim();
          listCont.content.append(template.content);
        }
      });
      const listPlace = fragment.content.querySelector(`[data-id="l_${key}_${this._meta._id}"]`);
      if (listPlace) {
        listPlace.replaceWith(listCont.content);
      }
    });
  }

  protected bindEvents(events: EventsType) {
    const that = this;
    Object.keys(events).forEach((eventName) => (events[eventName] = events[eventName].bind(that)));
    return events;
  }
}
