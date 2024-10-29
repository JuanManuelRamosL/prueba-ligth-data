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
  const { nombre, email, telefono, direccion } = req.body;
  // Validar si faltan campos requeridos
/*   if (!nombre || !email || !telefono || !direccion) {
    return res.status(400).json({ error: 'Todos los campos (nombre, email, telefono, direccion) son requeridos' });
  } */
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
    res.json(clienteEliminado);
  }
};
