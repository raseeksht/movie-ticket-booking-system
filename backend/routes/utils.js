
const jwt = require("jsonwebtoken")
const {transactionModel,userSeatsModel,movieModel,movieTimingModel, audiModel} = require("../models")
const mongoose = require("mongoose")

function checkPayload(payload){
    // return fail json if key is missing else null
    for (let key in payload){
        if (payload[key] == undefined){
            return {"status":"request failed","message":`'${key}' is missing`,payload}
        }
    }
}

function getVideoId(url1){
    const url = new URL(url1)    
    if (url.hostname == "youtu.be"){
        return url.pathname.slice(1,)
    }else if(url.hostname=="www.youtube.com"){
        return url.searchParams.get('v')
    }else{
        return "Rxv165h1vws"
    }
}

async function recordTxn(headers,pid,rid,scd,amt){
    const tokendata = getDecodedToken(headers)
    const username = tokendata.username
    try{
        const res = await transactionModel.create({
            user_ref:tokendata.uid,
            pid,rid,scd,amt
        })
        return true
    }catch(err){
        return false
    }
}

function bookTicket(headers,movieId,bookedSeats,audiId,date,time){
    const tokendata = getDecodedToken(headers)
    return new Promise(async (resolve,reject)=>{
        try{
            const movieTimingFilter = {
                movie_ref: movieId,
                audi_ref: audiId,
                date,
                time
            }
            const movie = await movieTimingModel.findOne(movieTimingFilter)
            for (seat of bookedSeats){
                const [x,y] = seat.split("-")
                movie.seats_status[parseInt(x)][parseInt(y)] = 1
            }
            const result = await movieTimingModel.findOneAndUpdate(
                movieTimingFilter,
                { $set: { seats_status: movie.seats_status} },
                { new: true }
            ).populate({
                path:"audi_ref",
                populate:{
                    path:"location_ref"
                }
            }).populate("movie_ref");

            const location_ref = await audiModel.findOne({_id:audiId}).populate(['location_ref'])

            await userSeatsModel.create({
                user_ref:tokendata.uid,
                movie_ref:movieId,
                seats: JSON.stringify(bookedSeats),
                date: date,
                time: time,
                price: 250 * bookedSeats.length,
                audi_ref:audiId,
                location_ref:location_ref
            })

            resolve(result)
        }catch(err){
            reject(err)
        }

    })
    
}

function getDecodedToken(headers){
    try{
        authToken = headers.authorization.split(" ")[1]
        const tokendata = jwt.decode(authToken,process.env.MYSECRETKEY)
        return tokendata
    }catch(err){
        return {}
    }
}

module.exports = {checkPayload,recordTxn,bookTicket,getDecodedToken,getVideoId}