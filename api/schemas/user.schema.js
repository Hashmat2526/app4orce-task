// importing dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// creating schema to be stored in db
const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userName: { type: String, trim: true, lowercase: true },
    password: { type: String },
    uniqueString: { type: String },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// comparing hashed password
userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    const passwordMatched = await bcrypt.compare(newPassword, this.password);
    return passwordMatched;
  } catch (error) {
    console.log("error in compare password", error);
    next(error);
  }
};

// exporting schema
module.exports = mongoose.model("User", userSchema);
