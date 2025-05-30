// controllers/categoriaController.js
const CategoriaModel = require("../models/categoriaModel");

// Obtener todas las categorías
exports.obtenerCategorias = (req, res) => {
CategoriaModel.obtenerTodas((err, resultados) => {
if (err) return res.status(500).json({ error: "Error al obtener categorías" });
res.json(resultados);
});
};

// Crear una nueva categoría
exports.crearCategoria = (req, res) => {
const { nombre } = req.body;
if (!nombre) return res.status(400).json({ error: "El nombre es requerido" });

CategoriaModel.crear(nombre, (err, resultado) => {
if (err) return res.status(500).json({ error: "Error al crear la categoría" });
res.json({ mensaje: "Categoría creada", id: resultado.insertId });
});
};

// Editar una categoría
exports.editarCategoria = (req, res) => {
const { id } = req.params;
const { nombre } = req.body;

CategoriaModel.editar(id, nombre, (err, resultado) => {
if (err) return res.status(500).json({ error: "Error al editar la categoría" });
if (resultado.affectedRows === 0) return res.status(404).json({ error: "Categoría no encontrada" });
res.json({ mensaje: "Categoría actualizada correctamente" });
});
};

// Eliminar una categoría
exports.eliminarCategoria = (req, res) => {
const { id } = req.params;

CategoriaModel.eliminar(id, (err, resultado) => {
if (err) return res.status(500).json({ error: "Error al eliminar la categoría" });
if (resultado.affectedRows === 0) return res.status(404).json({ error: "Categoría no encontrada" });
res.json({ mensaje: "Categoría eliminada correctamente" });
});
};
