const modelClientes = require("../models/model.clientes");
const ctedectes = require("../models/model.ctesdecte");
const createError = require("http-errors");



// Creacion de un nuevo cliente

async function create(data){
     const nuevoCliente = await ctedectes.create(data);
     return nuevoCliente;
}

// Obtener todos los clientes registrados

async function getAll(){
    const id = '689537954c8b918ae5b9734c'
    const clienteAll = await ctedectes.find()
                        .where('clientes').equals(id)
                        .select('nombre direccion')                   
    return clienteAll;
}

// Obtener un cliente por id especifico
async function getbyId(id){
    const cliente = await ctedectes.findById(id);
    return cliente;
}

// Modificar cliente por id especifico
 async function updateById(id, newData) {
    const clienteFound = await ctedectes.findById(id);

    if(!clienteFound){
        throw createError(401, "Cliente not found");
    }

    const clienteUpdated = await ctedectes.findByIdAndUpdate(id, newData, {new: true});
    return clienteUpdated;
    
 }

// Eliminar cliente por id especifico
async function deleteById(id){
    const clienteFound = await ctedectes.findById(id)
    if(!clienteFound){
        throw createError(401, "Cliente not Found");
    }
    const cliente = ctedectes.findByIdAndDelete(id);
    return cliente;
}



module.exports={
    create,
    getAll,
    getbyId,
    updateById, 
    deleteById
}

