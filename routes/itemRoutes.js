const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const { validarItem } = require('../midelwares/validacionItem');

router.post('/', validarItem,itemController.createItem);
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.put('/:id', validarItem,itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
