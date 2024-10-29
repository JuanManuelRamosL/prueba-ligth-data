const Cliente = require('../models/cliente');

exports.getClientes = (req, res) => {
  res.json(Cliente.getAll());
};

exports.getClienteById = (req, res) => {
  const cliente = Cliente.getById(parseInt(req.params.id));
  if (!cliente) {
    res.status(404).json({ error: 'Cliente no encontrado' });
  } else {
    res.json(cliente);
  }
};

exports.createCliente = (req, res) => {
  const nuevoCliente = Cliente.create(req.body);
  res.status(201).json(nuevoCliente);
};

exports.updateCliente = (req, res) => {
  const clienteActualizado = Cliente.update(parseInt(req.params.id), req.body);
  if (!clienteActualizado) {
    res.status(404).json({ error: 'Cliente no encontrado' });
  } else {
    res.json(clienteActualizado);
  }
};

exports.deleteCliente = (req, res) => {
  const clienteEliminado = Cliente.delete(parseInt(req.params.id));
  if (!clienteEliminado) {
    res.status(404).json({ error: 'Cliente no encontrado' });
  } else {
    res.status(200).json({ message: 'Cliente eliminado' });
  }
};
