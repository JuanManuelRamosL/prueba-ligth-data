document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-item').addEventListener('click', () => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'pedido-item';
      itemContainer.innerHTML = `
        <input type="number" class="item-id" placeholder="Item ID" required />
        <input type="number" class="item-cantidad" placeholder="Cantidad" required />
      `;
      document.getElementById('pedido-items-container').appendChild(itemContainer);
    });
  
    document.getElementById('pedido-form').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const clienteId = document.getElementById('pedido-cliente-id').value;
      const fecha = document.getElementById('pedido-fecha').value;
  
      // Recopila items en un array
      const items = Array.from(document.querySelectorAll('.pedido-item')).map(itemDiv => ({
        itemId: parseInt(itemDiv.querySelector('.item-id').value),
        cantidad: parseInt(itemDiv.querySelector('.item-cantidad').value)
      }));
  
      try {
        const response = await fetch('http://localhost:3000/pedidos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clienteId, fecha, items })
        });
  
        if (response.ok) {
          alert('Pedido creado con éxito');
          cargarPedidos();
        } else {
          alert('Error al crear el pedido');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    document.getElementById('buscar-pedido').addEventListener('input', (e) => {
      const pedidoId = e.target.value.trim();
    
      if (pedidoId) {
        buscarPedidoPorId(pedidoId);
      } else {
        cargarPedidos(); // Si el campo está vacío, recarga todos los pedidos
      }
    });
    
    const buscarPedidoPorId = async (pedidoId) => {
      try {
        const response = await fetch(`http://localhost:3000/pedidos/${pedidoId}`);
        
        if (response.ok) {
          const pedido = await response.json();
          mostrarPedidosEnTabla([pedido]); // Muestra el resultado en la tabla
        } else {
          mostrarPedidoNoEncontrado();
        }
      } catch (error) {
        console.error('Error al buscar pedido:', error);
      }
    };
    
    // Mostrar pedidos en la tabla (reutilizado para mostrar un solo pedido o la lista completa)
    const mostrarPedidosEnTabla = (pedidos) => {
      const tbody = document.querySelector('#pedidos-table tbody');
      tbody.innerHTML = ''; // Limpiar la tabla
      
      pedidos.forEach(pedido => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${pedido.id}</td>
          <td>${pedido.clienteId}</td>
          <td>${pedido.fecha}</td>
          <td>${pedido.items.map(item => `ID: ${item.itemId}, Cantidad: ${item.cantidad}`).join('<br>')}</td>
        `;
        tbody.appendChild(row);
      });
    };
    
    // Mostrar mensaje de pedido no encontrado
    const mostrarPedidoNoEncontrado = () => {
      const tbody = document.querySelector('#pedidos-table tbody');
      tbody.innerHTML = '<tr><td colspan="4">Pedido no encontrado</td></tr>';
    };
  
    const cargarPedidos = async () => {
      const response = await fetch('http://localhost:3000/pedidos');
      const pedidos = await response.json();
  
      const tbody = document.querySelector('#pedidos-table tbody');
      tbody.innerHTML = '';
  
      pedidos.forEach(pedido => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${pedido.id}</td>
          <td>${pedido.clienteId}</td>
          <td>${pedido.fecha}</td>
          <td>${JSON.stringify(pedido.items)}</td>
        `;
        tbody.appendChild(row);
      });
    };
  
    cargarPedidos();
  });
  