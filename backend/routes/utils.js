
const jwt = require("jsonwebtoken")
const {transactionModel} = require("../models")

function checkPayload(payload){
    // return fail json if key is missing else null
    for (let key in payload){
        if (payload[key] == undefined){
            return {"status":"request failed","message":`'${key}' is missing`,payload}
        }
    }
}


async function recordTxn(headers,pid,rid,scd,amt){
    console.log("i am called")
    console.log(headers)
    authToken = headers.authorization.split(" ")[1]
    const tokendata = jwt.decode(authToken,process.env.MYSECRETKEY)
    const username = tokendata.username
    try{
        const res = await transactionModel.create({
            user_ref:tokendata.uid,
            pid,rid,scd,amt
        })
        console.log(res)
        return true
    }catch(err){
        return false
    }


}


module.exports = {checkPayload,recordTxn}