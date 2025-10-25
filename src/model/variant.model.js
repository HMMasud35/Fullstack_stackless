const { default: mongoose } = require("mongoose");

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    unique: [true, "Unique Name is Required"]
  },
  stock: {
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model("Variant", variantSchema)