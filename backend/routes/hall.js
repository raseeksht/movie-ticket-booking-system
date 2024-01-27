const express = require("express")
const {audiModel} = require("../models")
const {checkPayload} = require("./utils")

const router = express.Router()

router.get("/",async (req,resp)=>{
    try{
        const audis = await audiModel.find({}).populate('location_ref')
        resp.json({status:"ok","message":"audi data Fetched successfully",data:audis})
    }catch(err){
        resp.status(500).json({"status":"failed",message:"Audi fetching error"})
    }
})

router.post("/",async (req,resp)=>{
    // seatsArrangement is mulidimentinal array
    const {location_ref,name,seatsArrangement} = req.body
    const isBad = checkPayload({location_ref,name,seatsArrangement})
    if (isBad){
        return resp.status(400).json({"status":"failed",message:isBad.message,errlog:isBad})
    } 

    try{
        const hallCount = await audiModel.countDocuments({location_ref,name})
        if (hallCount > 0){
            return resp.status(400).json({status:"failed",message:`${name} already exist at that location`})
        }
        const res = await audiModel.create({location_ref,name,seats:seatsArrangement})
        resp.json({status:"ok",message:"Audi data Inserted Successfully"})
    }catch(err){
        resp.json({status:"failed","message":"failed to insert audi data",err})
    }
    

})

router.put("/:hallId",async (req,resp)=>{
    const hallId = req.params.hallId
    const {name,seats} = req.body

    const isBad = checkPayload({name,seats})
    if (isBad){
        return resp.status(400).json({status:"failed",message:"op op no mi",data:isBad})
    }

    try{
        await audiModel.updateOne({_id:hallId},{name,seats})
        resp.json({status:"ok",message:"Successfully Updated"})
    }catch(err){
        resp.status(500).json({status:"failed",message:"update failed",err})
    }
})

router.delete("/:hallId",async (req,resp)=>{
    const hallId = req.params.hallId
    try{
        await audiModel.deleteOne({_id:hallId})
        resp.json({status:"ok",message:"Deleted Successfully"})
    }catch(err){
        resp.json({"status":"failed",message:"failed to delete"})
    }

})

module.exports = router