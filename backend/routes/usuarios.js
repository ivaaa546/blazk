const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usuarioController = require("../controllers/usuarioController");

// Obtener usuarios
router.get("/", usuarioController.obtenerUsuarios);

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
router.post("/login", usuarioController.loginUsuario);

// Actualizar y eliminar
router.put("/:id", usuarioController.editarUsuario);

//Eliminar
router.delete("/:id", usuarioController.eliminarUsuario);

module.exports = router;

/*const { body } = require("express-validator");
const {
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  loginUsuario // Asegúrate de importar esta función
} = require("../controllers/usuarioController");*/