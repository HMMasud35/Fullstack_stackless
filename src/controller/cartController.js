const cartModel = require("../model/cart.model")
const productModel = require("../model/product.model")
const signupModel = require("../model/signup.model")


const cartController = async (req, res) => {
  try {
    let { user, product, quantity, variant } = req.body

    let productinfo = await productModel.findById(product)

    let price = productinfo.discountprice ? productinfo.discountprice : productinfo.price
    let totalprice = price * quantity

    if (productinfo.variantType == "multiVariant") {
      if (!variant) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Variant is required"
          })
      } else {
        let cart = new cartModel({
          user,
          product,
          quantity,
          variant,
          totalprice
        })
        await cart.save()
        return res
          .status(201)
          .json({
            success: true,
            message: "Cart created successfull",
            data: cart
          })
      }
    } else {
      let cart = new cartModel({
        user,
        product,
        quantity,
        totalprice
      })
      await cart.save()
      return res
        .status(201)
        .json({
          success: true,
          message: "Cart created successfull",
          data: cart
        })
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || err
      })
  }

}

const allCartController = async (req, res) => {
  try {
    let allCart = await cartModel.find({}).populate([
      {
        path: "user",
        select: "name email -_id"
      },
      {
        path: "product",
        select: "title image price discountprice variantType -_id"
      },
      {
        path: "variant",
        select: "size stock -_id"
      }
    ]).sort({ createdAt: -1 })

    return res
      .status(200)
      .json({
        success: true,
        message: "All Cart fetched successfull",
        data: allCart
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || err
      })
  }
}

const singleUserCartController = async (req, res) => {
  try {
    let { id } = req.params
    let userInfo = await signupModel.findOne({ _id: id }).select("name email -_id")
    let cartlist = await cartModel.find({ user: id })
      .select("-user")
      .populate([
        {
          path: "product",
          select: "title image price discountprice variantType -_id"
        },
        {
          path: "variant",
          select: "size stock -_id"
        }
      ]).sort({ createdAt: -1 })

    return res
      .status(200)
      .json({
        success: true,
        message: "Single user cart fetched successfull",
        user: {
          name: userInfo?.name,
          email: userInfo?.email
        },
        data: cartlist
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || err
      })
  }
}

module.exports = { cartController, allCartController, singleUserCartController }