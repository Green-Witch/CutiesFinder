const express = require("express");
const router = express.Router();

// =============================
//         User Routes
// =============================
router.use("/user", require("./user"));
router.use("/pet", require("./pet"));

module.exports = router;
