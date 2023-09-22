window.addEventListener("load", function () {
  obtenerCategorias();
  obtenerProveedores();
});

function obtenerCategorias() {
  axios.get('http://localhost:3000/api/categorias')
    .then(response => {
      const categorias = response.data;
      const select = document.getElementById('actualizarCategoria');
      select.innerHTML = '<option disabled selected value="">Selecciona una categoría</option>';
      categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.idCategoria;
        option.text = categoria.Nom_Categoria;
        select.appendChild(option);
      });
    })
    .catch(error => console.error(error));
}


function obtenerProveedores() {
  axios.get('http://localhost:3000/api/proveedores')
    .then(response => {
      const proveedores = response.data;
      const select = document.getElementById('actualizarProveedor');
      select.innerHTML = '<option disabled selected value="">Selecciona un proveedor</option>';
      proveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.value = proveedor.idProveedor;
        option.text = proveedor.Nom_Proveedor;
        select.appendChild(option);
      });
    })
    .catch(error => console.error(error));
}

function mostrarDatosProducto(codigo) {
  axios.get(`http://localhost:3000/api/producto/${codigo}`)
    .then(response => {
      const producto = response.data[0];
      const codigoInput = document.getElementById('actualizarCodigo');
      const nombreInput = document.getElementById('actualizarNombre');
      const precioCompraInput = document.getElementById('actualizarPrecioCompra');
      const precioVentaInput = document.getElementById('actualizarPrecioVenta');
      const precioPromocion = document.getElementById('actualizarPrecioPromocion');
      const stockInput = document.getElementById('actualizarStock');
      const unidadSelect = document.getElementById('actualizarUnidad');
      const disponibleInput = document.getElementById('actualizarDisponible');
      const categoriaSelect = document.getElementById('actualizarCategoria');
      const proveedorSelect = document.getElementById('actualizarProveedor');

      codigoInput.value = producto.Codigo_Producto;
      nombreInput.value = producto.Nom_Producto;
      precioCompraInput.value = producto.Precio_Compra;
      precioVentaInput.value = producto.Precio_Venta;
      precioPromocion.value = producto.Precio_Promocion;
      stockInput.value = producto.Stock_Disponible;
      unidadSelect.value = producto.Unidad;
      
      if (producto.Disponible) {
        disponibleInput.value = "1";
      } else {
        disponibleInput.value = "0";
      }

      categoriaSelect.value = producto.idCategoria;
      proveedorSelect.value = producto.idProveedor;

      nombreInput.disabled = true;
      precioCompraInput.disabled = true;
      precioVentaInput.disabled = true;
      precioPromocion.disabled = true;
      unidadSelect.disabled = true;
      stockInput.disabled = true;
      disponibleInput.disabled = true;
      categoriaSelect.disabled = true;
      proveedorSelect.disabled = true;
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "No se encontro el producto",
        text: "Verifica si el producto existe o el código sea el correcto ",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    });
}

function guardarCambios() {
  const codigo = document.getElementById('actualizarCodigo').value;
  const nombre = document.getElementById('actualizarNombre').value;
  const precioCompra = document.getElementById('actualizarPrecioCompra').value;
  const precioVenta = document.getElementById('actualizarPrecioVenta').value;
  const precioPromocion = document.getElementById('actualizarPrecioPromocion').value;
  const stock = document.getElementById('actualizarStock').value;
  const unidad = document.getElementById('actualizarUnidad').value;
  const disponible = document.getElementById('actualizarDisponible').value;
  const categoria = document.getElementById('actualizarCategoria').value;
  const proveedor = document.getElementById('actualizarProveedor').value;

  const productoActualizado = {
    Codigo_Producto: codigo,
    Nom_Producto: nombre,
    Precio_Compra: precioCompra,
    Precio_Venta: precioVenta,
    Precio_Promocion: precioPromocion,
    Stock_Disponible: stock,
    Unidad: unidad,
    Disponible: disponible,
    idCategoria: categoria,
    idProveedor: proveedor
  };

  axios.patch(`http://localhost:3000/api/productos/${codigo}`, productoActualizado)
    .then(response => {
      Swal.fire({
        title: "Correcto",
        text: "Producto actualizado correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Hubo un error al guardar los cambios",
        text: "Verifica bien los datos o seleccionalos correctamente",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    });
}

function limpiarInputsYSelects() {
  const inputs = document.querySelectorAll('input[type=text], input[type=number]');
  const selects = document.querySelectorAll('select');
  
  inputs.forEach(input => input.value = '');
  selects.forEach(select => select.selectedIndex = 0);

  window.location.reload();
}

const habilitarCampos = function() {
  document.getElementById("actualizarCodigo").removeAttribute("disabled");
  document.getElementById("actualizarNombre").removeAttribute("disabled");
  document.getElementById("actualizarPrecioCompra").removeAttribute("disabled");
  document.getElementById("actualizarPrecioVenta").removeAttribute("disabled");
  document.getElementById("actualizarPrecioPromocion").removeAttribute("disabled");
  document.getElementById("actualizarUnidad").removeAttribute("disabled");
  document.getElementById("actualizarStock").removeAttribute("disabled");
  document.getElementById("actualizarCategoria").removeAttribute("disabled");
  document.getElementById("actualizarProveedor").removeAttribute("disabled");
  document.getElementById("actualizarDisponible").removeAttribute("disabled");
};



