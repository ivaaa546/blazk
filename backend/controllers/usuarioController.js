const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsuarioModel = require("../models/usuarioModel");

// Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
  UsuarioModel.obtenerTodos((err, usuarios) => {
    if (err) return res.status(500).json({ error: "Error al obtener usuarios" });
    res.json(usuarios);
  });
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const contraseñaHash = await bcrypt.hash(contraseña, 10);
    UsuarioModel.crear(nombre, correo, contraseñaHash, (err, insertId) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "El correo ya está registrado" });
        }
        return res.status(500).json({ error: "Error al crear el usuario" });
      }
      res.json({ mensaje: "Usuario creado correctamente", id: insertId });
    });
  } catch (err) {
    res.status(500).json({ error: "Error al encriptar la contraseña" });
  }
};

// Editar un usuario
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contraseña } = req.body;

  try {
    const contraseñaHash = await bcrypt.hash(contraseña, 10);
    UsuarioModel.actualizar(id, nombre, correo, contraseñaHash, (err, resultado) => {
      if (err) return res.status(500).json({ error: "Error al actualizar el usuario" });
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json({ mensaje: "Usuario actualizado correctamente" });
    });
  } catch (err) {
    res.status(500).json({ error: "Error al encriptar la contraseña" });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = (req, res) => {
  const { id } = req.params;

  UsuarioModel.eliminar(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al eliminar el usuario" });
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario eliminado correctamente" });
  });
};

// Login de usuario
exports.loginUsuario = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: "Correo y contraseña requeridos" });
  }

  UsuarioModel.obtenerPorCorreo(correo, async (err, usuario) => {
    if (err) return res.status(500).json({ error: "Error al buscar usuario" });
    if (!usuario) return res.status(401).json({ error: "Credenciales inválidas" });

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    res.json({ mensaje: "Login exitoso", token });
  });
};



