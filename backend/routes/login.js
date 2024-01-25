const express = require("express")
const {userLoginModel} = require("../models")
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const {verifyUser} = require("../middlewares/verifyuser")
const {getDecodedToken} = require("./utils")
const router = express.Router()

router.post("/",async (req,resp)=>{
    const {username,password,usertype} = req.body
    if (!(usertype == "admin" || usertype == "normal")){
        return resp.json({status:"failed",message:"usertype should be either admin or normal"})      
    }
    try{
        const passhash = crypto.createHash("sha256")
        passhash.update(password)
        const user = await userLoginModel.findOne({username,password:passhash.digest("hex"),usertype})

        // checks if username and hashedpassword exists in database and takes action accordingly
        if (user){
            jwt.sign({username,usertype,uid:user._id,email:user.email},process.env.MYSECRETKEY,(err,token)=>{
                if (err){
                    console.log("jwt error",err)
                    resp.json({status:"failed",message:"login failed"})
                }
                if (token){
                    usrdata = {
                        username,usertype,uid:user._id,
                        email:user.email
                    }
                    resp.json({status:"ok",message:"login Success",token,data:usrdata})
                }
            })
        }else{
            resp.json({status:"failed",message:"invalid username or password"})

        }
        
    }catch(err){
        resp.json({status:"failed",message:"login failed"})
    }
})

router.get("/validatelogin",verifyUser,(req,resp)=>{
    const decodedToken = getDecodedToken(req.headers)    
    resp.json({"status":"ok","message":"Token is Valid",data:decodedToken})
})


module.exports = router