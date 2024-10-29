const express = require('express');
const clienteController = require('../controller/clienteController');
const { validateClienteData } = require('../midelwares/validacionCliente');
const router = express.Router();

router.get('/', clienteController.getClientes);
router.get('/:id', clienteController.getClienteById);
router.post('/', validateClienteData,clienteController.createCliente);
router.put('/:id',validateClienteData, clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
