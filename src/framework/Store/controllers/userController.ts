import { UserAPI } from "../../../services/api/user-api";
import store from "../Store";
import { UserAuthType } from "../types";

export class UserController {
  public static async getUser() {
    // UserAPI.getUser().then((data) => console.log("userdata:", data));
    const response = await UserAPI.getUser();
    console.log(response.json(), `status:${response.status}`);
  }
  public static async createUser(userData: UserAuthType) {
    const response = await UserAPI.signup(userData);
    console.log(response.json(), `status:${response.status}`);
  }
}
