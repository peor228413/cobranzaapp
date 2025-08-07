const createError = require("http-errors");
const avalCtes = require("../models/model.avalctes");

// Creacion de un nuevo cliente

async function create(data){
     const nuevoCliente = await avalCtes.create(data);
     return nuevoCliente;
}

// Obtener todos los clientes registrados

async function getAll(){
    const clienteAll = await avalCtes.find({});
    console.log(clienteAll);
    return clienteAll;
}

// Obtener un cliente por id especifico
async function getbyId(id){
    const cliente = await avalCtes.findById(id);
    return cliente;
}

// Modificar cliente por id especifico
 async function updateById(id, newData) {
    const clienteFound = await avalCtes.findById(id);
    console.log(clienteFound)
    if(!clienteFound){
        throw createError(401, "Cliente no encontrado");
    }

    const clienteUpdated = await avalCtes.findByIdAndUpdate(id, newData, {new: true});
    return clienteUpdated;
    
 }

// Eliminar cliente por id especifico
async function deleteById(id){
    const clienteFound = await avalCtes.findById(id)
    if(!clienteFound){
        throw createError(401, "Cliente not Found");
    }
    const cliente = avalCtes.findByIdAndDelete(id);
    return cliente;
}



module.exports={
    create,
    getAll,
    getbyId,
    updateById, 
    deleteById
}

