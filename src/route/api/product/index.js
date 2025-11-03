const express = require("express")
const router = express.Router()
const upload = require("../../../utils/uplods");
const {
  // tokenCheckMiddelware, 
  // adminCheck
} = require("../../../utils/authMiddelware");
const {
  productController,
  deleteProductController,
  updateProductController,
  allProductController
} = require("../../../controller/productsController");

router.post("/addproduct",
  // tokenCheckMiddelware,
  // adminCheck,
  upload.array("productimg", 2),
  productController
)
router.delete("/deleteproduct/:id",
  //   tokenCheckMiddelware,
  //   adminCheck,
  deleteProductController
)
router.put("/updateproduct/:id",
  //   tokenCheckMiddelware,
  //   adminCheck,
  upload.array("productimg"),
  updateProductController
)
router.get("/allproduct",
  //   tokenCheckMiddelware,
  //   adminCheck,
  allProductController
)

module.exports = router