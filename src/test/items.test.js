const request = require('supertest');
const app = require('../../app');
const Item = require('../models/itemModel');

// Mock de datos para los tests
const mockItemData = {
  codigo: 'A001',
  descripcion: 'Item de prueba',
  precio: 100,
  habilitado: true,
  stock: 50
};

describe('API de Items', () => {

  // Test para crear un item
  test('POST /items crea un nuevo item', async () => {
    const response = await request(app).post('/items').send(mockItemData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(mockItemData);
  });

  // Test para listar todos los items
  test('GET /items devuelve todos los items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test para obtener un item específico por ID
  test('GET /items/:id devuelve un item específico', async () => {
    const newItem = Item.create(mockItemData); // Crear un nuevo item para obtener su ID
    const response = await request(app).get(`/items/${newItem.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(newItem);
  });

  // Test para eliminar un item
  test('DELETE /items/:id elimina un item', async () => {
    const newItem = Item.create(mockItemData); // Crear un item para eliminar
    const response = await request(app).delete(`/items/${newItem.id}`);
    expect(response.status).toBe(204); // Sin contenido
  });

  // Test para obtener un item no encontrado (404)
  test('GET /items/:id devuelve 404 si no se encuentra el item', async () => {
    const response = await request(app).get('/items/9999'); // ID que no existe
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item no encontrado' });
  });

  // Test para eliminar un item no encontrado (404)
  test('DELETE /items/:id devuelve 404 si no se encuentra el item', async () => {
    const response = await request(app).delete('/items/9999'); // ID que no existe
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item no encontrado' });
  });
});
