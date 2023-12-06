const express = require("express")
const {userLoginModel} = require("../models")
const crypto = require("crypto")
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post("/",async (req,resp)=>{
    const {username,password,usertype} = req.body
    if (!(usertype == "admin" || usertype == "normal")){
        return resp.json({status:"failed",message:"usertype should be either admin or normal"})      
    }
    try{
        const passhash = crypto.createHash("sha256")
        passhash.update(password)
        const user = await userLoginModel.countDocuments({username,password:passhash.digest("hex"),usertype})

        // checks if username and hashedpassword exists in database and takes action accordingly
        if (user){
            jwt.sign({username,usertype},process.env.MYSECRETKEY,(err,token)=>{
                if (err){
                    console.log("jwt error",err)
                    resp.json({status:"failed",message:"login failed"})
                }
                if (token){
                    resp.json({status:"ok",message:"login Success",token})
                }
            })
        }else{
            resp.json({status:"failed",message:"invalid username or password"})

        }
        
    }catch(err){
        resp.json({status:"failed",message:"login failed"})
    }
})


module.exports = router