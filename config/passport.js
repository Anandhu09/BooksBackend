const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { tokenTypes } = require("./tokens");
const { User } = require("../models");
require("dotenv").config()
const jwt_secret = process.env.JWT_SECRET


const jwtOptions = {
  secretOrKey: jwt_secret,
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
};


const jwtVerify = async (payload, done) => {
  try{
    if(payload.type !== tokenTypes.ACCESS){
      return done(new Error("Invalid Token Type"), false);
    }

    if(payload.time > payload.expiry){
      return done(new Error("Token expired, please re-login"), false);
    }

    const user = await User.findById(payload.sub) //payload.user._id 
    if(!user){
      return done(null, false);
    }
    done(null, user);
  } catch(err) {
    return done(err, false);
  }
};


const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
