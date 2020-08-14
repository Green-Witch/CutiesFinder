import React, { useState, useEffect } from "react";

// Components
import CreateProfileUI from "./CreateProfileUI";

// Redux
import { connect } from "react-redux";
import { create_profile_ac } from "../../redux/actions/profile_action_creators";

const CreateProfile = ({ create_profile, error }) => {
  const [name, set_name] = useState("");
  const [age, set_age] = useState("");
  const [breed, set_breed] = useState("");
  const [medical_condition, set_medical_condition] = useState("");
  const [description, set_description] = useState("");
  const [image, set_image] = useState(null);
  const [preview, set_preview] = useState(null);
  const [msg, set_msg] = useState(null);
  const [alert_type, set_alert_type] = useState(null);

  const handle_change = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "name":
        set_name(value);
        break;
      case "age":
        set_age(value);
        break;
      case "breed":
        set_breed(value);
        break;
      case "medical_condition":
        set_medical_condition(value);
        break;
      case "description":
        set_description(value);
        break;
      default:
        return null;
    }
  };

  const handle_image_upload = ({ target }) => {
    const selected_image = target.files[0];

    if (!/\.(jpe?g|png)$/i.test(selected_image.name)) {
      set_preview(null);
      set_image(null);
      console.log("cleared image");
      return set_msg("Invalid Image Format");
    } else {
      const preview_url = URL.createObjectURL(selected_image);
      set_preview(preview_url);
      if (selected_image.size > 1024 * 1024 * 2) {
        set_alert_type(false);
        set_msg("Image Must Be Smaller Than 2mb");
      } else {
        set_image(selected_image);
      }
    }
  };

  const handle_submit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !age ||
      !breed ||
      !medical_condition ||
      !description ||
      !image
    ) {
      set_msg("All Fields Are Required");
      set_alert_type(false);
    } else {
      create_profile({
        name,
        age,
        breed,
        medical_condition,
        description,
        image,
      });

      if (msg === "invalid image type") return;

      set_name("");
      set_age("");
      set_breed("");
      set_medical_condition("");
      set_description("");
      set_preview(null);
      set_image(null);
      set_alert_type(true);
      set_msg("Profile Created Successfully");
    }
  };

  useEffect(() => {
    if (error.msg) {
      set_msg(error.msg);
    }
  }, [error]);

  // Store the id of the settimeout that will clear the message, so it can be removed later
  let clear_msg_id;

  const clear_msg = () => {
    clear_msg_id = setTimeout(() => {
      set_msg(null);
    }, 3000);
  };

  //Remove Alert
  useEffect(() => {
    if (msg) clear_msg();

    return () => clearTimeout(clear_msg_id);
  }, [msg]);

  return (
    <CreateProfileUI
      name={name}
      breed={breed}
      age={age}
      description={description}
      medical_condition={medical_condition}
      handle_change={handle_change}
      handle_image_upload={handle_image_upload}
      handle_submit={handle_submit}
      preview={preview}
      msg={msg}
      alert_type={alert_type}
    />
  );
};

const MDTP = (dispatch) => ({
  create_profile: (data) => dispatch(create_profile_ac(data)),
});

const MSTP = (state) => ({
  error: state.error,
});

export default connect(MSTP, MDTP)(CreateProfile);
