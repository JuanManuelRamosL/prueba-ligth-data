let items = [];
let idCounter = 1;

class Item {
  constructor({ codigo, descripcion, precio, habilitado, stock }) {
    this.id = idCounter++;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.habilitado = habilitado;
    this.stock = stock;
  }

  static create(data) {
    const newItem = new Item(data);
    items.push(newItem);
    return newItem;
  }

  static getAll() {
    return items;
  }

  static getById(id) {
    return items.find(item => item.id === id);
  }

  static update(id, data) {
    const item = Item.getById(id);
    if (item) {
      Object.assign(item, data);
    }
    return item;
  }

  static delete(id) {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = Item;
