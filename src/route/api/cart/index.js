const express = require("express")
const router = express.Router()
const {
  // tokenCheckMiddelware,
  // adminCheck
} = require("../../../utils/authMiddelware");
const upload = require("../../../utils/uplods");
const {
  cartController,
  deleteCartController,
  updateCartController,
  allCartController,
  singleUserCartController
} = require("../../../controller/cartController");

router.post("/addCart",
  // tokenCheckMiddelware,
  // adminCheck,
  upload.single("cartimg"),
  cartController
)
// router.delete("/deleteCart/:id",
//   //   tokenCheckMiddelware,
//   //   adminCheck,
//   deleteCartController
// )
// router.put("/updateCart/:id",
//   //   tokenCheckMiddelware,
//   //   adminCheck,
//   upload.single("Cartimg"),
//   updateCartController
// )
router.get("/allCart",
  // tokenCheckMiddelware,
  // adminCheck,
  allCartController
)
router.get("/singleuserCart/:id",
  // tokenCheckMiddelware,
  // adminCheck,
  singleUserCartController
)

module.exports = router