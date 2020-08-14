import React, { useState, useEffect, memo } from "react";
import { useHistory } from "react-router";
import LoginUI from "./LoginUI";

// Redux Imports
import { connect } from "react-redux";
import { login_ac } from "../../redux/actions/user_action_creators";
import { clear_errors_ac } from "../../redux/actions/error_action_creators";

const Login = memo(({ login, logged_in, is_loading, error, clear_errors }) => {
  const history = useHistory();

  // State
  const [email, set_email] = useState("");
  const [empty_email, set_empty_email] = useState(false);
  const [password, set_password] = useState("");
  const [empty_password, set_empty_password] = useState(false);
  const [msg, set_msg] = useState(null);

  const clear_msg = () => {
    setTimeout(() => {
      set_msg(null);
    }, 3000);
  };

  // Event Handlers
  const handle_change = ({ target }) => {
    const { name, value } = target;
    name === "email" ? set_email(value) : set_password(value);
    name === "email" ? set_empty_email(false) : set_empty_password(false);
  };

  const handle_submit = (e) => {
    e.preventDefault();
    if (!email || password.length <= 4) {
      email === "" ? set_empty_email(true) : set_empty_email(false);
      password.length <= 4
        ? set_empty_password(true)
        : set_empty_password(false);
      password.length <= 4 && email
        ? set_msg("Password must be at least 5 characters long")
        : set_msg(null);
      return;
    }
    login({ email, password });
  };

  useEffect(() => {
    if (logged_in) {
      set_email("");
      set_password("");
      clear_errors();
      history.push("/");
    }
  }, [logged_in]);

  useEffect(() => {
    set_msg(error.msg);
  }, [error]);

  useEffect(() => {
    if (msg) {
      clear_msg();
    }

    return () => clearTimeout(clear_msg);
  }, [msg]);

  return (
    <LoginUI
      email={email}
      empty_email={empty_email}
      password={password}
      empty_password={empty_password}
      handle_change={handle_change}
      handle_submit={handle_submit}
      is_loading={is_loading}
      msg={msg}
    />
  );
});

const MSTP = (state) => ({
  is_loading: state.user.is_loading,
  logged_in: state.user.is_authenticated,
  error: state.error,
});

const MDTP = (dispatch) => ({
  login: (data) => dispatch(login_ac(data)),
  clear_errors: () => dispatch(clear_errors_ac()),
});

export default connect(MSTP, MDTP)(Login);
