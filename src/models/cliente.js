let clientes = []; // Array para almacenar los datos en memoria
let idCounter = 1; 

const Cliente = {
  getAll: () => clientes,

  getById: (id) => clientes.find(cliente => cliente.id === id),

  create: (data) => {
    const nuevoCliente = { id: idCounter++, ...data };
    clientes.push(nuevoCliente);
    return nuevoCliente;
  },

  update: (id, data) => {
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    if (clienteIndex === -1) return null;
    clientes[clienteIndex] = { id, ...data };
    return clientes[clienteIndex];
  },

  delete: (id) => {
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    if (clienteIndex === -1) return null;
    const clienteEliminado = clientes.splice(clienteIndex, 1);
    return clienteEliminado[0];
  }
};

module.exports = Cliente;
