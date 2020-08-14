import styled from "styled-components";
import { motion } from "framer-motion";

const orange = "#F39A40";
const white = "#FFFFFF";
const secondary_white = "#fbfbf6";
const dark = "#222423";
const secondary_dark = "#3F3B32";

// ========================
//       Styled Navbar
// ========================
export const StyledNav = styled.nav`
  width: 100%;
  background-color: ${orange};
  color: #fbfaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
  border-bottom: 1px solid ${secondary_white};
`;

// ========================
//       Nav Burger
// ========================
export const BurgerButton = styled.button`
  width: 40px;
  padding: 2px;
  margin: 5px;
  background-color: ${white};
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.2s ease;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .bar {
    width: 35px;
    padding: 2px;
    margin: 2px 0;
    display: inline-block;
    background-color: ${orange};
  }
`;

// ========================
//         Drawer
// ========================
export const Drawer = styled(motion.ul)`
  width: 100%;
  background-color: ${orange};
  position: absolute;
  z-index: 100;
  transition: 0.3s ease-in;
`;

// ========================
//        Overlay
// ========================
export const Overlay = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  background-color: #e0d9d959;
`;

// ========================
//          Li
// ========================
export const StyledLi = styled.li`
  padding: 5px 0;
  border-bottom: 1px solid ${secondary_white};
`;
