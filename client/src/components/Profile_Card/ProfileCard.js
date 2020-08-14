import React, { useState } from "react";
import ProfileCardUI from "./ProfileCardUI";

// Redux
import { connect } from "react-redux";
import {
  delete_profile_ac,
  load_profile_by_id_ac,
} from "../../redux/actions/profile_action_creators";

const ProfileCard = ({
  profile,
  is_authenticated,
  can_delete,
  delete_profile,
  use_link,
  load_current_profile,
  home_view,
}) => {
  const handle_delete = (id) => delete_profile(id);

  const handle_click = () => load_current_profile(profile);

  const [is_open, set_is_open] = useState(false);

  return (
    <ProfileCardUI
      profile={profile}
      is_authenticated={is_authenticated}
      can_delete={can_delete}
      use_link={use_link}
      home_view={home_view}
      handle_delete={handle_delete}
      handle_click={handle_click}
      is_open={is_open}
      set_is_open={set_is_open}
    />
  );
};

const MDTP = (dispatch) => ({
  delete_profile: (id) => dispatch(delete_profile_ac(id)),
  load_current_profile: (profile) => dispatch(load_profile_by_id_ac(profile)),
});

export default connect(null, MDTP)(ProfileCard);
