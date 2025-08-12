const mongoose = require("mongoose")

const productos = new mongoose.Schema({  
    tipoCredito:{
        type: String, 
        required: true,
        minLength:4,
        maxLength:100,
    },
    monto:{
        type: Number,
        required:true,
        minLength:5,
        maxLength:100,
    },
    interes:{
        type: Number,
        required: true,        
    },
    numPagos:{
        type: Number,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    montoPagos:{
        type: Number,
        required:true,
        minLength:5,
        maxLength:100,
    },

    ctedectes:{
            type: mongoose.Schema.Types.ObjectId,
            required:false,
            ref:"ctesdeCtes",
        },
    avalcte:{
            type: mongoose.Schema.Types.ObjectId,
            required:false,
            ref:"avalCtes",
        },
    
    fechaInicio:{
        type: String,
        required: true,        
    },
    fechaPagos:{
        type: String,
        required: true,
    },
    fechaFin:{
        type: String,
        required:false,
    },
    createAt:{
        type: Date,
        default: new Date(),
    },
});
module.exports = mongoose.model("productosctes", productos);  //exportamos el modelo para poder usarlo en otros archivos
