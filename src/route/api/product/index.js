const express = require("express")
const router = express.Router()
const upload = require("../../../utils/uplods");
const {
  // tokenCheckMiddelware, 
  // adminCheck
} = require("../../../utils/authMiddelware");
const {
  productController
} = require("../../../controller/productsController");

router.post("/addproduct",
  // tokenCheckMiddelware,
  // adminCheck,
  upload.single("productimg"),
  productController
)

module.exports = router