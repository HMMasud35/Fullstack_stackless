const express = require("express")
const router = express.Router()
const {
  // tokenCheckMiddelware,
  // adminCheck
} = require("../../../utils/authMiddelware");
const upload = require("../../../utils/uplods");
const {
  subCategoryController
} = require("../../../controller/subCategoryController");

router.post("/addSubcategory",
  // tokenCheckMiddelware,
  // adminCheck,
  upload.single("subcategoryimg"),
  subCategoryController
)
// router.delete("/deleteCategory/:id",
//   //   tokenCheckMiddelware,
//   //   adminCheck,
//   deleteCategoryController
// )
// router.put("/updateCategory/:id",
//   //   tokenCheckMiddelware,
//   //   adminCheck,
//   upload.single("Categoryimg"),
//   updateCategoryController
// )
// router.get("/allCategory",
//   allCategoryController
// )

module.exports = router