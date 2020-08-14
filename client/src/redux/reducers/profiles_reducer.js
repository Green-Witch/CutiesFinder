import {
  PROFILES_LOADING,
  PROFILES_LOADED,
  USER_PROFILES_LOADED,
  PROFILES_LOAD_FAILED,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAILED,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_FAILED,
  PROFILES_CLEAR,
  PROFILE_LOADED,
} from "../actions/profile_actions";

const inital_state = {
  profiles_loading: false,
  profiles: {
    total_results: null,
    profiles: [],
  },
  user_profiles: [],
  profile_to_view: {},
};

export default (state = inital_state, action) => {
  switch (action.type) {
    case PROFILES_LOADING:
      return {
        ...state,
        profiles_loading: true,
      };
    case USER_PROFILES_LOADED:
      return {
        ...state,
        user_profiles: [...action.payload],
        profiles_loading: false,
      };
    case PROFILES_LOADED:
      return {
        ...state,
        profiles: {
          total_results: action.payload.total_results,
          profiles: [...action.payload.results],
        },
        profiles_loading: false,
      };
    case PROFILE_LOADED:
      return {
        ...state,
        profile_to_view: action.payload,
      };
    case PROFILE_CREATE_SUCCESS:
      return {
        ...state,
        user_profiles: [...state.user_profiles, action.payload],
      };
    case PROFILE_DELETE_SUCCESS:
      return {
        ...state,
        user_profiles: [
          ...state.user_profiles.filter(
            (profile) => profile._id !== action.payload
          ),
        ],
        profiles: {
          total_results: state.profiles.total_results - 1,
          profiles: [
            ...state.profiles.profiles.filter(
              (profile) => profile._id !== action.payload
            ),
          ],
        },
        profiles_loading: false,
      };
    case PROFILES_CLEAR:
      return {
        ...state,
        profiles_loading: false,
        profiles: {
          total_results: null,
          profiles: [],
        },
        user_profiles: [],
      };
    case PROFILES_LOAD_FAILED:
      return {
        user_profiles: [],
        profiles: {
          total_results: null,
          profiles: [],
        },
        profiles_loading: false,
        profile_to_view: {},
      };
    case PROFILE_CREATE_FAILED:
    case PROFILE_DELETE_FAILED:
    default:
      return state;
  }
};
