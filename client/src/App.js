import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
// CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AnimatePresence } from "framer-motion";
// Components
import Navbar from "./components/Nav/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserProfile from "./components/User_Profile/UserProfile";
import Home from "./components/Home/Home";

// Redux Setup
import { Provider } from "react-redux";
import store from "./redux/store";
import { verification } from "./redux/actions/user_action_creators";
import PetProfile from "./components/Pet_Profile/PetProfile";

const App = () => {
  const location = useLocation();
  // =============================
  // Dynamically Change Layout Size
  // =============================
  const [width, set_width] = useState(null);

  const update_width = () => {
    if (window.innerWidth < 576) {
      set_width("sm");
    } else {
      set_width("lg");
    }
  };

  useEffect(() => update_width(), []);
  useEffect(() => {
    window.addEventListener("resize", update_width);
    return () => window.removeEventListener("resize", update_width);
  }, [width]);

  // =============================
  //         Verify User
  // =============================
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.dispatch(verification());
    }
  }, []);

  return (
    <Provider store={store}>
      <Navbar width={width} />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/">
            <Home width={width} />
          </Route>
          <Route path="/user/profile/:id">
            <UserProfile width={width} />
          </Route>
          <Route path="/profile/:id">
            <PetProfile />
          </Route>
        </Switch>
      </AnimatePresence>
    </Provider>
  );
};

export default App;
