import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";

const orange = "#F39A40";
const white = "#FFFFFF";
const secondary_white = "#fbfbf6";
const dark = "#222423";
const secondary_dark = "#3F3B32";
const red = "#ff7b84";
const green = "#4caf50";

// ========================
// Container_Variants:
// ========================
export const container_variants = {
  initial: { opacity: 0, x: "-50vw" },
  animate: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeInOut", stiffness: 110 },
  },
  exit: {
    x: "50vw",
    opacity: 0,
    transition: { ease: "easeInOut", stiffness: 110 },
  },
};

// =====================
//      Container
// =====================
export const Container = styled(motion.div)`
  width: 100%;
  min-height: 90vh;
  padding: 1em;
  background-color: ${white};
`;
// Flex Container
export const FlexContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justify }) => (justify ? justify : "start")};
  align-items: ${({ align }) => (align ? align : "flex-start")};
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
`;

// =====================
//        Form
// =====================
export const StyledForm = styled.form`
  position: relative;
  min-width: 320px;
  max-width: 90%;
  width: 50%;
  background-color: ${secondary_white};
  color: ${secondary_dark};
  border-radius: 5px;
  padding: 1.5em;
  box-shadow: -3px 0px 6px 3px #efeeed, 4px 5px 6px 3px #efeeed;
`;

// ====================
//     Form Header
// ====================
export const StyledFormHeader = styled.p`
  margin-bottom: 1.5em;
  padding: 0.5em 0;
  border-bottom: 1px solid ${orange};
  font-size: 1.5em;
  font-weight: bold;
  color: ${orange};
`;

// ================
//     Label
// ================
export const StyledLabel = styled.label`
  width: 100%;
  margin-bottom: 0.5em;
  text-transform: capitalize;
`;

// ================
//      Input
// ================
export const StyledInput = styled.input`
  display: block;
  width: 100%;
  background-color: ${({ background }) =>
    background === "secondary" ? secondary_white : white};
  border: ${({ border }) =>
    border ? `1px solid ${secondary_dark}` : `1px solid transparent`};
  padding: 3px;
  margin: 0.5em 0;
  border-radius: 5px;
  outline-color: ${orange};
  box-shadow: ${({ invalid }) => (invalid ? "0 0 8px 0px #f30200a1" : null)};

  &:hover,
  :focus,
  :active {
    background-color: ${secondary_white} important;
  }
`;

// =================
//     Button
// =================
export const StyledButton = styled(motion.button)`
  width: ${({ width }) => (width ? width : "auto")};
  border: none;
  padding: 0.2em 1em;
  border-radius: 5px;
  background-color: ${({ background }) => (background ? background : orange)};
  color: #fff;
  margin: 0.3em 0;
  outline-color: ${orange};
  box-shadow: 3px 3px 4px 1px #efeeed;
`;

// ========================
//     Styled NavLink
// ========================
export const StyledNavLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  color: ${({ color }) =>
    color === "primary" ? secondary_dark : secondary_white};
  padding: 0.5em 0.8em;
  transition: 0.1s ease-in;
  font-size: 1em;
  &:hover {
    text-decoration: none;
    color: ${dark};
  }

  &.active {
    color: ${orange};
  }
`;

// ======================
//        Alert
// ======================
export const Alert = styled.div`
  padding: 0.4em 0.5em;
  margin: 1em 0;
  text-align: center;
  background-color: ${({ success }) => (success ? green : red)};
  border-radius: 5px;
  color: ${white};
  font-size: 1.1em;
  cursor: default;
`;

// =====================
//    Profile Card
// =====================
export const StyledProfileCard = styled(motion.div)`
  width: ${({ width }) => (width === "fixed" ? "300px" : "1 1 100%")};
  background-color: ${secondary_white};
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 5px;
  box-shadow: 5px 5px 8px 3px #efefef82, -6px -2px 8px 3px #efefef82;
  display: ${({ flex }) => (flex ? "flex" : "block")};
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1.5em;
`;

// =================
// profile List Item
// =================
export const CardLi = styled.li`
  padding-bottom: 0.4em;
  border-bottom: 2px solid ${white};
  font-size: 0.9em;
`;

// ==================
// Pet Profile Portrait
// ==================
export const Portrait = styled.div`
  background-size: cover;
  background-position: center;
  flex: 1 1 30%;
  min-width: 150px;
  min-height: 200px;
  border-radius: 5px;
  margin-bottom: 0.5em;
  margin-right: 7px;
`;

// ==================
// Pet Profile Link Portrait
// ==================
export const LinkPortrait = styled(Link).attrs(({ to }) => ({
  to: to,
}))`
  display: inline-block;
  background-size: cover;
  background-position: center;
  flex: 1 1 30%;
  min-width: 150px;
  min-height: 200px;
  border-radius: 5px;
  margin-bottom: 0.5em;
  margin-right: 7px;
`;

// ===================
// Delete Button
// ===================
export const DeleteButton = styled.button`
  border: none;
  padding: 0 0.4em 0.2em 0.4em;
  display: inline-block;
  border-radius: 5px;
  background-color: #fb3737;
  color: ${white};
  font-weight: bold;
  font-size: 1.2em;
`;
