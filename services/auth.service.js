const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError.js");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect Credentials");
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};
