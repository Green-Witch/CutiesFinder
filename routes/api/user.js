const express = require("express");
const router = express.Router();
const {
  register,
  login,
  update,
  verification,
} = require("../../controllers/user_controllers");
const auth = require("../../middlewares/auth");
const geo_locate = require("../../middlewares/geoLocate");

// ========================
// @Path: api/user
// @Access: Public
// @Desc: Register New User
// ========================
router.post("/", geo_locate, register);

// ========================
// @Path: api/user/login
// @Access: Public
// @Desc: Login User
// ========================
router.post("/login", login);

// ========================
// @Path: api/user/:id
// @Access: Privet
// @Desc: Edit User Profile
// ========================
router.patch("/:id", auth, update);

// ========================
// @Path: api/user/auth
// @Access: Privet
// @Desc: Autherize User
// ========================
router.get("/auth", auth, verification);

module.exports = router;
