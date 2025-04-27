const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
  db.query("SELECT * FROM usuarios", (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener usuarios" });
    res.json(resultados);
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
    const sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
    db.query(sql, [nombre, correo, contraseñaHash], (err, resultado) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "El correo ya está registrado" });
        }
        return res.status(500).json({ error: "Error al crear el usuario" });
      }
      res.json({ mensaje: "Usuario creado correctamente", id: resultado.insertId });
    });
  } catch (err) {
    res.status(500).json({ error: "Error al encriptar la contraseña" });
  }
};

// Editar un usuario
exports.editarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contraseña } = req.body;

  const sql = "UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ? WHERE id = ?";
  db.query(sql, [nombre, correo, contraseña, id], (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al actualizar el usuario" });
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario actualizado correctamente" });
  });
};

// Eliminar un usuario
exports.eliminarUsuario = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al eliminar el usuario" });
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario eliminado correctamente" });
  });
};

exports.loginUsuario = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: "Correo y contraseña requeridos" });
  }

  const sql = "SELECT * FROM usuarios WHERE correo = ?";
  db.query(sql, [correo], async (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al buscar usuario" });
    if (resultados.length === 0) return res.status(401).json({ error: "Credenciales inválidas" });

    const usuario = resultados[0];
    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    res.json({ mensaje: "Login exitoso", token });
  });
};



