const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Image is Required"]
  },
  link: {
    type: String,
    required: [true, "Image Link is Required"]
  }
  
  
}, { timestamps: true })

module.exports = mongoose.model("Banner", bannerSchema)