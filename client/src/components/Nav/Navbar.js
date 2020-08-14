import React, { useState } from "react";
import { useHistory } from "react-router";
// Redux Imports
import { connect } from "react-redux";
import { logout_ac } from "../../redux/actions/user_action_creators";

// UI Imports
import { NavSmallUI, NavLargeUI } from "./nav_ui";

const Navbar = ({ user, width, logout }) => {
  let history = useHistory();

  const [toggle, set_toggle] = useState(false);
  const handle_toggle = () => set_toggle((prevState) => set_toggle(!prevState));

  const handle_logout = () => {
    logout();
    history.push("/");
  };

  if (width === "sm") {
    return (
      <NavSmallUI
        toggle={toggle}
        set_toggle={set_toggle}
        handle_logout={handle_logout}
        handle_toggle={handle_toggle}
        user={user}
      />
    );
  }

  return <NavLargeUI user={user} handle_logout={handle_logout} />;
};

const MSTP = (state) => ({
  user: state.user,
});

const MDTP = (dispatch) => ({
  logout: () => dispatch(logout_ac()),
});

export default connect(MSTP, MDTP)(Navbar);
