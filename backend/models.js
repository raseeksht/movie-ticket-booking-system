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
    seats: mongoose.Schema.Types.Array
})

const userLoginModel = new mongoose.model("user",userLoginSchema)
const movieModel = new mongoose.model("movie",movieSchema)

module.exports = {userLoginModel,movieModel}