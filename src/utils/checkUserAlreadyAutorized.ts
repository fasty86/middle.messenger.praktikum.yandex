import { UserController } from "../framework/Store/controllers/userController";
import store from "../framework/Store/Store";

export async function checkUserAlreadyAutorized() {
  const user = store.getState().user;
  if (user) {
    const response = await UserController.logout();
    return response;
  }
  return false;
}
