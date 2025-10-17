const express = require("express");
const multer  = require('multer')
const { bannerController } = require("../../../controller/bannerController");

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const rendomtext = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let fileextanstion = file.originalname.split(".")
    let extanstion = fileextanstion[fileextanstion.length-1]
    cb(null, file.fieldname + '-' + rendomtext + "." + extanstion)
  }
})

const upload = multer({ storage: storage })

router.post("/addbanner", upload.single("bannerimg"), bannerController)

module.exports = router