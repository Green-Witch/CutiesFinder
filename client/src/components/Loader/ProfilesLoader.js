import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const animation_variants = {
  initial: {
    opacity: 0,
    transition: {
      yoyo: Infinity,
      ease: "easeIn",
      duration: 0.6,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      yoyo: Infinity,
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const container_variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Ball = styled(motion.span)`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 5px;
  border-radius: 50%;
  background-color: ${({ bg_color }) =>
    bg_color === "main" ? "orange" : "#ea6262"};
`;

const LoaderContainer = styled(motion.div)`
  width: 100%;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilesLoader = () => (
  <LoaderContainer
    variants={container_variants}
    initial="initial"
    animate="animate"
  >
    <Ball variants={animation_variants} />
    <Ball bg_color="main" variants={animation_variants} />
    <Ball variants={animation_variants} />
  </LoaderContainer>
);

export default ProfilesLoader;
