const productModel = require("../model/product.model")
const fs = require("fs")
const path = require("path")
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
      discountprice,
      review,
      variantType,
    } = req.body
    let imagefile = req.files.map((item) => {
      return `${process.env.SERVER_URL}/${item.filename}`
    })

    let slug = slugify(title, {
      replacement: '-',
      remove: undefined,
      lower: true,
      trim: true
    })

    let product = new productModel({
      title,
      discription,
      image: imagefile,
      category,
      subcategory,
      stock,
      price,
      discountprice,
      review,
      variantType,
      slug
    })

    await product.save()
    return res
      .status(201)
      .json({
        success: true,
        message: "Product Upload successfull",
        data: product
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

// Delete Product
const deleteProductController = async (req, res) => {
  try {
    let { id } = req.params
    let deleteProduct = await productModel.findOneAndDelete({ _id: id })

    deleteProduct.image.map((img) => {
      let imageurl = img.split("/")
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
    })
    return res
      .status(200)
      .json({
        success: true,
        message: "Product delete successfull"
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Category not found"
      })
  }
}

// Update Product
const updateProductController = async (req, res) => {
  try {
    let { id } = req.params
    let { title } = req.body
    let imagefile = req.files.map((item) => {
      return `${process.env.SERVER_URL}/${item.filename}`
    })

    let updateProduct = await productModel.findOneAndUpdate({ _id: id })

    if (!title && !imagefile) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Product name and image are required"
        })
    } else {
      if (updateProduct) {
        updateProduct.image.map((img) => {
          let imageurl = img.split("/")
          let oldfilepath = path.join(__dirname, "../../uploads/")
          fs.unlink(`${oldfilepath}/${imageurl[imageurl.length - 1]}`, (err) => {
            if (err) {
              return res
                .status(500)
                .json({
                  success: false,
                  message: err.message || err
                })
            }
          })
        })
        let slug = slugify(title, {
          replacement: '-',
          remove: undefined,
          lower: true,
          trim: true
        })

        updateProduct.image = imagefile,
          updateProduct.title = title,
          updateProduct.slug = slug
        await updateProduct.save()

        return res
          .status(200)
          .json({
            success: true,
            message: "Product update successfull"
          })
      } else {
        let newFilePath = path.join(__dirname, "../../uploads/")
        fs.unlink(`${newFilePath}/${imageurl[imageurl.length - 1]}`, (err) => {
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
          .status(404)
          .json({
            success: false,
            message: "Product not found"
          })
      }
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

// Get Product
const allProductController = async (req, res) => {
  try {
    let allProduct = await productModel.find({}).populate([
      {
        path: "subcategory",
        select: "name slug"
      },
      {
        path: "category",
        select: "name slug"
      }
    ])

    return res
      .status(200)
      .json({
        success: true,
        message: "All Product fetched successfull",
        data: allProduct
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Product not found"
      })
  }
}

module.exports = {
  productController,
  deleteProductController,
  updateProductController,
  allProductController
}