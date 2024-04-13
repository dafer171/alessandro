// Datos simulados de productos
var productos = [];

// Variables para llevar el seguimiento del pedido, el total y el resumen de productos
var pedido = [];
var totalActual = 0; // Total del pedido actual
var totalPedidos = 0; // Total de todos los pedidos
var resumenProductos = {}; // Resumen de productos consumidos

function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Lógica de autenticación simulada
  if (username === 'usuario' && password === 'contraseña') {
    // Redirigir al usuario según su rol
    // Por ejemplo:
    window.location.href = 'ventas.html'; // Para el personal de ventas al público
    // window.location.href = 'gestion.html'; // Para los gerentes o administradores
  } else {
    alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
  }
}

function agregarProducto(nombre, precio) {
  // Agrega el producto al pedido y actualiza el total del pedido actual
  pedido.push({ nombre: nombre, precio: precio });
  totalActual += precio;

  // Actualiza el resumen de productos
  actualizarResumenProductos(nombre);

  // Actualiza la visualización del pedido y el total del pedido actual
  actualizarPedido();
}

function eliminarUltimoProducto() {
  if (pedido.length > 0) {
    var ultimoProducto = pedido.pop();
    totalActual -= ultimoProducto.precio;

    // Actualiza el resumen de productos
    restarResumenProducto(ultimoProducto.nombre);

    actualizarPedido();
  }
}

function ingresarDinero() {
  var dineroIngresado = parseFloat(prompt('Ingrese la cantidad de dinero:'));
  if (isNaN(dineroIngresado)) {
    alert('Por favor, ingrese un número válido.');
    return;
  }

  var cambio = dineroIngresado - totalActual;
  cambio = cambio.toFixed(2);
  if (cambio >= 0) {
    alert(
      'Dinero ingresado: ' +
        dineroIngresado.toFixed(2) +
        ' €\nCambio: ' +
        cambio +
        ' €'
    );
    finalizarPedido(dineroIngresado);
  } else {
    alert(
      'La cantidad ingresada es insuficiente. Faltan ' + Math.abs(cambio) + ' €'
    );
  }
}

function finalizarPedido(dineroIngresado) {
  // Agregar el pedido completado a la lista de pedidos y actualizar el total de todos los pedidos
  agregarPedido(
    new Date().getTime(),
    obtenerContenidoPedido(),
    totalActual.toFixed(2)
  );
  totalPedidos += totalActual;
  totalActual = 0; // Reinicia el total del pedido actual

  // Reiniciar el pedido
  pedido = [];

  // Actualizar la visualización del pedido
  actualizarPedido();

  // Mostrar el cambio al usuario
  //var cambio = dineroIngresado - totalPedidos;
  document.getElementById('cambio').textContent =
    'Cambio: ' + cambio.toFixed(2) + ' €';

  // Actualizar el total de todos los pedidos
  actualizarTotalPedidos();
}

function reiniciarPedido() {
  pedido = []; // Vaciar el arreglo del pedido
  totalActual = 0; // Reinicia el total del pedido actual
  actualizarPedido(); // Actualizar la visualización del pedido
}

function actualizarPedido() {
  var pedidoList = document.getElementById('pedido-list');
  var totalElement = document.getElementById('total');

  // Borra el contenido anterior del pedido
  pedidoList.innerHTML = '';

  // Actualiza la lista de productos en el pedido
  pedido.forEach(function (item) {
    var li = document.createElement('li');
    li.textContent = item.nombre + ' - ' + item.precio + ' €';
    pedidoList.appendChild(li);
  });

  // Calcula y actualiza el total del pedido actual
  totalElement.textContent = totalActual.toFixed(2);
  document.getElementById('cambio').textContent = '';
}

function obtenerContenidoPedido() {
  return pedido
    .map(function (item) {
      return item.nombre + ' - ' + item.precio + ' €';
    })
    .join(', ');
}

function agregarPedido(numeroPedido, contenido, total) {
  var tbodyPedidos = document.getElementById('tbody-pedidos');
  var row = tbodyPedidos.insertRow();
  var cellNumeroPedido = row.insertCell(0);
  var cellContenido = row.insertCell(1);
  var cellTotal = row.insertCell(2);

  cellNumeroPedido.textContent = numeroPedido;
  cellContenido.textContent = contenido;
  cellTotal.textContent = total;
}

function actualizarResumenProductos(nombreProducto) {
  // Incrementa la cantidad de producto en el resumen
  if (resumenProductos[nombreProducto]) {
    resumenProductos[nombreProducto]++;
  } else {
    resumenProductos[nombreProducto] = 1;
  }

  // Actualiza la tabla de resumen de productos
  var tbodyResumenProductos = document.getElementById(
    'tbody-resumen-productos'
  );
  tbodyResumenProductos.innerHTML = ''; // Borra el contenido anterior

  // Itera sobre el resumen y actualiza la tabla
  for (var producto in resumenProductos) {
    var row = tbodyResumenProductos.insertRow();
    var cellProducto = row.insertCell(0);
    var cellCantidad = row.insertCell(1);

    cellProducto.textContent = producto;
    cellCantidad.textContent = resumenProductos[producto];
  }
}

function restarResumenProducto(nombreProducto) {
  // Disminuye la cantidad de producto en el resumen
  if (resumenProductos[nombreProducto]) {
    resumenProductos[nombreProducto]--;

    // Si la cantidad llega a cero, elimina el producto del resumen
    if (resumenProductos[nombreProducto] === 0) {
      delete resumenProductos[nombreProducto];
    }
  }

  // Actualiza la tabla de resumen de productos
  var tbodyResumenProductos = document.getElementById(
    'tbody-resumen-productos'
  );
  tbodyResumenProductos.innerHTML = ''; // Borra el contenido anterior

  // Itera sobre el resumen y actualiza la tabla
  for (var producto in resumenProductos) {
    var row = tbodyResumenProductos.insertRow();
    var cellProducto = row.insertCell(0);
    var cellCantidad = row.insertCell(1);

    cellProducto.textContent = producto;
    cellCantidad.textContent = resumenProductos[producto];
  }
}

function actualizarTotalPedidos() {
  var totalPedidosElement = document.getElementById('total-pedidos');
  var mensaje = `Total de pedidos de hoy es: ${totalPedidos.toFixed(2)} €`;
  totalPedidosElement.textContent = mensaje;
}
