const express = require("express");
const {
  signupController,
  alluserController,
  verifyOtpController,
  loginController,
  logoutController,
} = require("../../../controller/authController");
const {
  // tokenCheckMiddelware,
  // adminCheck
} = require("../../../utils/authMiddelware");
const router = express.Router()

router.post("/signup", signupController)
router.post("/verify-otp", verifyOtpController)
router.post("/login", loginController)
router.get("/userlist",
  // tokenCheckMiddelware,
  // adminCheck,
  alluserController
)
router.post("/logout", logoutController)

module.exports = router