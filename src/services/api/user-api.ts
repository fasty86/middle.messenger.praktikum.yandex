import { UserAvatar, UserProfile, UserProfilePassword } from "../../framework/store/types";
import { HTTPTransport } from "../XHR";
import { BaseAPI } from "./base-api";

const userApiInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/user");

export class UserAPI extends BaseAPI {
  static async profile(userData: UserProfile) {
    return userApiInstance.put("/profile", {
      data: userData,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
  static async password(userData: UserProfilePassword) {
    return userApiInstance.put("/password", {
      data: userData,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
  static async avatar(userData: UserAvatar) {
    return userApiInstance.put("/profile/avatar", {
      data: userData,
      credentials: true,
    });
  }
  static async search_user(login: { login: string }) {
    return userApiInstance.post("/search", {
      data: login,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
}
