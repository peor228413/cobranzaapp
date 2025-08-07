const express = require("express");
const createError = require("http-errors");

const clientesUsecases = require("../usecases/clientes.usecases");
const auth= require("../middlewares/auth");
const router = express.Router();

//Crear un usuario
router.post("/",async (request, response)=>{
    try {
        const clienteData = request.body;
        const newcliente = await clientesUsecases.create(clienteData);
        
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
router.get("/", auth, async (request, response) => {
  try {
    const cliente = await clientesUsecases.getAll();

    response.json({
      success: true,
      message: "Todos los clientes",
      data: { cliente },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});//Obtener un usuario por id
router.get("/:id",auth,  async (request, response)=>{
    try {
        const id = request.params.id;
        const cliente = await clientesUsecases.getbyId(id)

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

        const cliente = await clientesUsecases.updateById(id, clienteData);

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
        const clienteDeleted = await clientesUsecases.deleteById(id);

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

router.post("/signup", async (request, response)=>{
    try {
        const data = request.body;
        const cliente = clientesUsecases.signUp(data);

        response.json({
            success : true,
            message: "Cliente creado",
            data: {cliente},

        })
    } catch (error) {
        response.status (error.status || 500);
        response.json({
            success: false,
            message: error.message,
        })
    }
})

router.post("/login", async (request, response)=>{
    try {
         const data = request.body;
        const token = await clientesUsecases.login(data)

        response.json({
            success : true,
            message: "Cliente Logeado",
            data:{token},

        })
    } catch (error) {
        response.status (error.status || 500);
        response.json({
            success: false,
            message: error.message,
        });        
    }
});

module.exports = router