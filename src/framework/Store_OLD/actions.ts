import Store from "./Store";
import { ActionKeys } from "./Store";
import { MutationKeys } from "./Store";

export default {
  [ActionKeys.CREATE_USER]: (context: Store, payload: unknown) => {
    context.commit(MutationKeys.CREATE_CHAT, payload);
  },
};
