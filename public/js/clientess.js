// clientes.js
document.addEventListener('DOMContentLoaded', () => {
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
          <td></td>
        `;
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editarCliente(cliente.id));
        row.children[5].appendChild(editButton);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => eliminarCliente(cliente.id));
        row.children[5].appendChild(deleteButton);
  
        tbody.appendChild(row);
      });
    };
  
    const eliminarCliente = async (id) => {
      const response = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) cargarClientes();
      else alert('Error al eliminar el cliente');
    };
  
    const editarCliente = (id) => {
      const nombre = prompt('Nuevo nombre:');
      const email = prompt('Nuevo email:');
      const telefono = prompt('Nuevo teléfono:');
      const direccion = prompt('Nueva dirección:');
  
      if (nombre && email && telefono && direccion) {
        actualizarCliente(id, { nombre, email, telefono, direccion });
      } else alert('Todos los campos son requeridos');
    };
  
    const actualizarCliente = async (id, data) => {
      const response = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      if (response.ok) cargarClientes();
      else alert('Error al actualizar el cliente');
    };
  
    cargarClientes();

    // clientes.js

    document.getElementById('buscar-cliente').addEventListener('input', (e) => {
      const searchTerm = e.target.value.trim();
      
      if (searchTerm) {
        buscarClientePorId(searchTerm);
      } else {
        cargarClientes(); // Si el campo está vacío, recarga todos los clientes
      }
    });
    
    const buscarClientePorId = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/clientes/${id}`);
        
        if (response.ok) {
          const cliente = await response.json();
          mostrarClienteEnTabla([cliente]);
        } else {
          mostrarClienteNoEncontrado();
        }
      } catch (error) {
        console.error('Error al buscar cliente:', error);
      }
    };
    
    // Mostrar cliente en la tabla
    const mostrarClienteEnTabla = (clientes) => {
      const tbody = document.querySelector('#clientes-table tbody');
      tbody.innerHTML = ''; // Limpiar la tabla
      
      clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${cliente.id}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.email}</td>
        `;
        tbody.appendChild(row);
      });
    };
    
    // Mostrar mensaje de cliente no encontrado
    const mostrarClienteNoEncontrado = () => {
      const tbody = document.querySelector('#clientes-table tbody');
      tbody.innerHTML = '<tr><td colspan="3">Cliente no encontrado</td></tr>';
    };

  });
  