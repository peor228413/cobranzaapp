const mongoose = require("mongoose")

const avalCtes = new mongoose.Schema({
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
    curp:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    ineCveElector:{
        type: String,
        required: false,
        minLength: 5,
        maxLength: 50,
    },
    
    enlaceIne:{
        type: String,
        required: false,
        select:false,
    },
    createAt:{
        type: Date,
        default: new Date(),
    },
});
module.exports = mongoose.model("avalCtes", avalCtes);  //exportamos el modelo para poder usarlo en otros archivos
