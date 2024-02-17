const express = require("express")
const router = express.Router()
const {movieTimingModel, audiModel} = require("../models")

// can be removed. movieTiming can be sent from /api/movies/:movieId
router.get("/:movieId",async (req,resp)=>{
    const movieId = req.params.movieId
    try{
        const res = await movieTimingModel.find({movie_ref:movieId})
        resp.json({status:"ok",message:"data fetched",data:res})
    }catch(err){
        resp.json({status:"failed",message:"Timing Fetch Error"})
    }
})


router.post("/",async (req,resp)=>{
    const {timings} = req.body
    let duplicate= [];
    const promises = []
    for (movieseat of timings) {
        try{
            const existing = await movieTimingModel.findOne({date:movieseat.date,time:movieseat.time,audi_ref:movieseat.hallId})
            if (existing){
                console.log("already exists in the database,skipping")
                duplicate.push(movieseat)
            }else{
                // make a copy of seatArrangement of hall for each movie for different independent date/time
                const hall = await audiModel.findOne({_id:movieseat.hallId})
                if (!hall){
                    throw new Error("Invalid HallId")
                }
                promises.push(movieTimingModel.create({movie_ref:movieseat.movieId,date:movieseat.date,time:movieseat.time,audi_ref:movieseat.hallId, seats_status:hall.seats }))
            }
        }catch(err){
            resp.status(400).json({status:"failed",message:"error occured",err})
            return
        }
    }
    try{
        await Promise.all(promises);
        if (duplicate.length > 0){
            resp.json({status:"ok",message:`Added. Ignored ${duplicate.length} duplicate entry`,duplicate})
        }
        else{
            resp.json({status:"ok",message:"movie timing added successfully"})
        } 
    }catch(err){
        resp.status(500).json({ "status": "failed", message: "server error while adding record" });
    }
})

module.exports = router