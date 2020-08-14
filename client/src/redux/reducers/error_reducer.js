import { RETURN_ERRORS, CLEAR_ERRORS } from "../actions/error_action_types";

const initial_state = {
  msg: null,
  status: null,
  id: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case RETURN_ERRORS:
      return {
        ...action.payload,
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
        id: null,
      };
    default:
      return state;
  }
};
