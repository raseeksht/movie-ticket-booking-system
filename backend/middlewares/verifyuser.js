const jwt = require("jsonwebtoken")

function verifyUser(req,resp,next){
    const authToken = req.headers.authorization
    if (authToken !== undefined){
        jwt.verify(authToken.split(" ")[1],process.env.MYSECRETKEY,(err,data)=>{
            if (err){
                resp.status(401).json({"message":"token invalid",err})
            }else{
                next() //continue if the token if correct
            }
        })

    }else{
        resp.status(401).json({'msg':"err no token provided"})
    }
}

function isAdmin(req,resp,next){
    const authToken = req.headers.authorization
    // console.log(authToken)    
    if (authToken !== undefined){
        jwt.verify(authToken.split(" ")[1],process.env.MYSECRETKEY,(err,data)=>{
            if (err){
                resp.status(401).json({"message":"token invalid",err})
            }else{
                const decoded = jwt.decode(authToken.split(" ")[1],process.env.MYSECRETKEY)
                console.log("decoded",decoded)
                if (decoded.usertype == "admin"){
                    next()  //continue if the token if correct and is admin
                }else{
                    resp.json({status:"failed",message:"normal user. Permission Denied"})
                }

            }
        })

    }else{
        resp.status(401).json({'msg':"err no token provided"})
    }
}

module.exports = {verifyUser,isAdmin}