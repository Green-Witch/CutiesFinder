import React from "react";
import { ProfileHeader } from "./profile_styles";
import ProfileCard from "../Profile_Card/ProfileCard";

const UserPageUI = ({ width, profiles, is_authenticated, is_loading }) => {
  return (
    <div
      style={{
        padding: width === "sm" ? "0.5em" : "1em 2em",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          padding: "0.5em",
          flex: width === "sm" ? "1 1 100%" : "1 1 70%",
        }}
      >
        <ProfileHeader>Created Profiles:</ProfileHeader>
        {profiles.length > 0 &&
          !is_loading &&
          profiles.map((profile) => (
            <ProfileCard
              is_authenticated={is_authenticated}
              key={profile._id}
              profile={profile}
              can_delete={true}
            />
          ))}

        {is_loading && <p>Loading...</p>}
        {!is_loading && profiles.length === 0 && <p>No Profiles</p>}
      </div>
    </div>
  );
};

export default UserPageUI;
