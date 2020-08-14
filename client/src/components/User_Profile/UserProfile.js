import React, { useEffect } from "react";
import { useHistory, Switch, Route, useRouteMatch } from "react-router-dom";

// Components and Style Related
import { motion } from "framer-motion";
import UserPage from "./UserPage";
import CreateProfile from "./CreateProfile";
import Loader from "../Loader/Loader";
import { StyledNavLink, container_variants } from "../shared_styles";
import { BreadCrumbsNav } from "./profile_styles";

// Redux
import { connect } from "react-redux";
import { get_user_created_profiles_ac } from "../../redux/actions/profile_action_creators";

const UserProfile = ({
  error,
  user,
  is_loading,
  get_profiles,
  profiles,
  width,
}) => {
  let history = useHistory();
  let { path, url } = useRouteMatch();

  useEffect(() => {
    if (error.id === "VERIFICATION_FAILED") {
      history.push("/");
    }
  });

  useEffect(() => {
    if (user.user) {
      if (user.user.id) {
        get_profiles(user.user.id);
      }
    }
  }, [user]);

  const nav = (
    <BreadCrumbsNav>
      <StyledNavLink exact={true} to="/" color="primary">
        Home
      </StyledNavLink>

      <StyledNavLink exact={true} to={`${url}`} color="primary">
        User Info
      </StyledNavLink>

      <StyledNavLink exact={true} to={`${url}/create_profile`} color="primary">
        Create Pet Profile
      </StyledNavLink>
    </BreadCrumbsNav>
  );

  return (
    <motion.div
      variants={container_variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {nav}
      {is_loading && !user.user ? (
        <Loader />
      ) : (
        <>
          <Switch>
            <Route exact path={`${path}`}>
              <UserPage
                user={user.user}
                is_authenticated={user.is_authenticated}
                profiles={profiles}
                width={width}
              />
            </Route>

            <Route path={`${path}/create_profile`}>
              <CreateProfile />
            </Route>
          </Switch>
        </>
      )}
    </motion.div>
  );
};

const MSTP = (state) => ({
  error: state.error,
  user: state.user,
  is_loading: state.user.is_loading,
  profiles: state.profiles.user_profiles,
});

const MDTP = (dispatch) => ({
  get_profiles: (id) => dispatch(get_user_created_profiles_ac(id)),
});

export default connect(MSTP, MDTP)(UserProfile);
