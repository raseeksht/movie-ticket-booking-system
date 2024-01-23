const express = require("express")
const {movieModel} = require("../models")
const router = express.Router()
const {verifyUser,isAdmin} = require("../middlewares/verifyuser")
const {checkPayload,recordTxn,bookTicket,getVideoId} = require("./utils")

const axios = require("axios")

router.get("/",async (req,resp)=>{
    try{
        const movies = await movieModel.find({},{name:1,thumbnail:1,description:1,releaseDate:1})
        resp.json({status:"ok",message:"..",movies})
    }catch(err){
        resp.json({status:"failed",message:"Movie fetching failed"})
    }
})

router.post("/",isAdmin,async (req,resp)=>{
    const {name,description,releaseDate,thumbnail,length,rating,trailer,showTime} = req.body
    const isBad = checkPayload({name,description,releaseDate,thumbnail,length,rating,trailer,showTime})
    if (isBad){
        return resp.json(isBad)
    }

    try{
        // suppose the hall has 3 rows and six columns
        const row=10,column =9;
        const seats = Array.from({length:row},()=> new Array(column).fill(0))
        const movie = await movieModel.create({name,description,releaseDate,thumbnail,seats,showTime,length,rating,trailer:getVideoId(trailer)})
        resp.json({status:'ok',message:"movie added successfully",movie})
    }catch(err){
        resp.json({status:'failed',message:"error adding movie",err})
    }

})

router.get("/:movieId",async (req,resp)=>{
    const movieId = req.params.movieId
    try{
        const movie = await movieModel.findOne({_id:movieId})
        resp.json({status:"ok",movie})
    }
    catch(err){
        resp.json({err})
    }
})

router.put("/:movieId",isAdmin,async (req,resp)=>{
    const movieId = req.params.movieId
    const {name,thumbnail,description,releaseDate} = req.body

    try{
        const movie = await movieModel.updateOne({_id:movieId},{name,thumbnail,description,releaseDate}) 
        console.log(movie)
        resp.json({status:"ok",message:"movie updated successfully",movie})
    }catch(err){
        resp.json({status:"failed",message:"error updating the movie details"})
    }
})


router.post("/bookseat/:movieId",verifyUser,async (req,resp)=>{
    const movieId = req.params.movieId
    const {bookedSeats,oid,refId,amt} = req.body
    const scd = "EPAYTEST"
    try{
        const path="https://uat.esewa.com.np/epay/transrec";
        const params = {pid:oid,rid:refId,amt:parseInt(amt),scd}
        // console.log(params)
    
        const response = await axios.post(path, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        // console.log(response.data);
        if (response.data.includes("Success")){
            // add transaction to db
            const txn = await recordTxn(req.headers,oid,refId,scd,amt)

            const movie = await movieModel.findOne({_id:movieId})
            const result = bookTicket(req.headers,movieId,bookedSeats)
            resp.json({ status: "ok", message: "Seats booked successfully",bookedSeats });

        }else{
            console.log("payment not validate")
            resp.json({"status":"failed","message":"Invalid Transaction detected"})
            
        }
    }catch(err){
        console.log(err)
        resp.json({"status":"failed","message":"failed"})
    }
})

router.post("/bookseatphysical/:movieId",verifyUser,(req,resp)=>{
    const movieId = req.params.movieId
    const {bookedSeats} = req.body
    try{
        const result = bookTicket(req.headers,movieId,bookedSeats)
        resp.json({ status: "ok", message: "Seats booked successfully",bookedSeats });
    }catch(err){
        console.log(err)
        resp.json({"status":"failed","message":"failed"})
    }
})






module.exports = router






