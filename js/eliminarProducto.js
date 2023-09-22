function mostrarDatosProductos(codigo) {
  axios.get(`http://localhost:3000/api/producto/${codigo}`)
    .then(response => {
      const producto = response.data[0];
      const codigoInput = document.getElementById('eliminarCodigo');
      const nombreInput = document.getElementById('eliminarNombre');
      const precioCompraInput = document.getElementById('eliminarPrecioCompra');
      const precioVentaInput = document.getElementById('eliminarPrecioVenta');
      const precioPromocionInput = document.getElementById('eliminarPrecioPromocion');
      const stockInput = document.getElementById('eliminarStock');
      const unidadInput = document.getElementById('eliminarUnidad');
      const disponibleInput = document.getElementById('eliminarDisponible');
      const categoriaInput = document.getElementById('eliminarCategoria');
      const proveedorInput = document.getElementById('eliminarProveedor');
      codigoInput.value = producto.Codigo_Producto;
      nombreInput.value = producto.Nom_Producto;
      precioCompraInput.value = producto.Precio_Compra;
      precioVentaInput.value = producto.Precio_Venta;
      precioPromocionInput.value = producto.Precio_Promocion;
      stockInput.value = producto.Stock_Disponible;
      unidadInput.value = producto.Unidad;
      disponibleInput.value = producto.Disponible;
      axios.get(`http://localhost:3000/api/categoria/${producto.idCategoria}`)
        .then(response => {
          const categoria = response.data[0];
          categoriaInput.value = categoria.Nom_Categoria;
        }).catch(error => console.error(error));
      axios.get(`http://localhost:3000/api/proveedor/${producto.idProveedor}`)
        .then(response => {
          const proveedor = response.data[0];
          proveedorInput.value = proveedor.Nom_Proveedor;
        }).catch(error => console.error(error));
      nombreInput.disabled = true;
      precioCompraInput.disabled = true;
      precioVentaInput.disabled = true;
      precioPromocionInput.disabled = true;
      unidadInput.disabled = true;
      stockInput.disabled = true;
      categoriaInput.disabled = true;
      proveedorInput.disabled = true;
      if (producto.Disponible === 1) {
        disponibleInput.value = "Disponible";
      } else {
        disponibleInput.value = "No disponible";
      }
    }).catch(error => {
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
  axios.delete(`http://localhost:3000/api/productos/${codigo}`).then(response => {
      Swal.fire({
        title: "Producto eliminado",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      codigoInput.value = "";
      document.getElementById('eliminarNombre').value = "";
      document.getElementById('eliminarPrecioCompra').value = "";
      document.getElementById('eliminarPrecioVenta').value = "";
      document.getElementById('eliminarPrecioPromocion').value = "";
      document.getElementById('eliminarUnidad').value = "";
      document.getElementById('eliminarStock').value = "";
      document.getElementById('eliminarCategoria').value = "";
      document.getElementById('eliminarProveedor').value = "";
      document.getElementById('eliminarDisponible').value = "";
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error al eliminar el producto",
        text: "El producto aún tiene cantidad en stock",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    });
}

