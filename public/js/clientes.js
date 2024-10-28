document.addEventListener('DOMContentLoaded', () => {
  // Crear cliente
  document.getElementById('cliente-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('cliente-nombre').value;
    const email = document.getElementById('cliente-email').value;
    const telefono = document.getElementById('cliente-telefono').value;
    const direccion = document.getElementById('cliente-direccion').value;

    const response = await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, telefono, direccion }),
    });
    
    if (response.ok) {
      alert('Cliente creado con éxito');
      cargarClientes();
    } else {
      alert('Error al crear el cliente');
    }
  });

  // Cargar clientes
  const cargarClientes = async () => {
    const response = await fetch('http://localhost:3000/clientes');
    const clientes = await response.json();
  
    const tbody = document.querySelector('#clientes-table tbody');
    tbody.innerHTML = '';
  
    clientes.forEach(cliente => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.direccion}</td>
        <td>
        </td>
      `;
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', () => editarCliente(cliente.id));
      row.children[5].appendChild(editButton);
  
      // Botón Eliminar
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', () => eliminarCliente(cliente.id));
      row.children[5].appendChild(deleteButton);
      tbody.appendChild(row);
    });
  };
  
  const eliminarCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        cargarClientes();
      } else {
        alert('Error al eliminar el cliente');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const editarCliente = (id) => {
    const nombre = prompt('Nuevo nombre:');
    const email = prompt('Nuevo email:');
    const telefono = prompt('Nuevo teléfono:');
    const direccion = prompt('Nueva dirección:');
  
    if (nombre && email && telefono && direccion) {
      actualizarCliente(id, { nombre, email, telefono, direccion });
    } else {
      alert('Todos los campos son requeridos');
    }
  };
  
  const actualizarCliente = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        cargarClientes();
      } else {
        alert('Error al actualizar el cliente');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  cargarClientes(); // Cargar clientes al iniciar

  // Función para eliminar un item
  const eliminarItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        alert('Item eliminado con éxito');
        cargarItems(); // Vuelve a cargar los items después de eliminar uno
      } else {
        alert('Error al eliminar el item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para cargar items
  const cargarItems = async () => {
    const response = await fetch('http://localhost:3000/items');
    const items = await response.json();

    const tbody = document.querySelector('#items-table tbody');
    tbody.innerHTML = '';

    items.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.codigo}</td>
        <td>${item.descripcion}</td>
        <td>${item.precio}</td>
        <td>${item.stock}</td>
        <td>${item.habilitado ? 'Sí' : 'No'}</td>
        <td>
          <button class="editar-btn" data-id="${item.id}">Editar</button>
          <button class="eliminar-btn" data-id="${item.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Añadir eventos a los botones de editar y eliminar
    document.querySelectorAll('.editar-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        editarItem(id);
      });
    });
    document.querySelectorAll('.eliminar-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        eliminarItem(id);
      });
    });
  };

  // Función para editar un item
  const editarItem = async (id) => {
    const codigo = prompt('Nuevo código:');
    const descripcion = prompt('Nueva descripción:');
    const precio = parseFloat(prompt('Nuevo precio:'));
    const stock = parseInt(prompt('Nuevo stock:'));
    const habilitado = confirm('¿Habilitado?');

    if (codigo && descripcion && !isNaN(precio) && !isNaN(stock)) {
      const data = { codigo, descripcion, precio, stock, habilitado };
      
      try {
        const response = await fetch(`http://localhost:3000/items/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Item actualizado con éxito');
          cargarItems();
        } else {
          alert('Error al actualizar el item');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Todos los campos son requeridos');
    }
  };

  // Escuchar el evento submit del formulario y llamar a cargarItems después de crear el item
  document.getElementById('item-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const codigo = document.getElementById('item-codigo').value;
    const descripcion = document.getElementById('item-descripcion').value;
    const precio = parseFloat(document.getElementById('item-precio').value);
    const stock = parseInt(document.getElementById('item-stock').value);
    const habilitado = document.getElementById('item-habilitado').checked;
    
    const response = await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo, descripcion, precio, stock, habilitado }),
    });
    
    if (response.ok) {
      alert('Item creado con éxito');
      cargarItems();
    } else {
      alert('Error al crear el item');
    }
  });

  // Llamar a cargarItems al cargar la página
  cargarItems();
});
