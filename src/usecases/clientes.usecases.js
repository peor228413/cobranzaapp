const clientes = require("../models/model.clientes");
const createError = require("http-errors");


// Creacion de un nuevo cliente

async function create(data){
     const nuevoCliente = await clientes.create(data);
     return nuevoCliente;
}

// Obtener todos los clientes registrados

async function getAll(){
    const clienteAll = await clientes.find({});
    console.log(clienteAll);
    return clienteAll;
}

// Obtener un cliente por id especifico
async function getbyId(id){
    const cliente = await clientes.findById(id);
    return cliente;
}

// Modificar cliente por id especifico
 async function updateById(id, newData) {
    const clienteFound = await clientes.findById(id);

    if(!clienteFound){
        throw createError(401, "Cliente not found");
    }

    const clienteUpdated = await clientes.findByIdAndUpdate(id, newData, {new: true});
    return clienteUpdated;
    
 }

// Eliminar cliente por id especifico
async function deleteById(id){
    const clienteFound = await clientes.findById(id)
    if(!clienteFound){
        throw createError(401, "Cliente not Found");
    }
    const cliente = clientes.findByIdAndDelete(id);
    return cliente;
}



module.exports={
    create,
    getAll,
    getbyId,
    updateById, 
    deleteById
}

