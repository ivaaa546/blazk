require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// Ruta de prueba general para verificar la API
app.get("/api", (req, res) => {
  res.json({ mensaje: "API de Blakz funcionando con MySQL" });
});

// Rutas de usuarios (esta es la ruta que creamos antes)
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

//Ruta para articulos
const rutaArticulos = require("./routes/articulos");
app.use("/api/articulos", rutaArticulos);

const categoriasRoutes = require("./routes/categorias");
app.use("/api/categorias", categoriasRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
