const UserModel = require("../models/userModel");

const signUpValidator = async(req,res,next) => {
  const {email,password,confirm_password} = req.body;

  if(password.length < 8){
    return res.status(400).send({"errmsg":"Password must be of minimum 8 characters1"})
  }

  if(!/\d/.test(password)){
    return res.status(400).send({"errmsg":"Password must contain at least one number!"})
  }

  if(!/[!@#$%^&*]/.test(password)){
    return res.status(400).send({"errmsg":"Password must contain a special character!"})
  }

  if(!/[A-Z]/.test(password)){
    return res.status(400).send({"errmsg":"Password must contain an uppercase character!"})
  }

  if(password !== confirm_password){
    return res.status(400).send({"errmsg":"Password Mismatched!"})
  }

  if(password.length != confirm_password.length){
    return res.status(400).send({"errmsg":"Both passwords should be of same length!"})
  }

  const existUser = await UserModel.findOne({email})
  if(existUser){
    return res.status(400).send({"errmsg":"User Already Exists!"})
  }

  next()

}


module.exports = signUpValidator;