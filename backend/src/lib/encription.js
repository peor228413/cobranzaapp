const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10

 function encript(text){
    return bcrypt.hashSync(text, SALT_ROUNDS);
 }

 function compare (text, hash){
    return bcrypt.compare(text, hash);
 }

 module.exports = {
    encript,
    compare,
 };