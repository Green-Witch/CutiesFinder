import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  VERIFICATION_FAILED,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
} from "../actions/user_action_types";

const initial_state = {
  token: localStorage.getItem("token"),
  user: null,
  is_authenticated: false,
  is_loading: false,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        is_loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        is_loading: false,
        is_authenticated: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...action.payload,
        is_authenticated: true,
        is_loading: false,
      };

    case LOG_OUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case VERIFICATION_FAILED:
      localStorage.removeItem("token");
      return {
        token: null,
        user: null,
        is_authenticated: false,
        is_loading: false,
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
          email: action.payload.email,
        },
      };

    case UPDATE_FAILED:
    default:
      return state;
  }
};
