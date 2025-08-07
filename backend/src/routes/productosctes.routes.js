const express = require("express");
const createError = require("http-errors");

const productosctes = require("../usecases/productosctes.usescases")
const router = express.Router();

//Crear un usuario
router.post("/", async (request, response)=>{
    try {
        const producto = request.body;
        const newproducto = await productosctes.create(producto);
        
        response.json({
            success: true,
            message: "Cliente creado con exito",
            data: {cliente: newproducto},
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
    const producto = await productosctes.getAll();

    response.json({
      success: true,
      message: "Todos los clientes",
      data: { producto },
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
        const producto = await productosctes.getbyId(id)

        if(!producto){
            throw createError(404, "Cliente not found");
        }
        
        response.json({
            success: true,
            message: "Cliente by Id",
            data: {producto},
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
        const producto = request.body;

        const productoUpdated = await productosctes.updateById(id, producto);

        response.json({
            success: true,
            message: "Producto actualizado",
            data: {productoUpdated},
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
        const productoDeleted = await productosctes.deleteById(id);

        response.json({
            success: true,
            message: "Producto borrado",
            data: {producto: productoDeleted},
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