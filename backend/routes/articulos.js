const express = require("express");
const router = express.Router();
const articuloController = require("../controllers/articuloController");
const verificarToken = require("../middleware/authMiddleware");

// Obtener todos los artículos
router.get("/", articuloController.obtenerArticulos);

// Obtener un artículo por ID
router.get("/:id", verificarToken,articuloController.obtenerArticuloPorId);

// Crear un artículo
router.post("/", verificarToken, articuloController.crearArticulo);

// Eliminar un artículo
router.delete("/:id",verificarToken, articuloController.eliminarArticulo);

module.exports = router;
