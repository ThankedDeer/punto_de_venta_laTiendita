function mostrarDatosProductos(codigo) {
  axios.get(`http://localhost:3000/api/producto/${codigo}`)
    .then(response => {
      const producto = response.data[0];
      const codigoInput = document.getElementById('eliminarCodigo');
      const nombreInput = document.getElementById('eliminarNombre');
      const precioCompraInput = document.getElementById('eliminarPrecioCompra');
      const precioVentaInput = document.getElementById('eliminarPrecioVenta');
      const unidadInput = document.getElementById('eliminarUnidad');
      const stockInput = document.getElementById('eliminarStock');
      const categoriaSelect = document.getElementById('eliminarCategoria');
      const proveedorSelect = document.getElementById('eliminarProveedor');

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


function eliminarProducto() {
  const codigoInput = document.getElementById('eliminarCodigo');
  const codigo = codigoInput.value;

  axios.delete(`http://localhost:3000/api/productos/${codigo}`)
    .then(response => {
      Swal.fire({
        title: "Producto eliminado",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      // Limpiar los campos
      codigoInput.value = "";
      document.getElementById('eliminarNombre').value = "";
      document.getElementById('eliminarPrecioCompra').value = "";
      document.getElementById('eliminarPrecioVenta').value = "";
      document.getElementById('eliminarUnidad').value = "";
      document.getElementById('eliminarStock').value = "";
      document.getElementById('eliminarCategoria').innerHTML = "";
      document.getElementById('eliminarProveedor').innerHTML = "";
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error al eliminar el producto",
        text: "Verifica si el producto existe o el codigo sea el correcto",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    });
}

