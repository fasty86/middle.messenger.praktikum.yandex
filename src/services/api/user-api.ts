import { UserAvatar, UserProfile, UserProfilePassword } from "../../framework/Store/types";
import { HTTPTransport } from "../XHR";
import { ApiDestinations, BaseAPI } from "./base-api";

const userApiInstance = new HTTPTransport(ApiDestinations.USER);

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
