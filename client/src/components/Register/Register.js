import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
// Styled Components

// Redux Imports
import { connect } from "react-redux";
import { register_ac } from "../../redux/actions/user_action_creators";
import { clear_errors_ac } from "../../redux/actions/error_action_creators";
import RegisterUI from "./RegisterUI";

const Register = ({ register, logged_in, is_loading, error, clear_errors }) => {
  const history = useHistory();

  // State
  const [username, set_username] = useState("");
  const [empty_username, set_empty_username] = useState(false);
  const [email, set_email] = useState("");
  const [empty_email, set_empty_email] = useState(false);
  const [password, set_password] = useState("");
  const [empty_password, set_empty_password] = useState(false);
  const [msg, set_msg] = useState(null);

  // Event Handlers
  const handle_change = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "username":
        set_username(value);
        set_empty_username(false);
        break;
      case "email":
        set_email(value);
        set_empty_email(false);
        break;
      case "password":
        set_password(value);
        value.length >= 5
          ? set_empty_password(false)
          : set_empty_password(true);
        break;
      default:
        return null;
    }
  };

  const handle_submit = (e) => {
    e.preventDefault();
    if (!username || !email || password.length <= 4) {
      username === "" ? set_empty_username(true) : set_empty_username(false);
      email === "" ? set_empty_email(true) : set_empty_email(false);
      password.length <= 4
        ? set_empty_password(true)
        : set_empty_password(false);
      password.length <= 4 && email
        ? set_msg("Password must be at least 5 characters long")
        : set_msg(null);
      return;
    }
    register({ username, email, password });
  };

  useEffect(() => {
    if (logged_in) {
      set_username("");
      set_email("");
      set_password("");
      clear_errors();
      history.push("/");
    }
  }, [logged_in]);

  useEffect(() => {
    if (typeof error.msg === "string" && error.id) {
      return set_msg(error.msg);
    } else if (typeof error.msg === "object" && error.id) {
      return set_msg("Invalid Email Format");
    }
  }, [error]);

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        set_msg(null);
        clear_errors();
      }, 3000);
    }
  }, [msg]);

  useEffect(() => () => clear_errors(), []);

  return (
    <RegisterUI
      handle_submit={handle_submit}
      handle_change={handle_change}
      msg={msg}
      username={username}
      empty_username={empty_username}
      email={email}
      empty_email={empty_email}
      password={password}
      empty_password={empty_password}
      is_loading={is_loading}
    />
  );
};

const MSTP = (state) => ({
  is_loading: state.user.is_loading,
  logged_in: state.user.is_authenticated,
  error: state.error,
});

const MDTP = (dispatch) => ({
  register: (data) => dispatch(register_ac(data)),
  clear_errors: () => dispatch(clear_errors_ac()),
});

export default connect(MSTP, MDTP)(Register);
