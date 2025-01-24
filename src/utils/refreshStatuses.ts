import store from "../framework/store/Store";
import { STATUS } from "../framework/store/types";

export function refreshStatus() {
  store.set("statuses.avatarLoading", STATUS.PENDING);
  store.set("statuses.fileLoading", STATUS.PENDING);
  store.set("statuses.userAdding", STATUS.PENDING);
  store.set("statuses.userDeleting", STATUS.PENDING);
}
