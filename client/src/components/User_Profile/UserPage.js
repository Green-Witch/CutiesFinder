import React from "react";
import UserPageUI from "./UserPageUI";

// Redux
import { connect } from "react-redux";
import { update_info_ac } from "../../redux/actions/user_action_creators";
import { clear_errors_ac } from "../../redux/actions/error_action_creators";

const UserPage = ({ profiles, is_loading, is_authenticated, width }) => (
  <UserPageUI
    width={width}
    profiles={profiles}
    is_authenticated={is_authenticated}
    is_loading={is_loading}
  />
);

const MSTP = (state) => ({
  error: state.error,
  is_loading: state.profiles.profiles_loading,
});

const MDTP = (dispatch) => ({
  update: (id, update_object) => dispatch(update_info_ac(id, update_object)),
  clear_errors: () => dispatch(clear_errors_ac()),
});

export default connect(MSTP, MDTP)(UserPage);
