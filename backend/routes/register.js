const express = require("express")
const {userLoginModel} = require("../models")
const crypto = require("crypto")
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post("/",async (req,resp)=>{
    const {username,password,email,usertype} = req.body
    if (!(usertype == "admin" || usertype == "normal")){
        return resp.json({status:"failed",message:"usertype should be either admin or normal"})      
    }
    // invalidate duplicate username or email 
    try{    
        const chkusername = await userLoginModel.countDocuments({$or:[{username},{email}]})
        if (chkusername >= 1){
            return resp.json({status:"failed",message:"username or email already taken"})
        }

        // register after checking for unique email and username
        const passhash = crypto.createHash("sha256")
        passhash.update(password)
        const user = await userLoginModel.create({username,password:passhash.digest("hex"),usertype,email})
        jwt.sign({username,usertype},process.env.MYSECRETKEY,(err,token)=>{
            if (err){
                console.log("jwt error",err)
                resp.json({status:"failed",message:"register failed",err})
            }
            if (token){
                resp.json({status:"ok",message:"register Success",token})
            }
        })
        
    }catch(err){
        resp.json({status:"failed",message:"login failed"})
    }
})


module.exports = router