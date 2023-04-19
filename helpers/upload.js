
const path = require("path");
const multer = require("multer");
const tempDestination = path.join(__dirname, "../temp");

const multerConfig = multer.diskStorage({
  destination: tempDestination,  
  filename: function (req, file, cb) {
    cb(null,Date.now()+ "-"+ file.originalname   );
  }}
);

const upload = multer({ storage: multerConfig });

module.exports = upload;
