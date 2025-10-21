const bannerModel = require("../model/banner.model");
const fs = require("fs")
const path = require("path")

// Added Banner
const bannerController = async (req, res) => {
  let { link } = req.body
  let { filename } = req.file

  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      link
    })
    await banner.save()
    return res
      .status(201)
      .json({
        success: true,
        message: "Banner created successfull",
        data: banner

      })

  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || error
      })
  }
}

// Delete Banner
const deleteBannerController = async (req, res) => {
  try {
    let { id } = req.params
    let deletebanner = await bannerModel.findOneAndDelete({ _id: id })
    let imageurl = deletebanner.image.split("/")
    let filepath = path.join(__dirname, "../../uploads/")
    fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
      if (err) {
        return res
          .status(500)
          .json({
            success: false,
            message: err.message || err
          })
      }
    })
    return res
      .status(200)
      .json({
        success: true,
        message: "Banner delete successfull"
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || error
      })
  }
}

// Update Banner
const updatebannerController = async (req, res) => {
  try {
    let { id } = req.params
    let { filename } = req.file

    let updatebanner = await bannerModel.findOne({ _id: id })

    if (updatebanner) {
      let imageurl = updatebanner.image.split("/")
      let filepath = path.join(__dirname, "../../uploads/")

      fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
        if (err) {
          return res
            .status(500)
            .json({
              success: false,
              message: err.message || err
            })
        }
      })
      updatebanner.image = `${process.env.SERVER_URL}/${filename}`
      await updatebanner.save()
      return res
        .status(200)
        .json({
          success: true,
          message: "Banner Update successfull"
        })
    } else {
      let newFilePath = path.join(__dirname, "../../uploads", filename);
      fs.unlink(newFilePath, (err) => {
        if (err) console.log("Failed to delete unused file:", err);
      })
      return res
        .status(404)
        .json({
          success: false,
          message: "Banner not found"
        })
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || error
      })
  }
}

// Get Banner
const allBannersController = async (req, res) => {
  try {
    let allbanners = await bannerModel.find({})

    return res
      .status(200)
      .json({
        success: true,
        message: "All Banner fetched successfull",
        data: allbanners
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Banner not found"
      })
  }
}


module.exports = {
  bannerController,
  deleteBannerController,
  updatebannerController,
  allBannersController
}