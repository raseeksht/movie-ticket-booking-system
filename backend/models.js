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
    showTime:String,
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

const audiSchema = new mongoose.Schema({
    name:String,
    location_ref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"our_branch"
    },
    seats: mongoose.Schema.Types.Array
})

const movieTimingSchema = new mongoose.Schema({
    movie_ref: mongoose.Schema.Types.ObjectId,
    date:String,
    time:String,
    audi_ref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"audi"
    }
})

const branchSchema = new mongoose.Schema({
    location:String,
    contact:String
})


const userLoginModel = new mongoose.model("user",userLoginSchema)
const movieModel = new mongoose.model("movie",movieSchema)
const userSeatsModel = new mongoose.model("user_seats",userSeatsSchema)
const transactionModel = new mongoose.model("txn",transactionSchema)
const audiModel = new mongoose.model("audi",audiSchema)
const movieTimingModel = new mongoose.model("movie_timing",movieTimingSchema)
const branchModel = new mongoose.model("our_branch",branchSchema)

module.exports = {
    userLoginModel,
    movieModel,
    transactionModel,
    userSeatsModel,
    audiModel,
    movieTimingModel,
    branchModel
}