import { UserAPI } from "../../../services/api/user-api";
import { UserAuthAPI } from "../../../services/api/user-auth-api";
import store from "../Store";

import {
  STATUS,
  UserAuthType,
  UserAvatar,
  UserInfoType,
  UserLoginType,
  UserProfile,
  UserProfilePassword,
} from "../types";

export class UserController {
  public static async getUser() {
    const response = await UserAuthAPI.getUser();
    if (response.ok) {
      store.set("user", response.json());
    }
    return response.ok;
  }
  public static async logout() {
    const response = await UserAuthAPI.logout();
    if (response.ok) {
      store.set("user", null);
    }
    return response.ok;
  }
  public static async register(userData: UserAuthType) {
    const response = await UserAuthAPI.signup(userData);
    console.log(response.json(), `status:${response.status}`);
  }

  public static async login(userData: UserLoginType) {
    const response = await UserAuthAPI.signin(userData);
    console.log(response.json(), `status:${response.status}`);
  }
  public static async profile(userData: UserProfile) {
    const response = await UserAPI.profile(userData);
    console.log(response.json(), `status:${response.status}`);
    if (response.ok) {
      store.set("user", response.json());
    }
    return response.ok;
  }
  public static async search_user(login: string) {
    const loginData = { login };

    const response = await UserAPI.search_user(loginData);
    console.log(response.json(), `status:${response.status}`);
    if (response.ok) {
      const userId = response.json<UserInfoType[]>()[0].id;
      return userId;
    }
    return response.ok;
  }
  public static async password(userData: UserProfilePassword) {
    const response = await UserAPI.password(userData);
    console.log(response.json(), `status:${response.status}`);
    if (response.ok) {
      store.set("user", response.json());
    }
    return response.ok;
  }
  public static async avatar(userData: UserAvatar) {
    const response = await UserAPI.avatar(userData);
    console.log(response.json(), `status:${response.status}`);
    if (response.ok) {
      store.set("user", response.json());
      store.set("statuses.avatarLoading", STATUS.SUCCESS);
    } else store.set("statuses.avatarLoading", STATUS.ERROR);
    return response.ok;
  }
}
