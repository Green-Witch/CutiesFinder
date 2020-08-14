import axios from "axios";
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
} from "./user_action_types";
import { return_errors_ac } from "./error_action_creators";

// =======================
// Login AC:
// =======================
export const login_ac = (data) => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  try {
    const user = await axios.post("api/user/login", data, set_config(getState));
    dispatch({ type: LOGIN_SUCCESS, payload: user.data });
  } catch (err) {
    dispatch(
      return_errors_ac({
        msg: err.response.data,
        status: err.response.status,
        id: "LOGIN_FAILED",
      })
    );

    dispatch({ type: LOGIN_FAIL });
  }
};

// =======================
// Register AC:
// =======================
export const register_ac = (data) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const user = await axios.post("/api/user", data, set_config);
    dispatch({ type: REGISTER_SUCCESS, payload: user.data });
  } catch (err) {
    dispatch(
      return_errors_ac({
        msg: err.response.data,
        status: err.response.status,
        id: "REGISTER_FAILED",
      })
    );

    dispatch({ type: REGISTER_FAIL });
  }
};

// ================
// Update
// ================
export const update_info_ac = (id, data) => async (dispatch, getState) => {
  try {
    const updated_user = await axios.patch(
      `/api/user/${id}`,
      data,
      set_config(getState)
    );
    dispatch({ type: UPDATE_SUCCESS, payload: updated_user.data });
  } catch (err) {
    dispatch(
      return_errors_ac({
        msg: err.response.data,
        status: err.response.status,
        id: "UPDATE_FAILED",
      })
    );
    dispatch({ type: UPDATE_FAILED });
  }
};

// ================
// Verification
// ================
export const verification = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  try {
    const user = await axios.get("/api/user/auth", set_config(getState));
    dispatch({ type: USER_LOADED, payload: user.data });
  } catch (err) {
    dispatch(
      return_errors_ac({
        msg: err.response.data,
        status: err.response.status,
        id: "VERIFICATION_FAILED",
      })
    );

    dispatch({ type: VERIFICATION_FAILED });
  }
};

// ===============
// Logout AC
// ===============
export const logout_ac = () => ({ type: LOG_OUT_SUCCESS });

// Config Headers
export const set_config = (getState, is_form_data = null) => {
  let token;
  if (getState) {
    token = getState().user.token;
  }

  const config = {
    headers: {
      "Content-Type": is_form_data ? "multipart/form-data" : "application/json",
    },
  };

  if (token) {
    config.headers["auth-token"] = token;
  }

  return config;
};
