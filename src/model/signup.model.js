const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const singupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"]
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    // unique: true,
    // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, "Please enter a valid password"],
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  otp: {
    type: Number
  },
  verify: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

singupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", singupSchema)