const express = require("express")
const router = express.Router()
const auth = require("./auth")
const banner = require("./banner")
const category = require("./category")
const subCategory = require("./subCategory")

router.use("/auth", auth)
router.use("/banner", banner )
router.use("/category", category )
router.use("/subcategory", subCategory )

module.exports = router