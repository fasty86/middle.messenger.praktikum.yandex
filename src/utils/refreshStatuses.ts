import store from "../framework/Store/Store";
import { STATUS } from "../framework/Store/types";

export function refreshStatus() {
  store.set("statuses.avatarLoading", STATUS.PENDING);
  store.set("statuses.fileLoading", STATUS.PENDING);
  store.set("statuses.userAdding", STATUS.PENDING);
  store.set("statuses.userDeleting", STATUS.PENDING);
}
