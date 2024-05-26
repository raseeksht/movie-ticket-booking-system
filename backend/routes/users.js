const express = require("express");
const {verifyUser} = require("../middlewares/verifyuser");
const {getDecodedToken} = require("./utils")

const router = express.Router();


router.get("/changepassword",verifyUser,(req,resp)=>{
    const decodedToken = getDecodedToken(req.headers)
    console.log(decodedToken);
    return resp.jsons({msg:"ok"})

})

module.exports = router;