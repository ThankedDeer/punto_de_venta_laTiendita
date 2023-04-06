

function obtenerCategorias() {
  axios.get('http://localhost:3000/api/categorias')
    .then(response => {
      const categorias = response.data;
      const select = document.getElementById('actualizarCategoria');
      select.innerHTML = '<option selected value=""> </option>';
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
      select.innerHTML = '<option selected value=""> </option>';
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
      const unidadInput = document.getElementById('actualizarUnidad');
      const stockInput = document.getElementById('actualizarStock');
      const categoriaSelect = document.getElementById('actualizarCategoria');
      const proveedorSelect = document.getElementById('actualizarProveedor');

      codigoInput.value = producto.Codigo;
      nombreInput.value = producto.Nom_Producto;
      precioCompraInput.value = producto.Precio_Compra;
      precioVentaInput.value = producto.Precio_Venta;
      unidadInput.value = producto.Unidad;
      stockInput.value = producto.Stock;

      // Insertar nombre de la categoría en el select correspondiente
      axios.get(`http://localhost:3000/api/categoria/${producto.idCategoria}`)
        .then(response => {
          const categoria = response.data[0];
          const categoriaOption = document.createElement('option');
          categoriaOption.value = categoria.Nom_Categoria;
          categoriaOption.text = categoria.Nom_Categoria;
          categoriaOption.selected = true;
          categoriaSelect.appendChild(categoriaOption);
        })
        .catch(error => console.error(error));

      // Insertar nombre del proveedor en el select correspondiente
      axios.get(`http://localhost:3000/api/proveedor/${producto.idProveedor}`)
        .then(response => {
          const proveedor = response.data[0];
          const proveedorOption = document.createElement('option');
          proveedorOption.value = proveedor.Nom_Proveedor;
          proveedorOption.text = proveedor.Nom_Proveedor;
          proveedorOption.selected = true;
          proveedorSelect.appendChild(proveedorOption);
        })
        .catch(error => console.error(error));

      nombreInput.disabled = true;
      precioCompraInput.disabled = true;
      precioVentaInput.disabled = true;
      unidadInput.disabled = true;
      stockInput.disabled = true;
      categoriaSelect.disabled = true;
      proveedorSelect.disabled = true;
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "No se encontro el producto",
        text: "Verifica si el producto existe o el codigo sea el correcto ",
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
  const unidad = document.getElementById('actualizarUnidad').value;
  const stock = document.getElementById('actualizarStock').value;
  const categoria = document.getElementById('actualizarCategoria').value;
  const proveedor = document.getElementById('actualizarProveedor').value;

  const productoActualizado = {
    Codigo: codigo,
    Nom_Producto: nombre,
    Precio_Compra: precioCompra,
    Precio_Venta: precioVenta,
    Unidad: unidad,
    Stock: stock,
    idCategoria: categoria,
    idProveedor: proveedor
  };


  axios.patch(`http://localhost:3000/api/productos/${codigo}`, productoActualizado)
    .then(response => {
      //console.log(response.data);
      Swal.fire({
        title: "Correcto",
        text: "Producto actualizado correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      //location.reload(); // recargar la página para mostrar los datos actualizados
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
}

const habilitarCampos = function() {
  document.getElementById("actualizarCodigo").removeAttribute("disabled");
  document.getElementById("actualizarNombre").removeAttribute("disabled");
  document.getElementById("actualizarPrecioCompra").removeAttribute("disabled");
  document.getElementById("actualizarPrecioVenta").removeAttribute("disabled");
  document.getElementById("actualizarUnidad").removeAttribute("disabled");
  document.getElementById("actualizarStock").removeAttribute("disabled");
  document.getElementById("actualizarCategoria").removeAttribute("disabled");
  document.getElementById("actualizarProveedor").removeAttribute("disabled");
};



