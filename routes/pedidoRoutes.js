const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedidoController');
const validarPedido = require('../midelwares/validacionPedido');

router.post('/', validarPedido,pedidoController.createPedido);
router.get('/', pedidoController.getPedidos);
router.get('/:id', pedidoController.getPedidoById);
router.delete('/:id', pedidoController.deletePedido);

module.exports = router;
