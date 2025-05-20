const ArticuloModel = require("../models/articuloModel");

// Obtener todos los artículos
exports.obtenerArticulos = (req, res) => {
  ArticuloModel.obtenerTodos((err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener artículos" });
    res.json(resultados);
  });
};

// Obtener un artículo por ID
exports.obtenerArticuloPorId = (req, res) => {
  const { id } = req.params;
  ArticuloModel.obtenerPorId(id, (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener el artículo" });
    if (resultados.length === 0) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json(resultados[0]);
  });
};

// Crear un artículo
exports.crearArticulo = (req, res) => {
  const { titulo, contenido, categoria_id } = req.body;
  ArticuloModel.crear(titulo, contenido, categoria_id, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al crear artículo" });
    res.status(201).json({ mensaje: "Artículo creado", id: result.insertId });
  });
};

// Eliminar un artículo
exports.eliminarArticulo = (req, res) => {
  const { id } = req.params;
  ArticuloModel.eliminar(id, (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar artículo" });
    res.json({ mensaje: "Artículo eliminado" });
  });
};
