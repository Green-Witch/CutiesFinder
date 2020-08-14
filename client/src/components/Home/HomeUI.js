import React, { memo } from "react";
import ProfileCard from "../Profile_Card/ProfileCard";
import { FlexContainer } from "../shared_styles";
import ProfilesLoader from "../Loader/ProfilesLoader";

const HomeUI = ({
  loaded_profiles,
  is_authenticated,
  last_element_ref,
  is_loading,
}) => {
  return (
    <FlexContainer
      style={{
        width: "96%",
        margin: "1em auto",
        padding: 0,
      }}
      justify="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loaded_profiles.length > 0 &&
        loaded_profiles.map((profile, index) => {
          if (loaded_profiles.length === index + 1) {
            return (
              <div ref={last_element_ref} key={profile._id}>
                <ProfileCard
                  profile={profile}
                  is_authenticated={is_authenticated}
                  use_link={true}
                  home_view={true}
                  width="fixed"
                />
              </div>
            );
          }
          return (
            <ProfileCard
              key={profile._id}
              profile={profile}
              is_authenticated={is_authenticated}
              use_link={true}
              home_view={true}
              width="fixed"
            />
          );
        })}

      {loaded_profiles.length === 0 && !is_loading && (
        <p>No Profiles To Show</p>
      )}

      {is_loading && <ProfilesLoader />}
    </FlexContainer>
  );
};

export default memo(HomeUI);
