const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");
const verificarToken = require("../middleware/authMiddleware");

router.get("/",verificarToken, categoriaController.obtenerCategorias);
router.post("/", verificarToken,categoriaController.crearCategoria);
router.put("/:id",verificarToken, categoriaController.editarCategoria);
router.delete("/:id", verificarToken,categoriaController.eliminarCategoria);

module.exports = router;
