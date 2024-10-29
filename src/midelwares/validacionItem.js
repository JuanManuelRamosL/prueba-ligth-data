function validarItem(req, res, next) {
    const { codigo, descripcion, precio, habilitado, stock } = req.body;
  
    if (!codigo || !descripcion || precio == null || habilitado == null || stock == null) {
      return res.status(400).json({ error: 'Todos los campos (codigo, descripcion, precio, habilitado, stock) son requeridos' });
    }
  
    if (typeof precio !== 'number' || typeof stock !== 'number' || typeof habilitado !== 'boolean') {
      return res.status(400).json({ error: 'Formato de datos incorrecto: precio y stock deben ser números, habilitado debe ser booleano' });
    }
  
    next(); 
  }
  
  module.exports = { validarItem };
  