const express = require("express")
const {
  // tokenCheckMiddelware,
  // adminCheck
} = require("../../../utils/authMiddelware")
const { createVariantController } = require("../../../controller/variantController")
const router = express.Router()


router.post("/createVariant",
  // tokenCheckMiddelware,
  // adminCheck,
  createVariantController
)

module.exports = router