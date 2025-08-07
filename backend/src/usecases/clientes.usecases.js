const clientes = require("../models/model.clientes");
const createError = require("http-errors");
const encryption = require("../lib/encription");
const jwt = require("../lib/jwt");

// validar usuario

async function login (data){
    const cliente = await clientes.findOne({email: data.email}).select("+password");

    if(!cliente){
        throw createError(401, "Usuario no encontrado");
    }

    const isValidPassword = encryption.compare(data.password, cliente.password);

    if(!isValidPassword){
        throw createError(401, "Contraseña invalida");
    } 

    const token = jwt.sign({id: cliente.id})

    return token;
} 

// Autenticar el cliente

async function signUp(data){

    const clienteFound = await clientes.findOne({email:data.email});
        if(clienteFound){
            throw createError(409, "Cliente ya existe")
        }

        if (!data.password){
            throw createError(400, "La contraseña es requerida")
        }

        if (data.password.length < 8){
            throw createError(400, "La contraseña debe tener al menos 8 caracteres")
        }
        const password =  encryption.encript(data.password);
        data.password = password;
        const nuevoCliente = clientes.create(data)
        console.log(nuevoCliente)

        return nuevoCliente;


}



// Creacion de un nuevo cliente

async function create(data){
     const nuevoCliente = await clientes.create(data);
     return nuevoCliente;
}

// Obtener todos los clientes registrados

async function getAll(){
    const clienteAll = await clientes.find({});
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
    deleteById,
    signUp,
    login,
}

