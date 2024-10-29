const Item = require('../models/itemModel');

// Crear un item
exports.createItem = (req, res) => {
  const newItem = Item.create(req.body);
  res.status(201).json(newItem);
};

// Listar todos los items
exports.getItems = (req, res) => {
  res.json(Item.getAll());
};

// Obtener un item específico por ID
exports.getItemById = (req, res) => {
  const item = Item.getById(parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item no encontrado' });
  }
};

// Modificar un item por ID
exports.updateItem = (req, res) => {
  const updatedItem = Item.update(parseInt(req.params.id), req.body);
  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404).json({ error: 'Item no encontrado' });
  }
};

// Eliminar un item por ID
exports.deleteItem = (req, res) => {
  const deleted = Item.delete(parseInt(req.params.id));
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Item no encontrado' });
  }
};
