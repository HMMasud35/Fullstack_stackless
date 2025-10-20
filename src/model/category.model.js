const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    unique: [true, "Unique Name is Required"]
  },
  image: {
    type: String,
    required: [true, "Image is Required"]
  },
  slug: {
    type: String,
    required: [true, "Category is Required"]
  },
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema)