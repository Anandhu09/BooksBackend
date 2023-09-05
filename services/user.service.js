const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError.js");
const bcrypt = require("bcryptjs");



const getUserById = async (id)=>
{
    const theUser = await User.findOne({ "_id": id });

    return theUser;
}



 const getUserByEmail = async(email) => {
    const theUser = await User.findOne({ email });

    return theUser;
}


 const createUser = async(data) => {
    if(await User.isEmailTaken(data.email)){

        throw new ApiError(httpStatus.OK, "Email already taken");
    }
    if(!data.email){
        throw new ApiError(httpStatus.BAD_REQUEST, "Email is not allowed to be empty");
    }
    if(!data.name){
        throw new ApiError(httpStatus.BAD_REQUEST, "Name field is required");
    }
    if(!data.password){
        throw new ApiError(httpStatus.BAD_REQUEST, "Password field is required");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = await User.create({...data, password: hashedPassword});
    return user
}





module.exports={getUserById ,getUserByEmail,createUser}