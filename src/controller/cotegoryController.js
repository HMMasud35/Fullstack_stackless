const categoryModel = require("../model/category.model");
const fs = require("fs")
const path = require("path")
const slugify = require('slugify')

// Added Category
const categoryController = async (req, res) => {
  try {
    let { name } = req.body
    let { filename } = req.file
    let slug = slugify(name, {
      replacement: '-',
      remove: undefined,
      lower: true,
      trim: true
    })

    let category = new categoryModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      name,
      slug
    })
    await category.save()
    return res
      .status(201)
      .json({
        success: true,
        message: "Category created successfull",
        data: category
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

// Delete Category
const deleteCategoryController = async (req, res) => {
  try {
    let { id } = req.params
    let deleteCategory = await categoryModel.findOneAndDelete({ _id: id })
    let imageurl = deleteCategory.image.split("/")
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
        message: "Category delete successfull"
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

// Update Category
const updateCategoryController = async (req, res) => {
  try {
    let { id } = req.params
    let { filename } = req.file

    let updateCategory = await categoryModel.findOne({ _id: id })

    if (updateCategory) {
      let imageurl = updateCategory.image.split("/")
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
      updateCategory.image = `${process.env.SERVER_URL}/${filename}`
      await updateCategory.save()
      return res
        .status(200)
        .json({
          success: true,
          message: "Category Update successfull"
        })
    } else {
      return res
        .status(404)
        .json({
          success: false,
          message: "Category not found"
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

// Get Category
const allCategoryController = async (req, res) => {
  try {
    let allCategory = await categoryModel.find({})

    return res
      .status(200)
      .json({
        success: true,
        message: "All Category fetched successfull",
        data: allCategory
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


module.exports = {
  categoryController,
  deleteCategoryController,
  updateCategoryController,
  allCategoryController
}