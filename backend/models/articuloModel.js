const db = require("../config/db");

const ArticuloModel = {
  obtenerTodos: (callback) => {
    db.query("SELECT * FROM articulos", callback);
  },

  obtenerPorId: (id, callback) => {
    db.query("SELECT * FROM articulos WHERE id = ?", [id], callback);
  },

  crear: (titulo, contenido, categoria_id, callback) => {
    const sql = "INSERT INTO articulos (titulo, contenido, categoria_id) VALUES (?, ?, ?)";
    db.query(sql, [titulo, contenido, categoria_id], callback);
  },

  eliminar: (id, callback) => {
    db.query("DELETE FROM articulos WHERE id = ?", [id], callback);
  }
};

module.exports = ArticuloModel;
