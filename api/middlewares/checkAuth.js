const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../dependencies/config");
const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/users.services");

/* DECODING JWT */
module.exports = async (req, res, next) => {
  try {
    // console.log('Header Auth console: ', req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: `Authentication failed. Please use correct credentials.`,
        isLoggedOut: true,
      });
    } else {
      /* FETCH FIRST PART OF THE TOKEN SENT IN HEADERS */
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      const userFound = await UserService.getUserById(decoded._id);

      //check if already loggedout
      if (
        !userFound?.uniqueString ||
        userFound?.uniqueString !== decoded.uniqueString
      ) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Auth failed !",
          isLoggedOut: true,
        });
      }

      req.userData = {
        _id: decoded._id,
        userName: decoded.userName,
      };

      next();
    }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Auth failed !",
      isLoggedOut: true,
      err: error,
    });
  }
};
