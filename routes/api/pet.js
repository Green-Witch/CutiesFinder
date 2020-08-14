const express = require("express");
const router = express.Router();
const Pet = require("../../models/pet");
// ===================
//    Middlewares
// ===================
const pagination = require("../../middlewares/pagination");
const auth = require("../../middlewares/auth");
// ====================
//     Controllers
// ====================
const {
  get_profiles,
  get_profile,
  get_pets_profiles,
  delete_profile,
  create_profile,
  update_profile,
} = require("../../controllers/pet_controllers");

// =============================
// Multer Setup
// =============================
const {
  file_filter,
  storage,
} = require("../../helper_functions/multer_settings");
const multer = require("multer");
const upload = multer({
  storage,
  fileFilter: file_filter,
  limits: 1024 * 1024 * 2,
}).single("image");

// =============================
// @Path /api/pet
// @Access Public
// @Desc Returns Pet Profiles
// @Route Is Paginated: Query Params: Limit & Page
// =============================
router.get("/", pagination(Pet), get_profiles);

// =============================
// @Path /api/pet/id
// @Access Public
// @Desc Returns a Specific Profile
// =============================
router.get("/:id", get_profile);

// =============================
// @Path /api/pet/profiles/user/:id
// @Access Privet
// @Desc Returns All Profiles Posted By The Logged User
// =============================
router.get("/profiles/user/:id", auth, get_pets_profiles);

// =============================
// @Path /api/pet
// @Access Privet
// @Desc Post New Profile
// =============================
router.post("/", auth, upload, create_profile);

// =============================
// @Path /api/pet/:id
// @Access Privet
// @Desc Delete a Profile
// =============================
router.delete("/:id", auth, delete_profile);

// =============================
// @Path /api/pet/:id
// @Access Privet
// @Desc Update a Profile
// =============================
router.patch("/:id", auth, upload, update_profile);

module.exports = router;
