
const jwt = require("jsonwebtoken")
const {transactionModel,userSeatsModel,movieModel} = require("../models")

function checkPayload(payload){
    // return fail json if key is missing else null
    for (let key in payload){
        if (payload[key] == undefined){
            return {"status":"request failed","message":`'${key}' is missing`,payload}
        }
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

function bookTicket(headers,movieId,bookedSeats){
    const tokendata = getDecodedToken(headers)

    return new Promise(async (resolve,reject)=>{
        try{
            const movie = await movieModel.findOne({_id:movieId})
            for (seat of bookedSeats){
                const [x,y] = seat.split("-")
                movie.seats[parseInt(x)][parseInt(y)] = 1
            }
            const result = await movieModel.findOneAndUpdate(
                { _id: movieId },
                { $set: { seats: movie.seats} },
                { new: true }
            );
            await userSeatsModel.create({
                user_ref:tokendata.uid,
                movie_ref:movieId,
                seats: JSON.stringify(bookedSeats),
                date: movie.releaseDate,
                time: movie.showTime,
                price: 250 * bookedSeats.length
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

module.exports = {checkPayload,recordTxn,bookTicket,getDecodedToken}