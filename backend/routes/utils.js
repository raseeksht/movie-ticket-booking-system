

function checkPayload(payload){
    // return fail json if key is missing else null
    for (let key in payload){
        if (payload[key] == undefined){
            return {"status":"request failed","message":`'${key}' is missing`,payload}
        }
    }
}


module.exports = {checkPayload}