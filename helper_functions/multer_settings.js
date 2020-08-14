const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const image_name = file.originalname.slice(
      0,
      file.originalname.indexOf(".")
    );
    const name_without_spaces = image_name.replace(" ", "-");
    const unique_suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${name_without_spaces}-${unique_suffix}${extension}`);
  },
});

const file_filter = (req, file, cb) => {
  const extension_check = /jpg|jpeg|png/i.test(path.extname(file.originalname));
  const mimeType_check = /jpg|jpeg|png/i.test(file.mimetype);

  if (extension_check && mimeType_check) {
    cb(null, true);
  } else {
    cb("Only JPG and PNG formats are allowed", false);
  }
};

module.exports = {
  storage,
  file_filter,
};
