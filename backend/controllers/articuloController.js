const db = require("../config/db");

// Obtener todos los artículos
exports.obtenerArticulos = (req, res) => {
  db.query("SELECT * FROM articulos", (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener artículos" });
    res.json(resultados);
  });
};

// Obtener un artículo por ID
exports.obtenerArticuloPorId = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM articulos WHERE id = ?", [id], (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al obtener el artículo" });
    if (resultado.length === 0) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json(resultado[0]); // Enviamos el primer (y único) resultado
  });
};

// Crear un artículo
exports.crearArticulo = (req, res) => {
  const { titulo, contenido, categoria_id } = req.body;

  const sql = "INSERT INTO articulos (titulo, contenido, categoria_id) VALUES (?, ?, ?)";
  db.query(sql, [titulo, contenido, categoria_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al crear artículo" });
    res.status(201).json({ mensaje: "Artículo creado", id: result.insertId });
  });
};

// Eliminar un artículo
exports.eliminarArticulo = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM articulos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar artículo" });
    res.json({ mensaje: "Artículo eliminado" });
  });
};
