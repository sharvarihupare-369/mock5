const express = require("express")
const app = express()
const cors = require("cors")
const connection = require("./db")
const userRouter = require("./routes/userRoute")
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/users",userRouter)


app.get("/",(req,res)=>{
    res.send("Welcome To Home Route")
})

app.listen(process.env.PORT || 5000 ,async(req,res)=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on Port ${process.env.PORT}`)
})