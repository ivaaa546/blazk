const db = require("../config/db");
const CategoriaModel = {
obtenerTodas: (callback) => {
db.query("SELECT * FROM categorias", callback);
},

crear: (nombre, callback) => {
db.query("INSERT INTO categorias (nombre) VALUES (?)", [nombre], callback);
},

editar: (id, nombre, callback) => {
db.query("UPDATE categorias SET nombre = ? WHERE id = ?", [nombre, id], callback);
},

eliminar: (id, callback) => {
db.query("DELETE FROM categorias WHERE id = ?", [id], callback);
}
};

module.exports = CategoriaModel;