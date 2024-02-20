const express = require("express")
const {checkPayload} = require("./utils")
const {branchModel} = require("../models")

const router = express.Router()

router.get("/",async (req,resp)=>{
    try{
        const branches = await branchModel.find({})
        resp.json({status:"ok","message":"branch data Fetched successfully",data:branches})
    }catch(err){
        resp.status(500).json({"status":"failed",message:"Branch fetching error",err})
    }
})

router.post("/",async (req,resp)=>{
    const {location,contact} = req.body
    const isBad = checkPayload({location,contact})
    if (isBad){
        return resp.status(400).json({"status":"failed",message:isBad})
    } 

    try{
        const res = await branchModel.create({location,contact})
        resp.json({status:"ok",message:"Branch Info Inserted Successfully"})
    }catch(err){
        resp.json({status:"failed","message":"failed to insert Branch Info",err})
    }
})

router.put("/",async (req,resp)=>{
    const {location,contact,_id} = req.body
    try{
        const result = await branchModel.updateOne({_id},{location,contact})
        resp.json({"status":"ok",message:"Branch Information Edited Successfully"})
    }catch(err){
        resp.status(500).json({"status":"failed",message:"Update Failed"})
    }
})

module.exports = router