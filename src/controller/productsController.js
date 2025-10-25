const productModel = require("../model/product.model")
const fs = require("fs")
const slugify = require('slugify')

// Added Product
const productController = async (req, res) => {
  try {
    let {
      title,
      discription,
      category,
      subcategory,
      stock,
      price,
      discountprice
    } = req.body
    let { filename } = req.file

    let slug = slugify(title, {
      replacement: '-',
      remove: undefined,
      lower: true,
      trim: true
    })

    let addproduct = new productModel({
      title,
      discription,
      image: `${process.env.SERVER_URL}/${filename}`,
      category,
      subcategory,
      stock,
      price,
      discountprice,
      slug
    })
    await addproduct.save()
    return res
      .status(201)
      .json({
        success: true,
        message: "Product Upload successfull",
        data: addproduct
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

module.exports = { productController }