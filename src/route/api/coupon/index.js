const express = require("express")
const router = express.Router()
const {
  couponController,
  applyCouponController,
  incrementController
} = require("../../../controller/couponController")

router.post("/addcoupon", couponController)
router.post("/applycoupon", applyCouponController)
router.post("/incrementcoupon", incrementController)

module.exports = router