import styled from "styled-components";

const colors = {
  orange: "#F39A40",
  white: "#FFFFFF",
  secondary_white: "#fbfbf6",
  dark: "#222423",
  secondary_dark: "#3F3B32",
};

export const BreadCrumbsNav = styled.nav`
  padding: 0.5em 0;
  background-color: ${colors.secondary_white};
  font-size: 0.9em;
`;

export const ProfileHeader = styled.p`
  font-size: 1.5em;
  color: ${colors.dark};
  margin: 0.6em 0 1.4em 0;
  text-transform: capitalize;
`;

export const Preview = styled.div`
  min-width: 240px;
  max-width: 90%;
  height: 470px;
  text-align: center;
  background-color: #fbfbf6;
  border: 0.3px dashed #33333342;
  background-size: cover;
  background-position: ${({ position }) => (position ? position : "center")};
  border-radius: 5px;
  margin: 0 10px;
`;

export const LightMark = styled.span`
  font-size: 2em;
  display: inline-block;
  color: #ded8d899;
  line-height: 13.5em;
`;
