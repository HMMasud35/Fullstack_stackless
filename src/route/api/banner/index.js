const express = require("express")
const {
  bannerController,
  deleteBannerController,
  updatebannerController,
  allBannersController
} = require("../../../controller/bannerController");
const router = express.Router()
const {
  tokenCheckMiddelware,
  adminCheck
} = require("../../../utils/authMiddelware");
const upload = require("../../../utils/uplods");

router.post("/addbanner",
  tokenCheckMiddelware,
  adminCheck,
  upload.single("bannerimg"),
  bannerController)
router.delete("/deletebanner/:id",
  tokenCheckMiddelware,
  adminCheck,
  deleteBannerController)
router.patch("/updatebanner/:id",
  tokenCheckMiddelware,
  adminCheck,
  upload.single("bannerimg"),
  updatebannerController)
router.get("/allBanners",
  allBannersController)

module.exports = router