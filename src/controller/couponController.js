const couponMdel = require('../model/coupon.model');
const { generateCouponCode } = require('../utils/couponCode');

const couponController = async (req, res) => {
  try {
    let {
      length,
      discountPercent,
      discountAmount,
      maxDiscount,
      minOrderValue,
      startAt,
      endAt,
      usageLimit,
      description,
    } = req.body;

    if (!endAt || !startAt)
      return res
        .status(400)
        .json({
          error: 'Start & Expiry date is required'
        })

    let code;
    for (let attempt = 0; attempt < 5; attempt++) {
      code = generateCouponCode(Number(length) || 10, { uppercase: true, includeDashes: false })
      const exists = await couponMdel.findOne({ code })
      if (!exists) break
      code = null
    }
    if (!code)
      return res
        .status(500)
        .json({
          error: 'Failed to generate unique coupon code. Try again.'
        })

    const coupon = new couponMdel({
      code,
      discountPercent,
      discountAmount,
      maxDiscount,
      minOrderValue,
      startAt,
      endAt,
      usageLimit,
      description
    });

    await coupon.save();
    return res
      .status(201)
      .json({
        success: true,
        message: 'Coupon created succsessfull',
        data: coupon
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        error: 'Server error',
        details: err.message
      });
  }
};

const applyCouponController = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    if (!code) return res.status(400).json({ error: 'code is required' });
    if (cartTotal == null) return res.status(400).json({ error: 'cartTotal is required' });

    const coupon = await couponMdel.findOne({ code: code.toString().trim().toUpperCase() });
    if (!coupon) return res.status(404).json({ valid: false, reason: 'Coupon not found' });

    if (!coupon.active) return res.status(400).json({ valid: false, reason: 'Coupon is inactive' });

    const now = new Date();
    if (now < coupon.startAt) return res.status(400).json({ valid: false, reason: 'Coupon not yet active' });
    if (now > coupon.endAt) return res.status(400).json({ valid: false, reason: 'Coupon expired' });

    if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ valid: false, reason: 'Coupon usage limit reached' });
    }

    if (cartTotal < coupon.minOrderValue) {
      return res.status(400).json({
        valid: false,
        reason: `Minimum order value is ${coupon.minOrderValue}`
      });
    }

    let discount = 0;

    if (coupon.discountPercent && coupon.discountPercent > 0) {
      discount = (Number(cartTotal) * Number(coupon.discountPercent)) / 100;
      if (coupon.maxDiscount != null) discount = Math.min(discount, coupon.maxDiscount);
    }

    if (coupon.discountAmount && coupon.discountAmount > 0) {
      discount += Number(coupon.discountAmount);
    }

    if (discount > cartTotal) discount = Number(cartTotal);

    const finalTotal = Number(cartTotal) - discount;

    return res.json({
      valid: true,
      discount: Number(discount.toFixed(2)),
      finalTotal: Number(finalTotal.toFixed(2)),
      coupon: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        discountAmount: coupon.discountAmount,
        maxDiscount: coupon.maxDiscount
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};


const incrementController = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'code required' });

    const coupon = await couponMdel.findOneAndUpdate(
      { code: code.toString().trim().toUpperCase(), active: true, $expr: { $lt: ["$usedCount", { $ifNull: ["$usageLimit", Infinity] }] } },
      { $inc: { usedCount: 1 } },
      { new: true }
    );
    if (!coupon) return res.status(400).json({ error: 'Coupon not found or usage limit reached / inactive' });
    return res.json({ message: 'Usage incremented', coupon });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { couponController, applyCouponController, incrementController };
