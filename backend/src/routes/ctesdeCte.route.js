const express = require("express");
const createError = require("http-errors");

const ctedectesUsecases = require("../usecases/ctesdecte.usecases")
const router = express.Router();

//Crear un usuario
router.post("/", async (request, response)=>{
    try {
        const clienteData = request.body;
        const newcliente = await ctedectesUsecases.create(clienteData);
        
        response.json({
            success: true,
            message: "Cliente creado con exito",
            data: {cliente: newcliente},
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success:false,
            message: error.message,
        })
    }
})

//Obtener todos los usuarios
router.get("/", async (request, response) => {
  try {
    const clientes = await ctedectesUsecases.getAll()    
     console.log (clientes)
    response.json({
      success: true,
      message: "Todos los clientes",
      data: { clientes },
    
    });
    
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});//Obtener un usuario por id

router.get("/:id", async (request, response)=>{
    try {
        const id = request.params.id;
        const cliente = await ctedectesUsecases.getbyId(id)

        if(!cliente){
            throw createError(404, "Cliente not found");
        }      
        response.json({
            success: true,
            message: "Cliente by Id",
            data: {cliente},
        });
         
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            message: error.message,
        });
    }
})

//Actualizar un usuario
router.patch("/:id", async (request, response)=>{
    try {
        const id = request.body.id;
        const clienteData = request.body;

        const cliente = await ctedectesUsecases.updateById(id, clienteData);

        response.json({
            success: true,
            message: "Cliente updated",
            data: {cliente},
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            message: error.message,
        });
    }
})

//Eliminar un usuario

router.delete("/:id", async (request, response)=>{
    try {
        const id = request.params.id;
        const clienteDeleted = await ctedectesUsecases.deleteById(id);

        response.json({
            success: true,
            message: "Cliente deleted",
            data: {cliente: clienteDeleted},
        });
    } catch (error) {
        response.status (error.status || 500);
        response.json({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router