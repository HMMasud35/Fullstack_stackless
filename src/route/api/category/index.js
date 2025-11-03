const express = require("express")
const router = express.Router()
const {
  // tokenCheckMiddelware,
  // adminCheck
} = require("../../../utils/authMiddelware");
const upload = require("../../../utils/uplods");
const {
  categoryController,
  deleteCategoryController,
  updateCategoryController,
  allCategoryController
} = require("../../../controller/categoryController");

router.post("/addCategory",
  // tokenCheckMiddelware,
  // adminCheck,
  upload.single("categoryimg"),
  categoryController
)
router.delete("/deleteCategory/:id",
  //   tokenCheckMiddelware,
  //   adminCheck,
  deleteCategoryController
)
router.put("/updateCategory/:id",
  //   tokenCheckMiddelware,
  //   adminCheck,
  upload.single("Categoryimg"),
  updateCategoryController
)
router.get("/allCategory",
  // tokenCheckMiddelware,
  // adminCheck,
  allCategoryController
)

module.exports = router