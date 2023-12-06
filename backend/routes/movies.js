const express = require("express")
const {movieModel} = require("../models")
const router = express.Router()
const {verifyUser,isAdmin} = require("../middlewares/verifyuser")
const {checkPayload} = require("./utils")

router.get("/",verifyUser,async (req,resp)=>{
    try{
        const movies = await movieModel.find({},{name:1,thumbnail:1,description:1,releaseDate:1})
        resp.json({status:"ok",message:"..",movies})
    }catch(err){
        resp.json({status:"failed",message:"Movie fetching failed"})
    }
})

router.post("/",isAdmin,async (req,resp)=>{
    const {name,description,releaseDate,thumbnail} = req.body
    const isBad = checkPayload({name,description,releaseDate,thumbnail})
    if (isBad){
        return resp.json(isBad)
    }

    try{
        // suppose the hall has 3 rows and six columns
        const row=3,column =6;
        const seats = Array.from({length:row},()=> new Array(column).fill(0))
        const movie = await movieModel.create({name,description,releaseDate,thumbnail,seats})
        resp.json({status:'ok',message:"movie added successfully",movie})
    }catch(err){
        resp.json({status:'failed',message:"error adding movie",err})
    }

})






module.exports = router






