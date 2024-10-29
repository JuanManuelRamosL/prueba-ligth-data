const Pedido = require('../models/pedidoModel');
const Cliente = require('../models/cliente');
const Item = require('../models/itemModel');

// Crear un pedido
exports.createPedido = (req, res) => {
  const { clienteId, fecha, items } = req.body;
  
  // Verificar existencia del cliente en la base de datos
  const cliente = Cliente.getById(clienteId);
  if (!cliente) {
    return res.status(400).json({ error: 'El cliente con el ID proporcionado no existe' });
  }

  // Verificar que cada item exista en la base de datos
  for (const itemPedido of items) {
    const item = Item.getById(itemPedido.itemId);
    if (!item) {
      return res.status(404).json({ error: `Item con ID ${itemPedido.itemId} no encontrado` });
    }

    if (!item.habilitado) {
      return res.status(400).json({ error: `El item con ID ${itemPedido.itemId} no está habilitado y no puede ser agregado al pedido.` });
    }

    if (item.stock < itemPedido.cantidad) {
      return res.status(400).json({ error: `Stock insuficiente para el item ID ${itemPedido.itemId}. Stock disponible: ${item.stock}` });
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
