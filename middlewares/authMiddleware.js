const jwt = require("jsonwebtoken")
const authMiddleware = async(req,res,next) => {
  
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        res.status(400).send("Access Token Not Found!")
    }

    jwt.verify(token,process.env.secretKey,(err,decoded)=>{
        if(err){
            res.status(400).send({"errmsg":err.message})
        }else{
            req.userId = decoded.userId;
            req.name = decoded.username
            next()
        }
    })


}

module.exports = authMiddleware;