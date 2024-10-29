let pedidos = [];
let idCounter = 1;

class Pedido {
  constructor({ clienteId, fecha, items }) {
    this.id = idCounter++;
    this.clienteId = clienteId;
    this.fecha = fecha;
    this.items = items; // array de objetos { itemId, cantidad }
  }

  static create(data) {
    const nuevoPedido = new Pedido(data);
    pedidos.push(nuevoPedido);
    return nuevoPedido;
  }

  static getAll() {
    return pedidos;
  }

  static getById(id) {
    return pedidos.find(pedido => pedido.id === id);
  }

  static delete(id) {
    const index = pedidos.findIndex(pedido => pedido.id === id);
    if (index !== -1) {
      pedidos.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = Pedido;
