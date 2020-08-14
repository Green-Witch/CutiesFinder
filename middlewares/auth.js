const JWT = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers["auth-token"];

    if (!token)
      return res.status(401).json("Unauthorized Access, Please Login");

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user_data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
