const express = require("express")
const cors = require("cors")
// const login = require("./routes/login")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(cors())

let uri = "";
if (process.env.devServer == "1"){
    uri = "mongodb://127.0.0.1:27017/techjar"
    // console.log("connecting to local db")
}
else{
    uri = "mogodb://"
}
console.log(uri)
// console.log(process.env.devServer)
mongoose.connect(uri).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log("error connecting with db",err)
})




app.get("/",(req,resp)=>{
    resp.send("working link established")
})

app.use("/api",require("./routes/api"))

app.listen(8000,(req,resp)=>{
    console.log("server running on port 8000")
})