const validarPedido = (req, res, next) => {
    const { clienteId, fecha, items } = req.body;  
    if (!clienteId || !fecha || !items || !Array.isArray(items)) {
      return res.status(400).json({
        error: 'Todos los campos (clienteId, fecha, items) son requeridos, y items debe ser una lista'
      });
    }
    if (items.length === 0) {
      return res.status(400).json({ error: 'El array items no puede estar vacío' });
    }
    next();
  };
  
  module.exports = validarPedido;
  