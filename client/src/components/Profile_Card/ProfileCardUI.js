import React, { memo } from "react";
import DeleteModal from "../Delete_Modal/DeleteModal";
import {
  StyledProfileCard,
  CardLi,
  Portrait,
  LinkPortrait,
  DeleteButton,
} from "../shared_styles";

const ProfileCardUI = ({
  profile,
  is_authenticated,
  can_delete,
  use_link,
  home_view,
  handle_delete,
  handle_click,
  is_open,
  set_is_open,
}) => {
  const {
    age,
    breed,
    description,
    image,
    location,
    medical_condition,
    name,
    post_date,
    _id,
    user_email,
  } = profile;

  const delete_button = (
    <div
      style={{
        flex: "1 1 100%",
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "10px",
      }}
    >
      <DeleteButton onClick={() => set_is_open(true)}>&times;</DeleteButton>
    </div>
  );

  return (
    <StyledProfileCard
      flex={true}
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ stiffness: 110 }}
    >
      {is_open && (
        <DeleteModal
          modal={is_open}
          close_modal={set_is_open}
          handle_delete={handle_delete}
          id={_id}
        />
      )}

      {is_authenticated && can_delete ? delete_button : null}

      {!use_link && (
        <Portrait
          style={{
            backgroundImage: `url(${image.slice(image.indexOf("/"))})`,
          }}
        />
      )}

      {use_link && (
        <LinkPortrait
          style={{ backgroundImage: `url(${image.slice(image.indexOf("/"))})` }}
          to={`/profile/${_id}`}
          onClick={handle_click}
        />
      )}

      <ul style={{ listStyle: "none", flex: "1 1 65%" }}>
        <CardLi>Name: {name}</CardLi>
        <CardLi>breed: {breed}</CardLi>
        <CardLi>age: {age}</CardLi>
        {!home_view && (
          <>
            <CardLi>medical_condition: {medical_condition}</CardLi>
            <CardLi>description: {description}</CardLi>
            <CardLi>location: {location}</CardLi>
            <CardLi>
              Posted By: {is_authenticated ? user_email : "Login To View"}
            </CardLi>
          </>
        )}
        <CardLi>posted: {post_date.slice(0, post_date.indexOf("T"))}</CardLi>
      </ul>
    </StyledProfileCard>
  );
};

export default memo(ProfileCardUI);
