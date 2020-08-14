import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PetProfileUI from "./PetProfileUI";

const PetProfile = ({ profile, is_authenticated }) => {
  let history = useHistory();
  if (!profile.name) {
    history.push("/");
    return null;
  }

  return <PetProfileUI profile={profile} is_authenticated={is_authenticated} />;
};

const MSTP = (state) => ({
  profile: state.profiles.profile_to_view,
  is_authenticated: state.user.is_authenticated,
});

export default connect(MSTP, null)(memo(PetProfile));
