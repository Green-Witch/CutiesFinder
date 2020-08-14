const mongoose = require("mongoose");

const pet_schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: String,
    trim: true,
    required: true,
  },
  breed: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  medical_condition: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  post_date: {
    type: Date,
    default: Date.now(),
  },
  posted_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  user_email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pet", pet_schema);
