import React, { useState, useEffect, useCallback, useRef, memo } from "react";

// Redux
import { connect } from "react-redux";
import {
  get_profiles_ac,
  clear_stored_profiles_ac,
} from "../../redux/actions/profile_action_creators";
import HomeUI from "./HomeUI";

const Home = ({
  load_profiles,
  is_loading,
  profiles,
  total_results,
  is_authenticated,
  clear_stored_profiles,
}) => {
  const number_of_results = total_results || 0;

  const [page, set_page] = useState(1);
  const [loaded_profiles, set_loaded_profiles] = useState([]);
  const [left, set_left] = useState(number_of_results - loaded_profiles.length);

  const observer = useRef();
  const last_element_ref = useCallback(
    (node) => {
      if (is_loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          loaded_profiles.length < total_results
        ) {
          set_page((prev_page) => prev_page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [left]
  );

  useEffect(() => {
    // Clear profiles from the store upon leaving Home to allow a new infinite scroll to begin
    return () => {
      clear_stored_profiles();
      set_loaded_profiles([]);
    };
  }, []);

  useEffect(() => {
    load_profiles({ page: page, limit: 10 });
  }, [page]);

  useEffect(() => {
    if (profiles.length > 0 && !is_loading) {
      set_left(total_results - loaded_profiles.length);
      set_loaded_profiles((prev_state) => [...prev_state, ...profiles]);
    }
  }, [profiles]);

  return (
    <HomeUI
      loaded_profiles={loaded_profiles}
      is_authenticated={is_authenticated}
      is_loading={is_loading}
      last_element_ref={last_element_ref}
    />
  );
};

const MDTP = (dispatch) => ({
  load_profiles: (query) => dispatch(get_profiles_ac(query)),
  clear_stored_profiles: () => dispatch(clear_stored_profiles_ac()),
});

const MSTP = (state) => ({
  profiles: state.profiles.profiles.profiles,
  total_results: state.profiles.profiles.total_results,
  is_loading: state.profiles.profiles_loading,
  is_authenticated: state.user.is_authenticated,
});

export default connect(MSTP, MDTP)(memo(Home));
