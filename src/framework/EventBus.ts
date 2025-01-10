import { Listener, Cb, BusEvents, StoreEvents } from "./types";
// import { AuthAPI, userData } from "../services/api/auth-api";

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
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
// const testuser: userData = {
//   first_name: "test",
//   second_name: "test",
//   login: "testasdfasdfqweasdfasdfaf_login",
//   email: "testdsfsdfqwesfd@yandex.ru",
//   password: "12345",
//   phone: "1234567890",
// };
// new AuthAPI()
//   .signup(testuser)
//   .then((response) => {
//     console.log(response);
//     console.log(response.json());
//   })
//   .catch((error) => {
//     console.log("errrfsf");
//   });
