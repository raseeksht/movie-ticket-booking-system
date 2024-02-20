const express = require("express")
const {verifyUser} = require("../middlewares/verifyuser")
const {getDecodedToken} = require("./utils")
const {movieModel,userSeatsModel} = require("../models")

const router = express.Router()


router.get("/",verifyUser,async (req,resp)=>{
    const tokendata = getDecodedToken(req.headers)
    // const uid = tokendata.uid
    try{
        // deep populate audi_ref so that branch info can also be sent
        const userSeats = await userSeatsModel.find({user_ref:tokendata.uid}).populate(['movie_ref',{
            path:"audi_ref",
            populate:{
                path:"location_ref"
            }
        }])
        console.log(userSeats)
        resp.json({status:"ok",message:"fetched successfully",data:userSeats})
    }catch(err){
        resp.json({status:"failed",message:"error fetching result",err})
    }
})


module.exports = router