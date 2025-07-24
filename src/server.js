const express = require("express");
const app = express();

const clientes = require ("./routes/clientes.routes");
const ctedeCtes = require("./routes/ctesdeCte.route");
const avalCtes = require("./routes/avalctes.routes");
const productosCtes = require("./routes/productosctes.routes");

app.use(express.json());

app.use("/clientes",clientes); 
app.use("/ctedectes",ctedeCtes);
app.use("/avalctes",avalCtes);
app.use("/productoctes", productosCtes);


app.get("/", (request, response)=>{
     response.json({
         success: true,
         message: "API Cobranza"
     })
})

module.exports = app