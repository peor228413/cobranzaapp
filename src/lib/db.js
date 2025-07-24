const mongoose = require("mongoose")

const url =`mongodb+srv://gcespedes:vTjtSDmjkmBAtHIE@cluster0.xlbatje.mongodb.net`

function connect (){
   return mongoose.connect(url)

}

connect()


module.exports = {connect}