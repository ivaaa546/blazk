const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usuarioController = require("../controllers/usuarioController");
const verificarToken = require("../middleware/authMiddleware");


// Obtener usuarios
router.get("/", verificarToken, usuarioController.obtenerUsuarios);

// Crear usuario
router.post(
  "/",
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("correo").isEmail().withMessage("Correo no válido"),
    body("contraseña").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
  ],
  usuarioController.crearUsuario
);

// Ruta para login
router.post("/login", verificarToken, usuarioController.loginUsuario);

// Actualizar y eliminar
router.put("/:id",verificarToken, usuarioController.editarUsuario);

//Eliminar
router.delete("/:id", verificarToken,usuarioController.eliminarUsuario);

module.exports = router;

/*const { body } = require("express-validator");
const {
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  loginUsuario // Asegúrate de importar esta función
} = require("../controllers/usuarioController");*/