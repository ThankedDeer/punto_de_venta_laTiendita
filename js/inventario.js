window.addEventListener('load', function() {
  
  cargarProducto();
 
});


produtos2 = []


function mostrarProducto() {
  const seleccionarProducto = document.getElementById('seleccionarProducto').value;
  axios
    .get("https://backtiendita-production.up.railway.app/api/producto/" + seleccionarProducto )
    .then((response) => {

      producto = response.data[0]
    console.log(producto);
    document.getElementById('Codigo').value = producto.Codigo;
    document.getElementById('Nombre').value = producto.Nom_Producto;
    document.getElementById('Precio_Compra').value = producto.Precio_Compra;
    document.getElementById('Precio_Venta').value = producto.Precio_Venta;
    document.getElementById('Stock').value = producto.Stock;
    document.getElementById('Categoria').value = producto.idCategoria;
    document.getElementById('Proveedor').value = producto.idProveedor;



    
})
    .catch((error) => {
      console.log(error);
     
    });

 
}



function cargarProducto() {
  const seleccionarProducto = document.getElementById('seleccionarProducto');
  seleccionarProducto.innerHTML = '<option value="">Seleccione un producto</option>'; // Cambiar opción por defecto
  axios.get('https://backtiendita-production.up.railway.app/api/productos/')
    .then((response) => {

      this.produtos2 = response.data
      console.log(produtos2);
      
      response.data.forEach((producto) => {
        
        const opt = document.createElement('option');
        opt.value = producto.Codigo;
        opt.innerHTML = producto.Nom_Producto;
        seleccionarProducto.appendChild(opt);
        
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function desbloquearCampos() {
  document.querySelectorAll('input[type="text"]').forEach((campo) => {
    campo.removeAttribute('disabled');
  });
}

function bloquearCampos() {
  document.querySelectorAll('input[type="text"]').forEach((campo) => {
    campo.setAttribute('disabled', true);
  });
}

function cancelar() {
  mostrarProducto();
  bloquearCampos();
}

function guardarCambios() {
  const seleccionarProducto = document.getElementById('seleccionarProducto');
  const seleccionado = seleccionarProducto.options[seleccionarProducto.selectedIndex].value;
  const producto = {
    Codigo: document.getElementById('Codigo').value,
    Nombre: document.getElementById('Nombre').value,
    Precio_Compra: document.getElementById('Precio_Compra').value,
    Precio_Venta: document.getElementById('Precio_Venta').value,
    Stock: document.getElementById('Stock').value,
    Categoria: document.getElementById('Categoria').value,
    Proveedor: document.getElementById('Proveedor').value,
    
  }
}