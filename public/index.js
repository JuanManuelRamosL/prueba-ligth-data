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
    async function cargarClientes() {
      const response = await fetch('http://localhost:3000/clientes');
      const clientes = await response.json();
      const clientesTable = document.getElementById('clientes-table').getElementsByTagName('tbody')[0];
      clientesTable.innerHTML = '';
      clientes.forEach((cliente) => {
        const row = clientesTable.insertRow();
        row.innerHTML = `<td>${cliente.id}</td><td>${cliente.nombre}</td><td>${cliente.email}</td><td>${cliente.telefono}</td><td>${cliente.direccion}</td>`;
      });
    }
  
    cargarClientes(); // Cargar clientes al iniciar
  
    // Funciones similares para items y pedidos...
  });
  