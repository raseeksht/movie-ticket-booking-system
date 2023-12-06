const express = require("express")


const router = express.Router()

router.get("/",(req,resp)=>{
    resp.send("use appropriate endpoints")
})

router.use("/login",require("./login"))
router.use("/register",require("./register"))
router.use("/movies",require("./movies"))

module.exports = router