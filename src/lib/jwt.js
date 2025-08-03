const jsonwebtoken = require("jsonwebtoken");
//const secret = process.env.JWT_SECRET;

function sign(payload){
    return jsonwebtoken.sign(payload, 'doni9705', {expiresIn: '2h'} );

}

function verify(token){
    return jsonwebtoken.verify(token, secret);
}

module.exports = {
    sign,
    verify,
}