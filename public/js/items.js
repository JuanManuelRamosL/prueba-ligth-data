// items.js
document.addEventListener('DOMContentLoaded', () => {
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
  
    const eliminarItem = async (id) => {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) cargarItems();
      else alert('Error al eliminar el item');
    };
  
    const editarItem = async (id) => {
      const codigo = prompt('Nuevo código:');
      const descripcion = prompt('Nueva descripción:');
      const precio = parseFloat(prompt('Nuevo precio:'));
      const stock = parseInt(prompt('Nuevo stock:'));
      const habilitado = confirm('¿Habilitado?');
  
      if (codigo && descripcion && !isNaN(precio) && !isNaN(stock)) {
        const data = { codigo, descripcion, precio, stock, habilitado };
        const response = await fetch(`http://localhost:3000/items/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
  
        if (response.ok) cargarItems();
        else alert('Error al actualizar el item');
      } else alert('Todos los campos son requeridos');
    };
  
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
  
      if (response.ok) cargarItems();
      else alert('Error al crear el item');
    });
  
    cargarItems();


    // items.js
    document.getElementById('buscar-item').addEventListener('input', (e) => {
      const itemId = e.target.value.trim();
    
      if (itemId) {
        buscarItemPorId(itemId);
      } else {
        cargarItems(); // Si el campo está vacío, recarga todos los items
      }
    });
    
    const buscarItemPorId = async (itemId) => {
      try {
        const response = await fetch(`http://localhost:3000/items/${itemId}`);
        
        if (response.ok) {
          const item = await response.json();
          mostrarItemsEnTabla([item]); // Muestra el resultado en la tabla
        } else {
          mostrarItemNoEncontrado();
        }
      } catch (error) {
        console.error('Error al buscar item:', error);
      }
    };
    
    // Mostrar items en la tabla (reutilizado para mostrar un solo item o la lista completa)
    const mostrarItemsEnTabla = (items) => {
      const tbody = document.querySelector('#items-table tbody');
      tbody.innerHTML = ''; // Limpiar la tabla
      
      items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.codigo}</td>
          <td>${item.descripcion}</td>
          <td>${item.precio}</td>
          <td>${item.stock}</td>
        `;
        tbody.appendChild(row);
      });
    };
    
    // Mostrar mensaje de item no encontrado
    const mostrarItemNoEncontrado = () => {
      const tbody = document.querySelector('#items-table tbody');
      tbody.innerHTML = '<tr><td colspan="5">Item no encontrado</td></tr>';
    };
  });
  