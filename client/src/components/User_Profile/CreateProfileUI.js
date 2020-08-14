import React from "react";

// Styled Components
import { ProfileHeader, Preview, LightMark } from "./profile_styles";
import { StyledLabel, StyledInput, StyledButton } from "../shared_styles";
import Alert from "../Alert/Alert";

const CreateProfileUI = ({
  name,
  breed,
  age,
  description,
  medical_condition,
  handle_change,
  handle_image_upload,
  handle_submit,
  preview,
  msg,
  alert_type,
}) => {
  return (
    <div style={{ padding: "1em 2em" }}>
      <ProfileHeader>Create New Profile:</ProfileHeader>
      {msg && <Alert success={alert_type} msg={msg} />}
      <div>
        <form
          onSubmit={handle_submit}
          style={{ display: "flex", flexWrap: "wrap" }}
          encType="multipart/form-data"
        >
          <div style={{ flex: "1 1 60%" }}>
            <StyledLabel>
              Name:
              <StyledInput
                value={name}
                onChange={handle_change}
                type="text"
                name="name"
                border={true}
                maxLength="50"
              />
            </StyledLabel>

            <StyledLabel>
              age:
              <StyledInput
                value={age}
                onChange={handle_change}
                type="text"
                name="age"
                border={true}
                maxLength="50"
              />
            </StyledLabel>

            <StyledLabel>
              Breed:
              <StyledInput
                value={breed}
                onChange={handle_change}
                type="text"
                name="breed"
                border={true}
                maxLength="50"
              />
            </StyledLabel>

            <StyledLabel>
              medical condition:
              <StyledInput
                value={medical_condition}
                onChange={handle_change}
                type="text"
                name="medical_condition"
                border={true}
                maxLength="50"
              />
            </StyledLabel>

            <StyledLabel>
              description:
              <StyledInput
                value={description}
                onChange={handle_change}
                type="text"
                name="description"
                border={true}
                maxLength="50"
              />
            </StyledLabel>

            <label
              htmlFor="image"
              style={{
                width: "100%",
                padding: "0.7em",
                backgroundColor: "#f39a40",
                color: "#fff",
                textAlign: " center",
                borderRadius: " 5px",
                margin: "1em 0",
              }}
            >
              Choose Image
              <input
                type="file"
                name="image"
                id="image"
                onChange={handle_image_upload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <Preview
            style={{
              flex: "1 1 35%",
              backgroundImage: `url(${preview})`,
              textAlign: "center",
            }}
          >
            {preview ? null : <LightMark>Preview</LightMark>}
          </Preview>

          <StyledButton type="submit" width="100%">
            Create
          </StyledButton>
        </form>
      </div>
    </div>
  );
};

export default CreateProfileUI;
