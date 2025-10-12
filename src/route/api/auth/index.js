const express = require("express");
const {
  signupController,
  alluserController,
  verifyOtpController,
  loginController,
} = require("../../../controller/authController");
const {
  tokenCheckMiddelware,
  adminCheck
} = require("../../../utils/authMiddelware");
const router = express.Router()

router.post("/signup", signupController)
router.post("/verify-otp", verifyOtpController)
router.post("/login", loginController)
router.get("/userlist",
  tokenCheckMiddelware,
  adminCheck,
  alluserController
)

module.exports = router