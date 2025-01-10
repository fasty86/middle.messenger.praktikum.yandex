import { State } from "./Store";

import { MutationKeys } from "./Store";

export default {
  [MutationKeys.CREATE_CHAT]: (state: State, payload: unknown) => {
    state.test = payload;
    return state;
  },
};
