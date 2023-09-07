const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt_access_expiration_minutes = process.env.JWT_ACCESS_EXPIRATION_MINUTES;
const { tokenTypes } = require("../config/tokens");

const generateToken = (userId, expires, type, secret = jwt_secret) => {
  const payload = {
    sub: userId,
    type: type,
    exp: expires,
    iat: Date.now() / 1000,
  };
  const jwtToken = jwt.sign(payload, secret);
  return jwtToken;
};

const generateAuthTokens = async (user) => {
  const expires =
    Math.floor(Date.now() / 1000) + jwt_access_expiration_minutes * 60;
  const accessToken = generateToken(user.id, expires, tokenTypes.ACCESS);
  return {
    access: {
      token: accessToken,
      expires: new Date(expires * 1000),
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
