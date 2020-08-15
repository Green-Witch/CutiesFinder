require("dotenv").config();
const { ValidationError } = require("express-validation");
const cors = require("cors");
const path = require("path");
const sanitize = require("express-sanitizer");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const PORT = process.env.PORT || 4000;
const geo_locate = require("./middlewares/geoLocate");
// ==============================
//      Setup middlewares
// ==============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitize());
app.use(geo_locate);

// ==============================
//          Routes
// ==============================
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", require("./routes/api/root"));

// =======================
//    Production mode
// =======================
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  );
}

// ==============================
//        Error-handler
// ==============================
app.use((err, req, res, next) => {
  if (err instanceof ValidationError)
    return res.status(err.statusCode).json(err.details);

  return res.status(500).json(err);
});
// ==============================
//  Setup server and connection
// ==============================
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});
db.once("open", () => console.log("Connection Established"));
db.on("error", (err) => console.log(err.message));
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
