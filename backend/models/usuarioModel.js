const db = require("../db");

const UsuarioModel = {
  obtenerTodos: (callback) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (err, resultados) => {
      if (err) return callback(err);
      callback(null, resultados);
    });
  },
};

module.exports = UsuarioModel;
