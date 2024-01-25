const express = require("express")
const {audiModel} = require("../models")
const {checkPayload} = require("./utils")

const router = express.Router()

router.get("/",async (req,resp)=>{
    try{
        const audis = await audiModel.find({})
        resp.json({status:"ok","message":"audi data Fetched successfully",data:audis})
    }catch(err){
        resp.status(500).json({"status":"failed",message:"Audi fetching error"})
    }
})

router.post("/",async (req,resp)=>{
    // seatsArrangement is mulidimentinal array
    const {location,name,seatsArrangement} = req.body
    const isBad = checkPayload({location,name,seatsArrangement})
    if (isBad){
        return resp.status(400).json({"status":"failed",message:isBad})
    } 

    try{
        const res = await audiModel.create({location,name,seats:seatsArrangement})
        resp.json({status:"ok",message:"Audi data Inserted Successfully"})
    }catch(err){
        resp.json({status:"failed","message":"failed to insert audi data",err})
    }
    

})

module.exports = router