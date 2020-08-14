import React, { memo } from "react";
import styled from "styled-components";
import { StyledNavLink, container_variants } from "../shared_styles";
import { BreadCrumbsNav } from "../User_Profile/profile_styles";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 100%;
  height: 92vh;
  padding: 0 1em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const ImageContainer = styled.div`
  margin-bottom: 0.5em;
  flex: 1 1 40%;
  min-height: 280px;
  max-height: 480px;
  max-width: 500px;
  min-width: 300px;
  overflow: hidden;
  text-align: center;
`;
const Image = styled.img.attrs(({ src }) => ({
  src: src,
}))`
  max-width: 100%;
  border-radius: 5px;
`;

const List = styled.ul`
  flex: 1 1 25%;
  list-style: none;
  margin: 0 1em;
`;

const Li = styled.li`
  background-color: #f5f5f5;
  padding: 5px;
  color: #3a3938;
  margin-bottom: 2px;
`;

const PetProfileUI = ({ profile, is_authenticated }) => {
  const {
    name,
    age,
    breed,
    description,
    medical_condition,
    user_email,
    post_date,
    location,
    image,
  } = profile;

  return (
    <motion.div
      variants={container_variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <BreadCrumbsNav>
        <StyledNavLink to="/" color="primary">
          Back
        </StyledNavLink>
      </BreadCrumbsNav>

      <Container>
        <ImageContainer>
          <Image src={image.slice(image.indexOf("/"))} />
        </ImageContainer>

        <List>
          <Li>
            <strong>Name</strong>: {name}
          </Li>
          <Li>
            <strong>Breed</strong>: {breed}
          </Li>
          <Li>
            <strong>age</strong>: {age}
          </Li>
          <Li>
            <strong>Location</strong>: {location}
          </Li>
          <Li>
            <strong>Description</strong>: {description}
          </Li>
          <Li>
            <strong>Medical Condition</strong>: {medical_condition}
          </Li>
          <Li>
            <strong>User Email</strong>:{" "}
            {is_authenticated ? user_email : "Please, login to view"}
          </Li>
          <Li>
            <strong>Post Date</strong>:{" "}
            {post_date.slice(0, post_date.indexOf("T"))}
          </Li>
        </List>
      </Container>
    </motion.div>
  );
};

export default memo(PetProfileUI);
