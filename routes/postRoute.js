const express = require("express")
const DoctorModel = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    const {q} = req.params;
    try {
        if(q){
            const doctor = await DoctorModel.find({name: {$regex:q,$options:i}})
            res.status(200).send(doctor)
        }else{
            const doctors = await DoctorModel.find()
            res.status(200).send(doctors)
        }
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

postRouter.post("/appointments",async(req,res)=>{
    try {
        const bookapp = await DoctorModel.create(req.body)
        res.status(200).send({"msg":"Appointment Added Succesfully",bookapp})
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    const userId = req.userId;
    const doctor = await DoctorModel.findOne({_id:id})
    try {
        if(userId == user.userId.toString()){
            const update = await DoctorModel.findByIdAndUpdate({_id:id},req.body,{new:true})
            res.status(200).send({"msg":"Appointment Updated Succesfully",update})
        }else{
            res.status(400).send({"errmsg":"you are not allowed to update!"})
        }
    
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const userId = req.userId;
    const doctor = await DoctorModel.findOne({_id:id})
    try {
        if(userId == user.userId.toString()){
            const deleted = await DoctorModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"Appointment Deleted Succesfully"})
        }else{
            res.status(400).send({"errmsg":"you are not allowed to update!"})
        }
    
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})
module.exports = postRouter;