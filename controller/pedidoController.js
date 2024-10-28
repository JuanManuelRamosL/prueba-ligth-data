const Pedido = require('../models/pedidoModel');
const Cliente = require('../models/cliente');
const Item = require('../models/itemModel');

// Crear un pedido
exports.createPedido = (req, res) => {
  const { clienteId, fecha, items } = req.body;

  // Validación de campos requeridos
  if (!clienteId || !fecha || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Todos los campos (clienteId, fecha, items) son requeridos y items debe ser una lista' });
  }

  if (items.length === 0) {
    return res.status(400).json({ error: 'El array items no puede estar vacío' });
  }

  // Verificar existencia del cliente en la base de datos
  const cliente = Cliente.getById(clienteId); // Cambia esto según la lógica de obtención de clientes en tu base de datos
  if (!cliente) {
    return res.status(400).json({ error: 'El cliente con el ID proporcionado no existe' });
  }

  // Verificar que cada item exista en la base de datos
  for (const item of items) {
    const itemData = Item.getById(item.itemId); // Cambia esto según la lógica de obtención de items en tu base de datos
    if (!itemData) {
      return res.status(400).json({ error: `El item con ID ${item.itemId} no existe` });
    }
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
