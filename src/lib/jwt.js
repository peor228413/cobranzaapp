const jsonwebtoken = require("jsonwebtoken");
const secret = 'doni9705';


function sign(payload){
    return jsonwebtoken.sign(payload, secret, {expiresIn: '2h'} );

}

function verify(token){
    return jsonwebtoken.verify(token, secret);
}

module.exports = {
    sign,
    verify,
}