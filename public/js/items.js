document.addEventListener('DOMContentLoaded', () => {
  // Manejar la creación de items
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
        <td></td>
      `;
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', () => editarItem(item.id));
      row.children[6].appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', () => eliminarItem(item.id));
      row.children[6].appendChild(deleteButton);

      tbody.appendChild(row);
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
    const response = await fetch(`http://localhost:3000/items/${id}`);
    const item = await response.json();

    if (response.ok) {
      abrirModalEditarItem(item);
    } else {
      alert('Error al cargar los datos del item');
    }
  };

  const abrirModalEditarItem = (item) => {
    document.getElementById('modal-item-codigo').value = item.codigo;
    document.getElementById('modal-item-descripcion').value = item.descripcion;
    document.getElementById('modal-item-precio').value = item.precio;
    document.getElementById('modal-item-stock').value = item.stock;
    document.getElementById('modal-item-habilitado').checked = item.habilitado;

    const guardarCambiosButton = document.getElementById('guardar-cambios-item');
    guardarCambiosButton.onclick = () => guardarCambios(item.id);

    const modal = document.getElementById('modal-editar-item');
    modal.style.display = 'block';
  };

  const guardarCambios = async (id) => {
    const codigo = document.getElementById('modal-item-codigo').value;
    const descripcion = document.getElementById('modal-item-descripcion').value;
    const precio = parseFloat(document.getElementById('modal-item-precio').value);
    const stock = parseInt(document.getElementById('modal-item-stock').value);
    const habilitado = document.getElementById('modal-item-habilitado').checked;

    if (codigo && descripcion && !isNaN(precio) && !isNaN(stock)) {
      const data = { codigo, descripcion, precio, stock, habilitado };
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        cargarItems(); // Recarga la lista de items después de actualizar
        cerrarModal();
      } else {
        alert('Error al actualizar el item');
      }
    } else {
      alert('Todos los campos son requeridos');
    }
  };

  const cerrarModal = () => {
    const modal = document.getElementById('modal-editar-item');
    modal.style.display = 'none';
  };

  // Cierra el modal al hacer clic fuera de la caja de contenido
  window.onclick = (event) => {
    const modal = document.getElementById('modal-editar-item');
    if (event.target === modal) cerrarModal();
  };

  cargarItems();

  // Manejar la búsqueda de item
  document.getElementById('buscar-item').addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    
    if (searchTerm) {
      buscarItemPorId(searchTerm);
    } else {
      cargarItems();
    }
  });
  
  const buscarItemPorId = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`);
      
      if (response.ok) {
        const item = await response.json();
        mostrarItemEnTabla([item]);
      } else {
        mostrarItemNoEncontrado();
      }
    } catch (error) {
      console.error('Error al buscar item:', error);
    }
  };
  
  const mostrarItemEnTabla = (items) => {
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
      `;
      tbody.appendChild(row);
    });
  };
  
  const mostrarItemNoEncontrado = () => {
    const tbody = document.querySelector('#items-table tbody');
    tbody.innerHTML = '<tr><td colspan="5">Item no encontrado</td></tr>';
  };
});
