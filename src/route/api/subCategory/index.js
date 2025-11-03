const express = require("express")
const router = express.Router()
const {
  // tokenCheckMiddelware,
  // adminCheck
} = require("../../../utils/authMiddelware");
const upload = require("../../../utils/uplods");
const {
  subCategoryController,
  deleteSubCategoryController,
  updateSubCategoryController,
  allSubCategoryController,
} = require("../../../controller/subCategoryController");

router.post("/addSubcategory",
  // tokenCheckMiddelware,
  // adminCheck,
  subCategoryController
)
router.delete("/deleteSubCategory/:id",
  //   tokenCheckMiddelware,
  //   adminCheck,
  deleteSubCategoryController
)
router.patch("/updateSubCategory/:id",
  //   tokenCheckMiddelware,
  //   adminCheck,
  updateSubCategoryController
)
router.get("/allSubCategory",
  // tokenCheckMiddelware,
  // adminCheck,
  allSubCategoryController
)

module.exports = router