import { UserAvatar, UserProfile, UserProfilePassword } from "../../framework/store/types";
import { HTTPTransport } from "../XHR";
import { BaseAPI } from "./base-api";

const chatAPIInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/user");

export class UserAPI extends BaseAPI {
  static async profile(userData: UserProfile) {
    return chatAPIInstance.put("/profile", {
      data: userData,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
  static async password(userData: UserProfilePassword) {
    return chatAPIInstance.put("/password", {
      data: userData,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
  static async avatar(userData: UserAvatar) {
    return chatAPIInstance.put("/profile/avatar", {
      data: userData,
      credentials: true,
    });
  }
}
