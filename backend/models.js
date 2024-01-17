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

const userSeatsSchema = new mongoose.Schema({
    movie_ref:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"movie"
    },
    user_ref: mongoose.Schema.Types.ObjectId,
    date:String,
    time:String,
    seats:String,
    price:Number
})

const transactionSchema = new mongoose.Schema({
    user_ref: mongoose.Schema.Types.ObjectId,
    pid:String,
    rid:String,
    scd:String,
    amt:String
})

const userLoginModel = new mongoose.model("user",userLoginSchema)
const movieModel = new mongoose.model("movie",movieSchema)
const userSeatsModel = new mongoose.model("user_seats",userSeatsSchema)
const transactionModel = new mongoose.model("txn",transactionSchema)

module.exports = {userLoginModel,movieModel,transactionModel,userSeatsModel}