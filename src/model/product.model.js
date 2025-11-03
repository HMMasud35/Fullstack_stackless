const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name is Required"],
    unique: [true, "Unique Name is Required"]
  },
  discription: {
    type: String,
    required: [true, "Discription is Required"],
  },
  image: {
    type: Array,
    required: [true, "Image is Required"],
    unique: [true, "Unique image is Required"]
  },
  slug: {
    type: String,
  },
  category: {
    type: String,
    ref: "Category",
  },
  subcategory: {
    type: String,
    ref: "SubCategory",
  },
  stock: {
    type: Number,
    required: [true, "Stock is Required"],
  },
  price: {
    type: Number,
    required: [true, "Price is Required"],
  },
  discountprice: {
    type: Number
  },
  review: [
    {
      type: String
    }
  ],
  variantType: {
    type: String,
    enum: ["singleVariant", "multiVariant"]
  },
  variants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Variant"
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)