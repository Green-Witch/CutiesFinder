import React from "react";
import { AnimatePresence } from "framer-motion";
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

const RegisterUI = ({
  handle_submit,
  handle_change,
  msg,
  username,
  empty_username,
  email,
  empty_email,
  password,
  empty_password,
  is_loading,
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
          <StyledFormHeader>Reigster:</StyledFormHeader>

          <AnimatePresence>{msg && <Alert msg={msg} />}</AnimatePresence>

          <StyledLabel>
            Name:
            <StyledInput
              type="text"
              name="username"
              value={username}
              invalid={empty_username}
              onChange={handle_change}
              placeholder="example: John Doe"
            />
          </StyledLabel>

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
              placeholder="password must be at least 5 characters long"
            />
          </StyledLabel>
          <StyledButton type="submit" width="100%">
            Submit
          </StyledButton>

          <p
            style={{
              fontSize: "0.75em",
              fontWeight: "bold",
              marginTop: "1.3em",
              color: "#333",
            }}
          >
            Already have an account?{" "}
            <StyledNavLink to="/Login" style={{ color: "#f39a40" }}>
              Login
            </StyledNavLink>
          </p>
        </StyledForm>
      </FlexContainer>
    </Container>
  );
};

export default RegisterUI;
