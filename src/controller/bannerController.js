const bannerModel = require("../model/banner.model");

// banner added
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

const deleteBannerController = async (req, res) => {
  try {
    let { id } = req.params
   await bannerModel.findByIdAndDelete(id)
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


module.exports = { bannerController, deleteBannerController }