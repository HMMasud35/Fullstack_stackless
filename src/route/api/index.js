const express = require("express")
const router = express.Router()
const auth = require("./auth")
const banner = require("./banner")
const category = require("./category")
const subCategory = require("./subCategory")
const product = require("./product")

router.use("/auth", auth)
router.use("/banner", banner)
router.use("/category", category)
router.use("/subcategory", subCategory)
router.use("/product", product)

module.exports = router