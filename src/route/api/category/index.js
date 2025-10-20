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
} = require("../../../controller/cotegoryController");

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
router.patch("/updateCategory/:id",
//   tokenCheckMiddelware,
//   adminCheck,
  upload.single("Categoryimg"),
  updateCategoryController
)
router.get("/allCategory",
  allCategoryController
)

module.exports = router