const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("randomstring");
const UserService = require("../services/users.services");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../../dependencies/config");

/**
 * @description let user log in with valid username/email and password and issue a JWT token
 * @body {String} username
 * @body {String} password
 */
const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    //it should not be lean
    const user = await UserService.getUserByAnyField(userName);

    // If user  is not in the database
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Auth Failed",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Auth Failed",
      });
    }

    const secretToken = cryptoRandomString.generate({
      length: 12,
      charset: "alphabetic",
    });

    user.uniqueString = secretToken;
    await user.save();

    const token = JWT.sign(
      {
        _id: user._id,
        userName: user.userName,
        uniqueString: user.uniqueString,
      },
      JWT_SECRET,
      { expiresIn: "100m" }
    );

    return res.status(StatusCodes.OK).json({
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

/**
 * @description  register the user
 * @param {String} userName
 * @param {String} password
 */
const signUp = async (req, res, next) => {
  try {
    let { userName, password } = req.body;

    const user = await UserService.getUserByAnyField(userName);
    if (user) {
      return res.status(StatusCodes.CONFLICT).json({
        hasError: true,
        message: "FAILED: user already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const secretToken = cryptoRandomString.generate({
      length: 12,
      charset: "alphabetic",
    });
    const savedUser = await UserService.registerUser({
      _id: new ObjectId(),
      password: hashedPassword,
      userName,
      uniqueString: secretToken,
    });

    const token = JWT.sign(
      {
        _id: savedUser._id,
        userName: savedUser.userName,
        uniqueString: secretToken,
      },
      JWT_SECRET,
      { expiresIn: "1600m" }
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        _id: savedUser._id,
        userName: savedUser.userName,
        token,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      hasError: true,
      message: "FAILED: sorry, something went wrong",
      error: "internal server error",
    });
  }
};

const logout = async (req, res, next) => {
  try {
    const user = req.userData;

    const userFound = await UserService.logoutById(user._id);

    if (!userFound) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "something went wrong",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      isLoggedOut: true,
    });
  } catch (error) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      error: "internal server error",
    });
  }
};

module.exports = {
  login,
  logout,
  signUp,
};
