import { Listener, Cb, BusEvents, StoreEvents } from "./types";

export default class EventBus {
  listeners: Listener;
  constructor() {
    this.listeners = {};
  }

  on(event: BusEvents | StoreEvents, callback: Cb) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: BusEvents | StoreEvents, callback: Cb) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: BusEvents | StoreEvents, ...args: unknown[]) {
    if (!this.listeners[event]) {
      console.error(`Нет обработчиков на событие: ${event}`);
    } else {
      this.listeners[event].forEach(function (listener) {
        listener(...args);
      });
    }
  }
}
