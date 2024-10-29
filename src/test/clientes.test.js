const request = require('supertest');
const express = require('express');
const clienteRoutes = require('../routes/clienteRoutes');
const Cliente = require('../models/cliente');

// Configuración de la app Express para pruebas
const app = express();
app.use(express.json());
app.use('/clientes', clienteRoutes);

// Mock de métodos en el modelo Cliente
jest.mock('../models/cliente');

// Pruebas para los endpoints de clientes
describe('API de Clientes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test para obtener todos los clientes
  test('GET /clientes devuelve todos los clientes', async () => {
    const mockClientes = [{ id: 1, nombre: 'Juan', email: 'juan@mail.com' }];
    Cliente.getAll.mockReturnValue(mockClientes);

    const response = await request(app).get('/clientes');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockClientes);
  });

  // Test para obtener un cliente por ID
  test('GET /clientes/:id devuelve un cliente específico', async () => {
    const clienteId = 1;
    const mockCliente = { id: clienteId, nombre: 'Juan', email: 'juan@mail.com' };
    Cliente.getById.mockReturnValue(mockCliente);

    const response = await request(app).get(`/clientes/${clienteId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCliente);
  });

  // Test para crear un nuevo cliente
  test('POST /clientes crea un nuevo cliente', async () => {
    const nuevoCliente = { nombre: 'Ana', email: 'ana@mail.com', telefono: '123456789', direccion: 'Calle 123' };
    const mockClienteCreado = { id: 2, ...nuevoCliente };
    Cliente.create.mockReturnValue(mockClienteCreado);

    const response = await request(app).post('/clientes').send(nuevoCliente);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockClienteCreado);
  });

  // Test para eliminar un cliente
  test('DELETE /clientes/:id elimina un cliente', async () => {
    const clienteId = 1;
    Cliente.delete.mockReturnValue(true);

    const response = await request(app).delete(`/clientes/${clienteId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Cliente eliminado' });
  });

  // Test para cliente no encontrado en getById y delete
  test('GET /clientes/:id devuelve 404 si no se encuentra el cliente', async () => {
    Cliente.getById.mockReturnValue(null);

    const response = await request(app).get('/clientes/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Cliente no encontrado' });
  });

  test('DELETE /clientes/:id devuelve 404 si no se encuentra el cliente', async () => {
    Cliente.delete.mockReturnValue(null);

    const response = await request(app).delete('/clientes/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Cliente no encontrado' });
  });
});
