const User = require("../schemas/user.schema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//Don't Lean this query
/**
 * @description get user by username or email
 * @param {String} userName
 */
const getUserByAnyField = async (userName) => {
  try {
    userName = userName.toLowerCase();
    const user = await User.findOne({
      userName,
    }).select(`-__v`);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (user, opts) => {
  try {
    const newUser = new User(user);
    const data = await newUser.save(opts);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (userId) => {
  try {
    const userFound = await User.findOne({ _id: new ObjectId(userId) })
      .select(`-__v`)
      .lean()
      .exec();

    return userFound;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (userId, updObj, session) => {
  try {
    return await User.findByIdAndUpdate({ _id: userId }, updObj, {
      upsert: true,
      new: true,
      session: session,
    }).select(`-password -__v`);
  } catch (error) {
    console.log(error);
  }
};

const logoutById = async (_id) => {
  try {
    const userFound = await User.findOne({ _id });

    if (userFound) {
      userFound.uniqueString = "";

      return await userFound.save();
    } else {
      return null;
    }
  } catch (error) {
    console.log({ error });
  }
};
module.exports = {
  registerUser,
  getUserById,
  getUserByAnyField,
  updateUser,
  logoutById,
};
