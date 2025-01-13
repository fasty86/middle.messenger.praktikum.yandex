import { UserAuthType } from "../../framework/store/types";
import { HTTPTransport } from "../XHR";
import { BaseAPI } from "./base-api";

const chatAPIInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/auth");
export type userData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};
// const testuser: userData = {
//   first_name: "test",
//   second_name: "test",
//   login: "test_login",
//   email: "test@yandex.ru",
//   password: "12345",
//   phone: "1234567890",
// };
export class UserAPI extends BaseAPI {
  static async signup(userData: UserAuthType) {
    return chatAPIInstance.post("/signup", {
      data: userData,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
  static async getUser() {
    return chatAPIInstance.get("/user", {
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }

  request() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.get("/full");
  }
}
console.log("api");
