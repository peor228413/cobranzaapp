const createError = require("http-errors");
const productosCtes = require("../models/model.productosctes");

// Creacion de un nuevo cliente

async function create(data){
     const nuevoProducto= await productosCtes.create(data);
     return nuevoProducto;
}

// Obtener todos los clientes registrados

async function getAll(){
    const productosTotales = await productosCtes.find()
                        .select('nombre direccion')                   
 
    return productosTotales;
}

// Obtener un cliente por id especifico
async function getbyId(id){
    const productoId = await productosCtes.findById(id);
    return productoId;
}

// Modificar cliente por id especifico
 async function updateById(id, newData) {
    const productoFound = await productosCtes.findById(id);
    if(!productoFound){
        throw createError(401, "Cliente no encontrado");
    }

    const productoUpdated = await productosCtes.findByIdAndUpdate(id, newData, {new: true});
    return productoUpdated;
    
 }

// Eliminar cliente por id especifico
async function deleteById(id){
    const productoFound = await productosCtes.findById(id)
    if(!productoFound){
        throw createError(401, "Cliente not Found");
    }
    const productoUpdated = productosCtes.findByIdAndDelete(id);
    return productoUpdated;
}



module.exports={
    create,
    getAll,
    getbyId,
    updateById, 
    deleteById
}

