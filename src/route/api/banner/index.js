const express = require("express");
const multer = require('multer')
const {
  bannerController,
  deleteBannerController
} = require("../../../controller/bannerController");
const router = express.Router()
const path = require("path");
const { tokenCheckMiddelware, adminCheck } = require("../../../utils/authMiddelware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const rendomtext = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let fileextanstion = file.originalname.split(".")
    let extanstion = fileextanstion[fileextanstion.length - 1]
    cb(null, file.fieldname + '-' + rendomtext + "." + extanstion)
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|PNG|gif|mp4|wmv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only! (jpeg, jpg, png, PNG, gif, mp4, wmv)');
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 2097152 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}) //2MB

router.post("/addbanner", upload.single("bannerimg"), tokenCheckMiddelware, adminCheck, bannerController)
router.delete("/deletebanner/:id", tokenCheckMiddelware, adminCheck, deleteBannerController)

module.exports = router