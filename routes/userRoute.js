const express = require("express")
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const signUpValidator = require("../middlewares/signupValidator");
const userRouter = express.Router()
const jwt = require("jsonwebtoken")


userRouter.post("/signup",signUpValidator,async(req,res)=>{

    try {
        const {password,confirm_password} = req.body;
        const newPassword = await bcrypt.hash(password,10)
        const newconfirmPassword = await bcrypt.hash(confirm_password,10)
        const user = await UserModel.create({...req.body,password:newPassword,confirm_password:newconfirmPassword})
        res.status(200).send({"msg":"User Registered Successfully",user})
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).send("Invalid Credentials!")
        }

        const comparePassword = await bcrypt.hash(password,user.password)
        if(!comparePassword){
            return res.status(400).send("Invalid Credentials!")
        }else{
             const token = jwt.sign({userId:user._id,username:user.name},process.env.secretKey,{expiresIn:"1d"})
             res.status(200).send({"msg":"User LoggedIn Successfully!",token,name:user.name})
        }

    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

module.exports = userRouter;