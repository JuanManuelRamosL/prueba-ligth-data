// Middleware para validar los datos de creación y actualización de un cliente
const validateClienteData = (req, res, next) => {
    const { nombre, email, telefono, direccion } = req.body;
  
    if (!nombre || !email || !telefono || !direccion) {
      return res.status(400).json({ error: 'Todos los campos (nombre, email, telefono, direccion) son requeridos' });
    }
  
    next(); // Continua al controlador si la validación es exitosa
  };
  
  module.exports = { validateClienteData };
  