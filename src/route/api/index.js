const express = require("express")
const router = express.Router()
const auth = require("./auth")
const banner = require("./banner")

router.use("/auth", auth)
router.use("/banner", banner )

module.exports = router