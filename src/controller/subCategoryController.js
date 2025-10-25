const subCategoryModel = require("../model/subcategory.model")
const categoryModel = require("../model/category.model")
const fs = require("fs")
const path = require("path")
const slugify = require('slugify')

// Added SubCategory
const subCategoryController = async (req, res) => {
  try {
    let { name, category } = req.body
    let slug = slugify(name, {
      replacement: '-',
      remove: undefined,
      lower: true,
      trim: true
    })

    let subcategory = new subCategoryModel({
      name,
      slug,
      category
    })

    let updateCategory = await categoryModel.findOneAndUpdate({ _id: category },
      { $push: { subcategory: subcategory._id } })


    await updateCategory.save()
    await subcategory.save()
    return res
      .status(201)
      .json({
        success: true,
        message: "Sub Category created successfull",
        data: subcategory
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

// Delete SubCategory
const deleteSubCategoryController = async (req, res) => {
  try {
    let { id } = req.params
    let deleteSubCategory = await subCategoryModel.findByIdAndDelete({ id })

    if (deleteSubCategory) {
      let updateCategory = await categoryModel.findOneAndUpdate({ subcategory: id },
        { $pull: { subcategory: id } })

      await updateCategory.save()

      return res
        .status(200)
        .json({
          success: true,
          message: "Sub Category delete successfull"
        })
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Sub Category not found"
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

// Update SubCategory
const updateSubCategoryController = async (req, res) => {
  try {
    let { id } = req.params
    let { name } = req.body
    let slug = slugify(name, {
      replacement: '-',
      remove: undefined,
      lower: true,
      trim: true
    })

    if (!name) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Sub Category name is required"
        })
    } else {
      let updateSubCategory = await subCategoryModel.findByIdAndUpdate(id , { name, slug })
      await updateSubCategory.save()
      return res
        .status(200)
        .json({
          success: true,
          message: "Sub Category Update successfull"
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

// Get SubCategory
const allSubCategoryController = async (req, res) => {
  try {
    let allSubCategory = await subCategoryModel.find({})

    return res
      .status(200)
      .json({
        success: true,
        message: "All Sub Category fetched successfull",
        data: allSubCategory
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
  subCategoryController,
  deleteSubCategoryController,
  updateSubCategoryController,
  allSubCategoryController
}