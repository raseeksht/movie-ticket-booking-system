const express = require("express")


const router = express.Router()

router.get("/",(req,resp)=>{
    resp.send("use appropriate endpoints")
})

router.use("/login",require("./login"))
router.use("/register",require("./register"))
router.use("/movies",require("./movies"))
router.use("/tickets",require("./tickets"))

module.exports = router