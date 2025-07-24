const mongoose = require("mongoose")

const clientesSchema = new mongoose.Schema({
    nombre:{
        type: String, 
        required: true,
        minLength:2,
        maxLength:100,
    },

    direccion:{
        type:String,
        required:true,
        minLength:5,
        maxLength:100,
    },
    telefono:{
        type: String,
        required: true,
        minLength: 10,
        maxLength: 20
    },
    email:{
        type: String,
        required: true,
        match: RegExp(".*@.*..*"),
    },
    nomNegocio:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    password:{
        type: String,
        required: true,
        select:false,
    },
    createAt:{
        type: Date,
        default: new Date(),
    },
});
module.exports = mongoose.model("clientes", clientesSchema);  //exportamos el modelo para poder usarlo en otros archivos
