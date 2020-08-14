import React, { memo } from "react";
import { AnimatePresence } from "framer-motion";
// Styled Components
import {
  FlexContainer,
  StyledForm,
  StyledFormHeader,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledNavLink,
  Container,
  container_variants,
} from "../shared_styles";
import Alert from "../Alert/Alert";
import Loader from "../Loader/Loader";

const LoginUI = memo(
  ({
    email,
    empty_email,
    password,
    empty_password,
    handle_change,
    handle_submit,
    is_loading,
    msg,
  }) => {
    return (
      <Container
        style={{ overflow: "hidden" }}
        variants={container_variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <FlexContainer
          justify="center"
          align="center"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: "100" }}
        >
          <StyledForm onSubmit={handle_submit}>
            {is_loading && <Loader />}

            {/* The Form */}
            <StyledFormHeader>Login:</StyledFormHeader>

            <AnimatePresence>
              {msg && <Alert msg={msg} success={false} />}
            </AnimatePresence>

            <StyledLabel>
              email:
              <StyledInput
                type="email"
                name="email"
                value={email}
                invalid={empty_email}
                onChange={handle_change}
                placeholder="example: johnDoe@gmail.com"
              />
            </StyledLabel>
            <StyledLabel>
              password:
              <StyledInput
                type="password"
                name="password"
                value={password}
                invalid={empty_password}
                onChange={handle_change}
              />
            </StyledLabel>
            <StyledButton type="submit" width="100%">
              Login
            </StyledButton>

            <p
              style={{
                fontSize: "0.75em",
                fontWeight: "bold",
                marginTop: "1.3em",
                color: "#333",
              }}
            >
              Don't have an account?{" "}
              <StyledNavLink to="/register" style={{ color: "#f39a40" }}>
                Register
              </StyledNavLink>
            </p>
          </StyledForm>
        </FlexContainer>
      </Container>
    );
  }
);

export default LoginUI;
