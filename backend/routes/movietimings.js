const express = require("express")
const router = express.Router()
const {movieModel,movieTimingModel} = require("../models")

router.post("/:movieId",(req,resp)=>{
    const movieId=  req.params.movieId
    const {timings} = req.body
    timings.forEach(async (movieseat) => {
        try{
            const existing = await movieTimingModel.findOne({date:movieseat.date,time:movieseat.time,audi_ref:movieseat.hallId})
            if (existing){
                console.log("already exists in the database,skipping",existing)
            }else{
                const res = await movieTimingModel.create({movie_ref:movieseat.movieId,date:movieseat.date,time:movieseat.time,audi_ref:movieseat.hallId})
            }
            
        }catch(err){
            resp.status(500).json({"status":"failed",message:"server error while adding record"})
        }        
    });
    resp.json({status:"ok",message:"movie timing added successfully"})
    
})

module.exports = router