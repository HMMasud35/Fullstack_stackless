const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    unique: [true, "Unique Name is Required"]
  },
  slug: {
    type: String,
    required: [true, "Category is Required"]
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category"
  },
}, { timestamps: true })

module.exports = mongoose.model("SubCategory", subCategorySchema)