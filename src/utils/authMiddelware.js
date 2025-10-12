const jwt = require('jsonwebtoken');

let tokenCheckMiddelware = (req, res, next) => {
  let { token } = req.headers

  try {
    jwt.verify(token,
      process.env.PRIVETE_KEY,
      function (err, decoded) {
        if (err) {
          return res
            .status(400)
            .json({
              success: false,
              message: err.message
            })
        } else {
          req.userdata = decoded
          next()
        }
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Unauthorize"
      })
  }
}

let adminCheck = (req, res, next) => {
  if (req.userdata.role == "admin") {
    next()
  } else {
    return res
      .status(400)
      .json({
        success: false,
        message: "access denid"
      })
  }
}

module.exports = { tokenCheckMiddelware, adminCheck }