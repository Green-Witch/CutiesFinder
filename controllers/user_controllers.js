const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// =========================
//     Register Handler
// =========================
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const sanitized_name = req.sanitize(username);
    const sanitized_email = req.sanitize(email);
    const country = req.geo_data ? req.geo_data.country : "Not Available";

    // check if email is avaliable
    const is_email_available = await User.findOne({ email: sanitized_email });

    if (is_email_available)
      return res.status(409).json("Email is not available");

    const hashed_password = await bcrypt.hash(password, 10);
    const new_user = new User({
      username: sanitized_name,
      email: sanitized_email,
      password: hashed_password,
      location: country,
    });

    const saved_user = await new_user.save();

    const token = JWT.sign(
      {
        id: saved_user._id,
        location: saved_user.location,
        email: saved_user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(201).json({
      user: {
        id: saved_user._id,
        username: saved_user.username,
        email: saved_user.email,
        location: saved_user.location,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

// =========================
//      Login Handler
// =========================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const sanitized_email = req.sanitize(email);

    // Check if user exists in database
    const user_in_db = await User.findOne({ email: sanitized_email });

    if (!user_in_db) return res.status(400).json("Invalid Email or Password");

    // compare given password with the one stored
    const is_password_vaild = await bcrypt.compare(
      password,
      user_in_db.password
    );

    if (!is_password_vaild) {
      return res.status(400).json("Invalid Email or Password");
    } else {
      //in a block scope in order to be able to destruture using the real names
      const { username, email, location, profiles, _id } = user_in_db;
      const token = await JWT.sign(
        {
          id: user_in_db._id,
          location: user_in_db.location,
          email: user_in_db.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1hr",
        }
      );
      res.status(200).json({
        user: { id: _id, username, email, location },
        token,
      });
    }
  } catch (err) {
    next(err);
  }
};

// =========================
//   Update Handler
// =========================
const update = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const sanitized_name = username ? req.sanitize(username) : null;
    const sanitized_email = email ? req.sanitize(email) : null;

    const update_object = {};
    if (sanitized_name) update_object.username = sanitized_name;
    if (sanitized_email) update_object.email = sanitized_email;

    // before updating the email check if it's available
    if (sanitized_email) {
      const does_email_exist = await User.findOne({
        email: sanitized_email,
      }).select("email");

      if (does_email_exist) return res.status(409).json("Email is unavailable");
    }

    const updated_user = await User.findByIdAndUpdate(
      { _id: req.user_data.id },
      update_object,
      { new: true, useFindAndModify: false }
    );

    res.status(200).json(updated_user);
  } catch (err) {
    next(err);
  }
};

// =========================
//   Verification Handler
// =========================
const verification = async (req, res, next) => {
  try {
    const { id } = req.user_data;
    const user = await User.findOne({ _id: id }).select(
      "-password -__v -register_date"
    );

    if (!user)
      return res.status(401).json("Unauthorized Accesss, Please Login");

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      location: user.location,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  verification,
  update,
};
