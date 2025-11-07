const { default: mongoose } = require("mongoose");
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    discountPercent: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    maxDiscount: {
      type: Number,
      default: null
    },
    minOrderValue: {
      type: Number,
      default: 0
    },
    startAt: {
      type: Date,
      required: true
    },
    endAt: {
      type: Date,
      required: true
    },
    usageLimit: {
      type: Number,
      default: null
    },
    usedCount: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    },
    description: {
      type: String
    }
  }, { timestamps: true })

module.exports = mongoose.model("Coupon", couponSchema)