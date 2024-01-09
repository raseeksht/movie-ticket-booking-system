const mongoose = require("mongoose")


const userLoginSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    usertype:String // (admin or normal) user
})

const movieSchema = new mongoose.Schema({
    name:String,
    thumbnail:String,
    description:String,
    releaseDate:String,
    length:String,
    rating:String,
    trailer:String,
    seats: mongoose.Schema.Types.Array
})

// const movieSeatsSchema = new mongoose.Schema({
//     movie_ref:mongoose.Schema.Types.ObjectId,
//     date:String,
//     time:String,
//     arrangement: mongoose.Schema.Types.Array
// })

const transactionSchema = new mongoose.Schema({
    user_ref: mongoose.Schema.Types.ObjectId,
    pid:String,
    rid:String,
    scd:String,
    amt:String
})

const userLoginModel = new mongoose.model("user",userLoginSchema)
const movieModel = new mongoose.model("movie",movieSchema)
// const movieSeatsModel = new mongoose.model("movieseat",movieSeatsSchema)
const transactionModel = new mongoose.model("txn",transactionSchema)

module.exports = {userLoginModel,movieModel,transactionModel}