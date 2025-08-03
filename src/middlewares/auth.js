const createError = require("http-errors");
const jwt = require("../lib/jwt");
const clientesUsecases = require("../usecases/clientes.usecases");
const modelProductosctes = require("../models/model.productosctes");

function auth(request, response, next){
     const authorization = request.headers.authorization;

     try {
      const token = authorization?.replace("Bearer", "");
     
      if (!token){
        throw createError(401, "Token es requerido en la autorizacion ");
     }
      const payload = jwt.verify(token);

      const cliente = clientesUsecases.getbyId(payload.id)
      request.cliente = cliente;

      next();
  
     } catch (error) {
       response.status(error.status || 401);
       
       response.json({ 
        success: false,
        message: error.message, 
       });
     }
}

module.exports = auth;
