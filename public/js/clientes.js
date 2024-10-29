document.addEventListener('DOMContentLoaded', () => {
  const clienteForm = document.getElementById('cliente-form');
  const buscarClienteInput = document.getElementById('buscar-cliente');
  const modal = document.getElementById('modal-editar-cliente');
  const closeModalButton = document.querySelector('.close-button');
  const clienteTableBody = document.querySelector('#clientes-table tbody');

  // Enviar datos de un nuevo cliente al backend
  clienteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const clienteData = getClienteFormData();
    await crearCliente(clienteData);
    clienteForm.reset();
    await cargarClientes();
  });

  // Obtener datos del formulario de cliente
  const getClienteFormData = () => ({
    nombre: document.getElementById('cliente-nombre').value,
    email: document.getElementById('cliente-email').value,
    telefono: document.getElementById('cliente-telefono').value,
    direccion: document.getElementById('cliente-direccion').value
  });

  // Crear un cliente
  const crearCliente = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      response.ok ? alert('Cliente creado con éxito') : alert('Error al crear el cliente');
    } catch (error) {
      console.error('Error en la creación del cliente:', error);
    }
  };

  // Cargar clientes y mostrarlos en la tabla
  const cargarClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientes');
      const clientes = await response.json();
      mostrarClientes(clientes);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  // Mostrar lista de clientes en la tabla
  const mostrarClientes = (clientes) => {
    clienteTableBody.innerHTML = '';
    clientes.forEach((cliente) => clienteTableBody.appendChild(crearFilaCliente(cliente)));
  };

  // Crear fila de cliente
  const crearFilaCliente = (cliente) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cliente.id}</td>
      <td>${cliente.nombre}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.direccion}</td>
      <td></td>
    `;
    const actionsCell = row.children[5];
    actionsCell.appendChild(crearBotonAccion('Editar', () => editarCliente(cliente.id)));
    actionsCell.appendChild(crearBotonAccion('Eliminar', () => eliminarCliente(cliente.id)));
    return row;
  };

  // Crear botón de acción
  const crearBotonAccion = (texto, onClick) => {
    const button = document.createElement('button');
    button.textContent = texto;
    button.addEventListener('click', onClick);
    return button;
  };

  // Eliminar un cliente
  const eliminarCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${id}`, { method: 'DELETE' });
      if (response.ok) await cargarClientes();
      else alert('Error al eliminar el cliente');
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  // Editar cliente
  const editarCliente = (id) => {
    modal.style.display = 'block';
    document.getElementById('guardar-cambios').onclick = () => {
      const data = getModalFormData();
      if (data.nombre && data.email && data.telefono && data.direccion) {
        actualizarCliente(id, data);
        modal.style.display = 'none';
      } else alert('Todos los campos son requeridos');
    };
  };

  // Obtener datos del formulario del modal
  const getModalFormData = () => ({
    nombre: document.getElementById('modal-cliente-nombre').value,
    email: document.getElementById('modal-cliente-email').value,
    telefono: document.getElementById('modal-cliente-telefono').value,
    direccion: document.getElementById('modal-cliente-direccion').value
  });

  // Actualizar cliente
  const actualizarCliente = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      response.ok ? await cargarClientes() : alert('Error al actualizar el cliente');
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  };

  // Búsqueda de cliente
  buscarClienteInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    searchTerm ? buscarClientePorId(searchTerm) : cargarClientes();
  });

  // Buscar cliente por ID
  const buscarClientePorId = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${id}`);
      response.ok ? mostrarClientes([await response.json()]) : mostrarClienteNoEncontrado();
    } catch (error) {
      console.error('Error al buscar cliente:', error);
    }
  };

  // Mostrar mensaje de cliente no encontrado
  const mostrarClienteNoEncontrado = () => {
    clienteTableBody.innerHTML = '<tr><td colspan="6">Cliente no encontrado</td></tr>';
  };

  // Cerrar modal
  closeModalButton.addEventListener('click', () => (modal.style.display = 'none'));

  // Inicializar la carga de clientes
  cargarClientes();
});
