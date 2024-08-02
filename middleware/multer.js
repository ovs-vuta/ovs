const multer = require("multer");
const path = require("path");
let counter = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file) {
        cb(null, path.join(__dirname, "../public/uploads"));
    }
  },
  filename: function (req, file, cb) {
    const pos = file.originalname.lastIndexOf(".csv");
    const tempFilename = file.originalname;
    const orgFieldname = tempFilename.split(tempFilename[pos]).at(0);
    cb(
      null,
      `${orgFieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
