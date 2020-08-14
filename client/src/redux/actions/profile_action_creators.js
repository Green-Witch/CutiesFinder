import axios from "axios";
import {
  PROFILES_LOADING,
  PROFILES_LOADED,
  USER_PROFILES_LOADED,
  PROFILES_LOAD_FAILED,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAILED,
  PROFILE_CREATE_FAILED,
  PROFILE_CREATE_SUCCESS,
  PROFILES_CLEAR,
  PROFILE_LOADED,
} from "./profile_actions";
import { return_errors_ac } from "./error_action_creators";
import { set_config } from "./user_action_creators";

// ==================================
// Get Profiles Of the Logged User AC
// ==================================
export const get_user_created_profiles_ac = (id) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PROFILES_LOADING });
  try {
    const profiles = await axios.get(
      `/api/pet/profiles/user/${id}`,
      set_config(getState)
    );
    dispatch({ type: USER_PROFILES_LOADED, payload: profiles.data });
  } catch (err) {
    dispatch({ type: PROFILES_LOAD_FAILED });
    dispatch(
      return_errors_ac({
        msg: err.response.data,
        status: err.response.status,
        id: "PROFILES_LOAD_FAILED",
      })
    );
  }
};

// ==================================
// Delete A Profile By Id AC
// ==================================
export const delete_profile_ac = (id) => async (dispatch, getState) => {
  try {
    const delete_response = await axios.delete(
      `/api/pet/${id}`,
      set_config(getState)
    );
    if (delete_response.data === 1)
      return dispatch({ type: PROFILE_DELETE_SUCCESS, payload: id });

    dispatch({ type: PROFILE_DELETE_FAILED });
  } catch (err) {
    dispatch({ type: PROFILE_DELETE_FAILED });
    dispatch(
      return_errors_ac({
        msg: err.response.data,
        status: err.response.status,
        id: "PROFILE_DELETE_FAILED",
      })
    );
  }
};

// ==================================
// Create New Profile AC
// ==================================
export const create_profile_ac = (data) => async (dispatch, getState) => {
  try {
    const form_data = new FormData();

    for (const property in data) {
      form_data.append(property, data[property]);
    }

    const new_profile = await axios.post(
      "/api/pet",
      form_data,
      set_config(getState, true)
    );
    dispatch({ type: PROFILE_CREATE_SUCCESS, payload: new_profile.data });
  } catch (err) {
    dispatch(
      return_errors_ac({
        msg: err.response.data,
        status: err.response.status,
        id: "PROFILE_CREATE_FAILED",
      })
    );
    dispatch({ type: PROFILE_CREATE_FAILED });
  }
};

// ======================
// Load All Profiles
// ======================
export const get_profiles_ac = (queries) => async (dispatch) => {
  dispatch({ type: PROFILES_LOADING });
  try {
    const { page, limit } = queries;
    const profiles = await axios.get(`/api/pet?page=${page}&limit=${limit}`);
    dispatch({ type: PROFILES_LOADED, payload: profiles.data });
  } catch (err) {
    dispatch(
      return_errors_ac({
        msg: err.response.data,
        status: err.response.status,
        id: "Failed To Load Profiles",
      })
    );
    dispatch({ type: PROFILES_LOAD_FAILED });
  }
};

// =========================
// Clear Profiles In Store
// =========================
export const clear_stored_profiles_ac = () => ({ type: PROFILES_CLEAR });

// =========================
// Load a Single Profile Using Its ID
// =========================
export const load_profile_by_id_ac = (data) => ({
  type: PROFILE_LOADED,
  payload: data,
});
