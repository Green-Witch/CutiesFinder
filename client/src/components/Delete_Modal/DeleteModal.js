import React from "react";
import styled from "styled-components";
import { StyledButton } from "../shared_styles";
import { motion, AnimatePresence } from "framer-motion";

const Popup = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999999;
  background-color: #98989838;
  justify-content: center;
  align-items: center;
`;

const DeleteModal = ({ modal, close_modal, handle_delete, id }) => {
  const delete_profile = (id) => handle_delete(id);
  return (
    <AnimatePresence>
      {modal && (
        <Popup
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            style={{
              padding: "3em",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            <p style={{ marginBottom: "1.5em" }}>
              Are you sure you want to delete this profile?
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <StyledButton onClick={() => close_modal(false)}>
                Cancel
              </StyledButton>
              <StyledButton
                background="#fb3737"
                onClick={delete_profile.bind(this, id)}
              >
                Yes
              </StyledButton>
            </div>
          </div>
        </Popup>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
