import { UserAPI } from "../../../services/api/user-api";
import store from "../Store";
import { UserAuthType, UserLoginType } from "../types";

export class UserController {
  public static async getUser() {
    // UserAPI.getUser().then((data) => console.log("userdata:", data));
    const response = await UserAPI.getUser();
    console.log(response.json(), `status:${response.status}`);
  }
  public static async register(userData: UserAuthType) {
    const response = await UserAPI.signup(userData);
    console.log(response.json(), `status:${response.status}`);
  }
  public static async login(userData: UserLoginType) {
    const response = await UserAPI.signin(userData);
    console.log(response.json(), `status:${response.status}`);
  }
}
