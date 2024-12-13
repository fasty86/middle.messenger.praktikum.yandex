import EventBus from "./EventBus";
import Handlebars from "handlebars";
import {
    AttributeType,
    BusEvents,
    ChildrensType,
    DefaultObject,
    EventsType,
    ListType,
    RootDataType,
} from "./types";
import { PropsType } from "./types";
import { isFunction, isHTMLElement } from "../types/typeguards";

export default class Block {
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
    bindedEvents: never[];

    constructor(tagName = "div", props: PropsType) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
            _id: this.generateId(),
        };
        // const [propsParsed, childrens, lists] = this._parseProps(props);
        const {
            rootData = {},
            attributes = {},
            childrens = {},
            lists = {},
            events = {},
        } = props;
        this.rootData = this._makePropsProxy(rootData);
        this.lists = this._makePropsProxy(lists);
        this.attributes = attributes;
        this.childrens = childrens;
        this.events = this.bindEvents(events);
        this._id = this.generateId();
        this.eventBus = (): EventBus => eventBus;
        this._registerEvents(eventBus);
        this.bindedEvents = [];
        eventBus.emit(BusEvents.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(BusEvents.INIT, this.init.bind(this));
        eventBus.on(BusEvents.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(BusEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(BusEvents.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {}

    init() {
        this._createResources();
        this.eventBus().emit(BusEvents.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }
    _parseProps(initialProps: PropsType) {
        let [props, childrens, lists] = [{}, {}, {}];
        Object.entries(initialProps).forEach(([key, value]) => {
            if (value instanceof Block)
                childrens = { ...childrens, ...{ [key]: value } };
            else if (Array.isArray(value))
                lists = { ...lists, ...{ [key]: value } };
            else props = { ...props, ...{ [key]: value } };
        });
        console.log("parsedProps", props, childrens);
        return [props, childrens];
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {
        console.log("Компанент замаунтился");
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(BusEvents.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: unknown, newProps: unknown) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(BusEvents.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: unknown, newProps: unknown) {
        console.log(`Old vs new props`, oldProps, newProps);
        return true;
    }

    setProps = (nextProps: RootDataType) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.rootData, nextProps.rootData);
    };

    get element() {
        return this._element;
    }

    _render() {
        console.log("рендер");
        const fragment = this._createDocumentElement(
            "template",
        ) as HTMLTemplateElement;
        const content = this.getContentElements();
        // формируем шаблон с заглушками для Block элементов и списков
        fragment.innerHTML = Handlebars.compile(this.render())({
            ...this.rootData,
            ...content,
        });
        // Замещаем заглушки на реальные элементы
        this.replaceLists(fragment);
        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this.removeEventListeners();
            this.addEventListeners(this.events, newElement);
            this._element.replaceWith(newElement);
        } else {
            this._element = newElement;
            this.addEventListeners(this.events, this._element as HTMLElement);
        }

        this.eventBus().emit(BusEvents.FLOW_CDM);
    }

    // Может переопределять пользователь, необязательно трогать
    render() {}

    getContent(): HTMLElement {
        return this._element as HTMLElement;
    }

    _makePropsProxy<T extends object>(target: T) {
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
                throw new Error("No access");
            },
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        if (isHTMLElement(this._element)) this._element.style.display = "block";
    }

    hide() {
        if (isHTMLElement(this._element)) this._element.style.display = "none";
    }

    setAtrributies(attributes: AttributeType) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (isHTMLElement(this._element))
                this._element.setAttribute(key, value);
        });
    }
    generateId() {
        const id = Math.floor(Math.random() * Date.now());
        return id;
    }
    addEventListeners(events: EventsType, target: HTMLElement) {
        Object.entries(events).forEach(([eventName, callback]) => {
            target.addEventListener(eventName, callback);
        });
    }
    removeEventListeners() {
        Object.entries(this.events).forEach(([eventName, callback]) => {
            if (isHTMLElement(this._element))
                this._element.removeEventListener(eventName, callback);
        });
    }
    getContentElements() {
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
    replaceChildrens(fragment: HTMLTemplateElement) {
        Object.values(this.childrens).forEach((child) => {
            const childPlace = fragment.content.querySelector(
                `[data-id="${child._meta._id}"]`,
            );
            if (childPlace) {
                childPlace.replaceWith(child.getContent());
            }
        });
    }

    replaceLists(fragment: HTMLTemplateElement) {
        Object.entries(this.lists).forEach(([key, child]) => {
            const listCont = this._createDocumentElement(
                "template",
            ) as HTMLTemplateElement;
            child.forEach((item) => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent());
                } else {
                    listCont.content.append(item);
                }
            });
            const listPlace = fragment.content.querySelector(
                `[data-id="l_${key}_${this._meta._id}"]`,
            );
            if (listPlace) {
                listPlace.replaceWith(listCont.content);
            }
        });
    }

    bindEvents(events: EventsType) {
        const that = this;
        Object.keys(events).forEach(
            (eventName) => (events[eventName] = events[eventName].bind(that)),
        );
        return events;
    }
}
