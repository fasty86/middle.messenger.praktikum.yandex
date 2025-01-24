import { UserAPI } from "../../../services/api/user-api";
import { UserAuthAPI } from "../../../services/api/user-auth-api";
import { showToast } from "../../../utils/toast";
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
    if (response.ok) {
      showToast("Пользователь зарегистрирован", "success");
    } else {
      const reason = response.json<{ reason: string }>().reason || "Ошибка";
      showToast(`${reason}`, "error");
    }
    return response.ok;
  }

  public static async login(userData: UserLoginType) {
    const response = await UserAuthAPI.signin(userData);
    if (response.ok) {
      showToast("Успешный вход в систему", "success");
    } else {
      const reason = response.json<{ reason: string }>().reason || "Ошибка";
      showToast(`${reason}`, "error");
    }
    return response.ok;
  }
  public static async profile(userData: UserProfile) {
    const response = await UserAPI.profile(userData);
    if (response.ok) {
      store.set("user", response.json());
      showToast("Данные профиля изменены", "success");
    } else {
      const reason = response.json<{ reason: string }>().reason || "Ошибка";
      showToast(`${reason}`, "error");
    }
    return response.ok;
  }
  public static async search_user(login: string) {
    const loginData = { login };

    const response = await UserAPI.search_user(loginData);
    const users = response.json<UserInfoType[]>();
    if (response.ok && users.length !== 0) {
      const userId = users[0].id;
      return userId;
    } else return false;
  }
  public static async password(userData: UserProfilePassword) {
    const response = await UserAPI.password(userData);
    if (response.ok) {
      store.set("user", response.json());
    }
    return response.ok;
  }
  public static async avatar(userData: UserAvatar) {
    const response = await UserAPI.avatar(userData);
    if (response.ok) {
      store.set("user", response.json());
      store.set("statuses.avatarLoading", STATUS.SUCCESS);
    } else store.set("statuses.avatarLoading", STATUS.ERROR);
    return response.ok;
  }
}
