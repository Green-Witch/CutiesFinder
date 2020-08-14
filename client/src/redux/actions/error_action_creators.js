import { RETURN_ERRORS, CLEAR_ERRORS } from "./error_action_types";

// Return errors:
export const return_errors_ac = ({ msg, status, id }) => {
  return {
    type: RETURN_ERRORS,
    payload: { msg, status, id },
  };
};

export const clear_errors_ac = () => ({ type: CLEAR_ERRORS });
