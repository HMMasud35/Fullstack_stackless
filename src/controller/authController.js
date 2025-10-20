const signupModel = require("../model/signup.model");
const generateOTP = require("../utils/otp");
const sendEmailVerify = require("../utils/send_email");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// user registration
const signupController = async (req, res, next) => {
  let { name, email, password, phone, role } = req.body

  let userfind = await signupModel.findOne({ email })

  if (userfind) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Email already exist"
      })
  } else {
    let otp = generateOTP()
    let user = new signupModel({
      name,
      email,
      password,
      phone,
      role,
      otp
    })

    await user
      .save()
      .then(() => {
        sendEmailVerify(email, otp, name)

        // otp set time
        setTimeout(async () => {
          let otpremove = await signupModel
            .findOneAndUpdate({ email },
              { otp: null },
              { new: true })
          await otpremove.save()
        }, 30000);

        let info = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }

        return res
          .status(201)
          .json({
            success: true,
            message: "user created successfull",
            data: info
          })
      })
      .catch((err) => {
        next(err)
      })
  }
}

// OTP verify
const verifyOtpController = async (req, res, next) => {

  let { email, otp } = req.body

  let user = await signupModel.findOne({ email })

  if (!user) {
    return res
      .status(404)
      .json({
        success: false,
        message: "User Not Found"
      })
  } else {
    if (user.otp === otp) {
      let verify = await signupModel
        .findOneAndUpdate({ email },
          { verify: true },
          { new: true })
        .select("-password")


      return res
        .status(200)
        .json({
          success: true,
          message: "OTP verify successfull",
          data: verify
        })
    } else {
      return res
        .status(404)
        .json({
          success: false,
          message: "OTP Not Match"
        })
    }
  }
}

// user login
const loginController = async (req, res, next) => {
  let { email, password } = req.body

  let user = await signupModel.findOne({ email })
  if (!user) {
    return res
      .status(404)
      .json({
        success: true,
        message: "Invalid credential",
      })
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({
          email: user.email,
          role: user.role
        },
          process.env.PRIVETE_KEY,
          {
            expiresIn: "4m"
          });

        let info = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }

        return res
          .status(200)
          .json({
            success: true,
            message: "login successfull",
            data: info,
            token
          })
      } else {
        return res
          .status(404)
          .json({
            success: true,
            message: "Invalid credential",
          })
      }
    });
  }
}

// get all user
const alluserController = async (req, res, next) => {
  try {
    let allusers = await signupModel.find({}).select("-password")
    return res
      .status(200)
      .json({
        success: true,
        message: "all users fetch successfull",
        data: allusers
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Unauthrize"
      })
  }
}

// logout
const logoutController = async (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      return res
        .status(500)
        .json({
          success: false,
          message: err,
        })
    } else {
      return res
        .status(200)
        .json({
          success: true,
          message: "Logout successfull",
        })
    }
  })
}

module.exports = {
  signupController,
  alluserController,
  verifyOtpController,
  loginController,
  logoutController
}