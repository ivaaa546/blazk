const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  // Verificar si el token está en el encabezado de autorización
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Agregar los datos del usuario al objeto req
    next(); // Continuar con la ejecución de la ruta
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
};

module.exports = verificarToken;
