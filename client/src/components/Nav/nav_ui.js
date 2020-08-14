import React, { memo } from "react";

// Component and Style Imports
import { StyledNavLink } from "../shared_styles";
import {
  StyledNav,
  BurgerButton,
  Drawer,
  StyledLi,
  Overlay,
} from "./nav_styles";
import { AnimatePresence } from "framer-motion";
import cuties_logo from "../../assets/cuties_finder.png";

export const NavSmallUI = memo(
  ({ toggle, set_toggle, handle_logout, handle_toggle, user }) => (
    <>
      <StyledNav>
        <StyledNavLink
          exact={true}
          activeClassName="main_nav_active"
          to="/"
          onClick={() => set_toggle(false)}
        >
          <img
            src={cuties_logo}
            style={{ width: 150 }}
            alt="cuties finder logo"
          />
        </StyledNavLink>
        <div>
          <BurgerButton onClick={handle_toggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </BurgerButton>
        </div>
      </StyledNav>
      <AnimatePresence>
        {toggle && (
          <>
            <Drawer
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeIn" }}
            >
              {user.is_authenticated ? (
                <>
                  <StyledLi>
                    <StyledNavLink
                      exact={true}
                      activeClassName="main_nav_active"
                      to={`/user/profile/${user.user.id}`}
                      onClick={handle_toggle}
                    >
                      {user.user.username}
                    </StyledNavLink>
                  </StyledLi>
                  <StyledLi>
                    <StyledNavLink
                      exact={true}
                      activeClassName="main_nav_active"
                      to="/"
                      onClick={() => {
                        handle_logout();
                        handle_toggle();
                      }}
                    >
                      Logout
                    </StyledNavLink>
                  </StyledLi>
                </>
              ) : (
                <>
                  <StyledLi>
                    <StyledNavLink
                      exact={true}
                      activeClassName="main_nav_active"
                      to="/register"
                      onClick={handle_toggle}
                    >
                      Register
                    </StyledNavLink>
                  </StyledLi>
                  <StyledLi>
                    <StyledNavLink
                      exact={true}
                      activeClassName="main_nav_active"
                      to="/login"
                      onClick={handle_toggle}
                    >
                      Login
                    </StyledNavLink>
                  </StyledLi>
                </>
              )}
            </Drawer>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handle_toggle}
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
);

// =====================
export const NavLargeUI = memo(({ handle_logout, user }) => (
  <StyledNav>
    <StyledNavLink exact={true} activeClassName="main_nav_active" to="/">
      <img src={cuties_logo} style={{ width: 150 }} alt="cuties finder logo" />
    </StyledNavLink>
    <div>
      {user.is_authenticated ? (
        <>
          <StyledNavLink
            exact={true}
            activeClassName="main_nav_active"
            to={`/user/profile/${user.user.id}`}
          >
            {user.user.username}
          </StyledNavLink>
          <StyledNavLink
            exact={true}
            activeClassName="main_nav_active"
            to="/"
            onClick={handle_logout}
          >
            Logout
          </StyledNavLink>
        </>
      ) : (
        <>
          <StyledNavLink
            exact={true}
            activeClassName="main_nav_active"
            to="/register"
          >
            Register
          </StyledNavLink>
          <StyledNavLink
            exact={true}
            activeClassName="main_nav_active"
            to="/login"
          >
            Login
          </StyledNavLink>
        </>
      )}
    </div>
  </StyledNav>
));
