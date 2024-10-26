const Pedido = require('../models/pedidoModel');

// Crear un pedido
exports.createPedido = (req, res) => {
  const { clienteId, fecha, items } = req.body;

  // Validación de campos requeridos
  if (!clienteId || !fecha || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Todos los campos (clienteId, fecha, items) son requeridos y items debe ser una lista no vacía' });
  }

  const nuevoPedido = Pedido.create(req.body);
  res.status(201).json(nuevoPedido);
};

// Listar todos los pedidos
exports.getPedidos = (req, res) => {
  res.json(Pedido.getAll());
};

// Obtener un pedido específico por ID
exports.getPedidoById = (req, res) => {
  const pedido = Pedido.getById(parseInt(req.params.id));
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
};

// Eliminar un pedido por ID
exports.deletePedido = (req, res) => {
  const deleted = Pedido.delete(parseInt(req.params.id));
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
};
