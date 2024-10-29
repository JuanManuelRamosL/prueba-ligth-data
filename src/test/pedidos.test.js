const request = require('supertest');
const app = require('../../app');
const Pedido = require('../models/pedidoModel');
const Cliente = require('../models/cliente');
const Item = require('../models/itemModel');

// Mock de datos para los tests
const mockCliente = { id: 1, nombre: 'Cliente de prueba' }; // Cliente de prueba
const mockItem = { id: 1, codigo: 'A001', descripcion: 'Item de prueba', precio: 100, habilitado: true, stock: 50 }; // Item de prueba
const mockPedidoData = {
  clienteId: mockCliente.id,
  fecha: new Date().toISOString(),
  items: [{ itemId: mockItem.id, cantidad: 1 }]
};

beforeAll(() => {
  Cliente.create(mockCliente); 
  Item.create(mockItem); 
});

describe('API de Pedidos', () => {

  // Test para crear un pedido
  test('POST /pedidos crea un nuevo pedido', async () => {
    const response = await request(app).post('/pedidos').send(mockPedidoData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(mockPedidoData);
  });

  // Test para listar todos los pedidos
  test('GET /pedidos devuelve todos los pedidos', async () => {
    const response = await request(app).get('/pedidos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test para obtener un pedido específico por ID
  test('GET /pedidos/:id devuelve un pedido específico', async () => {
    const nuevoPedido = Pedido.create(mockPedidoData); // Crear un nuevo pedido para obtener su ID
    const response = await request(app).get(`/pedidos/${nuevoPedido.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(nuevoPedido);
  });

  // Test para eliminar un pedido
  test('DELETE /pedidos/:id elimina un pedido', async () => {
    const nuevoPedido = Pedido.create(mockPedidoData); // Crear un pedido para eliminar
    const response = await request(app).delete(`/pedidos/${nuevoPedido.id}`);
    expect(response.status).toBe(204); // Sin contenido
  });

  // Test para obtener un pedido no encontrado (404)
  test('GET /pedidos/:id devuelve 404 si no se encuentra el pedido', async () => {
    const response = await request(app).get('/pedidos/9999'); // ID que no existe
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Pedido no encontrado' });
  });

  // Test para eliminar un pedido no encontrado (404)
  test('DELETE /pedidos/:id devuelve 404 si no se encuentra el pedido', async () => {
    const response = await request(app).delete('/pedidos/9999'); // ID que no existe
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Pedido no encontrado' });
  });

  // Test para crear un pedido con cliente inexistente
  test('POST /pedidos devuelve 400 si el cliente no existe', async () => {
    const invalidPedidoData = { ...mockPedidoData, clienteId: 9999 }; // ID de cliente que no existe
    const response = await request(app).post('/pedidos').send(invalidPedidoData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'El cliente con el ID proporcionado no existe' });
  });

});
