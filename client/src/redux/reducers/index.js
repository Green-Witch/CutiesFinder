import { combineReducers } from "redux";
import user_reducer from "./user_reducer";
import profiles_reducer from "./profiles_reducer";
import error_reducer from "./error_reducer";

export default combineReducers({
  user: user_reducer,
  profiles: profiles_reducer,
  error: error_reducer,
});
