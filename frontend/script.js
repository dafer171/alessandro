// Datos simulados de productos
var productos = [];

// Variables para llevar el seguimiento del pedido y el total
var pedido = [];
var total = 0;

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
  // Agrega el producto al pedido y actualiza el total
  pedido.push({ nombre: nombre, precio: precio });
  total += precio;

  // Actualiza la visualización del pedido y el total
  actualizarPedido();
}

function eliminarUltimoProducto() {
  if (pedido.length > 0) {
    var ultimoProducto = pedido.pop();
    total -= ultimoProducto.precio;
    actualizarPedido();
  }
}

function ingresarDinero() {
  var dineroIngresado = parseFloat(prompt('Ingrese la cantidad de dinero:'));
  if (isNaN(dineroIngresado)) {
    alert('Por favor, ingrese un número válido.');
    return;
  }

  var cambio = dineroIngresado - total;
  if (cambio >= 0) {
    alert(
      'Dinero ingresado: ' + dineroIngresado + ' €\nCambio: ' + cambio + ' €'
    );
    pedido = [];
    total = 0;
    actualizarPedido();
    document.getElementById('cambio').textContent = 'Cambio: ' + cambio + ' €';
  } else {
    alert(
      'La cantidad ingresada es insuficiente. Faltan ' + Math.abs(cambio) + ' €'
    );
  }
}
function reiniciarPedido() {
  pedido = []; // Vaciar el arreglo del pedido
  total = 0; // Restablecer el total a cero
  actualizarPedido(); // Actualizar la visualización del pedido y el total
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

  // Actualiza el total
  totalElement.textContent = total;
  document.getElementById('cambio').textContent = '';
}
