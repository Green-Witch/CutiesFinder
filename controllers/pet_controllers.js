const Pet = require("../models/pet");
const fs = require("fs");

// =======================
// Get All Profiles Handler
// =======================
const get_profiles = (req, res, next) => {
  try {
    res.status(200).json(res.paginated_results);
  } catch (err) {
    next(err);
  }
};

// =======================
// Get specific Profile Handler
// =======================
const get_profile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findOne({ _id: id }).select("-__v");

    if (!pet) return res.status(404).json("404 Not found: Invalid ID");

    res.status(200).json(pet);
  } catch (err) {
    console.log("err is: ", err);
    next(err);
  }
};

// =======================
// Get All Profiles for the logged user Handler
// =======================
const get_pets_profiles = async (req, res, next) => {
  try {
    const id = req.params.id;
    const profiles = await Pet.find({ posted_by: id }).select("-__v");
    res.status(200).json(profiles);
  } catch (err) {
    next(err);
  }
};

// =======================
// Delete specific Profile Handler
// =======================
const delete_profile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted_profile = await Pet.findOneAndRemove(
      { _id: id },
      {
        useFindAndModify: false,
      }
    );
    if (!deleted_profile)
      return res.status(404).json("404 Not Found: Invalid ID");

    fs.unlink(deleted_profile.image, (err) => {
      if (err) {
        console.log("failed to delete image");
      }
    });
    res.status(200).json(1);
  } catch (err) {
    next(err);
  }
};

// =======================
// Create Profile Handler
// =======================
const create_profile = async (req, res, next) => {
  try {
    const { name, age, breed, medical_condition, description } = req.body;
    if (!name || !age || !breed || !medical_condition || !description)
      return res.status(400).json("All Fields Are Required");

    if (!req.file) return res.status(400).json("Image is required");

    const sanitized_name = req.sanitize(name);
    const sanitized_age = req.sanitize(age);
    const sanitized_breed = req.sanitize(breed);
    const sanitized_medical_condition = req.sanitize(medical_condition);
    const sanitized_description = req.sanitize(description);

    const new_profile = new Pet({
      name: sanitized_name,
      age: sanitized_age,
      breed: sanitized_breed,
      medical_condition: sanitized_medical_condition,
      description: sanitized_description,
      location: req.user_data.location,
      posted_by: req.user_data.id,
      user_email: req.user_data.email,
      image: `public/uploads/${req.file.filename}`,
    });

    const saved_profile = await new_profile.save();

    res.status(201).json(saved_profile);
  } catch (err) {
    next(err);
  }
};

// =======================
// Update Profile Handler
// =======================
const update_profile = async (req, res, next) => {
  try {
    const profile_exist = await Pet.findById(req.params.id);
    if (!profile_exist) return res.status(404).json("Profile Does not Exist");

    const update_object = {};

    for (const property in req.body) {
      if (!req.body[property])
        return res.status(400).json(`${property} has an invalid value`);

      update_object[property] = req.sanitize(req.body[property]);
    }

    // check if there is a new photo:
    if (req.file) {
      update_object.image = `public/uploads/${req.file.filename}`;
      // delete old image:
      fs.unlink(profile_exist.image, (err) =>
        console.log("Failed to delete file")
      );
    }
    const updated_profile = await Pet.findOneAndUpdate(
      req.params.id,
      update_object,
      { new: true, useFindAndModify: false }
    );
    res.status(200).json(updated_profile);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get_profiles,
  get_profile,
  get_pets_profiles,
  delete_profile,
  create_profile,
  update_profile,
};
