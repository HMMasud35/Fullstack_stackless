const productModel = require("../model/product.model")
const variantModel = require("../model/variant.model")
const slugify = require("slugify")

// Create Variant
const createVariantController = async (req, res) => {
  try {
    let { size, stock, product } = req.body

    let variant = new variantModel({
      size,
      stock,
      product
    })

    let updateProduct = await productModel.findOneAndUpdate({ _id: product },
          { $push: { variants: variant._id } })

    await updateProduct.save()
    await variant.save()
    return res
      .status(201)
      .json({
        success: true,
        message: "Variant create successfull",
        data: variant
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || err
      })
  }

}

module.exports = { createVariantController }

