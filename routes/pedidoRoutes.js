const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedidoController');

router.post('/', pedidoController.createPedido);
router.get('/', pedidoController.getPedidos);
router.get('/:id', pedidoController.getPedidoById);
router.delete('/:id', pedidoController.deletePedido);

module.exports = router;
