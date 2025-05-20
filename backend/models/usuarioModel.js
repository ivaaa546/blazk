const db = require("../config/db");

const UsuarioModel = {
  obtenerTodos: (callback) => {
    db.query("SELECT * FROM usuarios", (err, resultados) => {
      if (err) return callback(err);
      callback(null, resultados);
    });
  },

  crear: (nombre, correo, contraseñaHash, callback) => {
    const sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
    db.query(sql, [nombre, correo, contraseñaHash], (err, resultado) => {
      if (err) return callback(err);
      callback(null, resultado.insertId);
    });
  },

  actualizar: (id, nombre, correo, contraseña, callback) => {
    const sql = "UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ? WHERE id = ?";
    db.query(sql, [nombre, correo, contraseña, id], (err, resultado) => {
      if (err) return callback(err);
      callback(null, resultado);
    });
  },

  eliminar: (id, callback) => {
    db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, resultado) => {
      if (err) return callback(err);
      callback(null, resultado);
    });
  },

  obtenerPorCorreo: (correo, callback) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    db.query(sql, [correo], (err, resultados) => {
      if (err) return callback(err);
      callback(null, resultados[0]);
    });
  }
};

module.exports = UsuarioModel;

