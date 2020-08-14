import React from "react";
import { motion } from "framer-motion";

const alert_style = {
  padding: "0.4em 0.5em",
  margin: "1em 0",
  textAlign: "center",
  borderRadius: 5,
  color: "#fff",
  fontSize: "1.1em",
  cursor: "default",
};

const Alert = ({ msg, success }) => {
  return (
    <motion.div
      style={{
        ...alert_style,
        backgroundColor: success ? "#3cd444" : "#fd3232",
      }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      {msg}
    </motion.div>
  );
};

export default Alert;
