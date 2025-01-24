import { UserAuthType, UserLoginType } from "../../framework/Store/types";
import { HTTPTransport } from "../XHR";
import { ApiDestinations, BaseAPI } from "./base-api";

const chatAPIInstance = new HTTPTransport(ApiDestinations.AUTH);

export class UserAuthAPI extends BaseAPI {
  static async signup(userData: UserAuthType) {
    return chatAPIInstance.post("/signup", {
      data: userData,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }

  static async signin(userData: UserLoginType) {
    return chatAPIInstance.post("/signin", {
      data: userData,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
  static async logout() {
    return chatAPIInstance.post("/logout", {
      credentials: true,
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
}
