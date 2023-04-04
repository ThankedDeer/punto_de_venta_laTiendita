const tablaProductos = document.getElementById("tablaProductos");
const fragment = document.createDocumentFragment();
const templateProductos = document.getElementById("templateProductos").content

window.addEventListener("load", function () {
  productos();
});



const productos = () => {
  axios
    .get("http://localhost:3000/api/productoss")
    .then((response) => {
      let lista = response.data
      mostrarProductos(lista)
    })
    .catch((error) =>{
      log.error(error);
    })

};



const mostrarProductos = (lista) =>{
  Object.values(lista).forEach((producto) => {
    templateProductos.querySelector("th").textContent = producto.Codigo
    templateProductos.querySelectorAll('td')[0].textContent = producto.Nom_Producto
    templateProductos.querySelectorAll('td')[1].textContent = producto.Precio_Compra
    templateProductos.querySelectorAll('td')[2].textContent = producto.Precio_Venta
    templateProductos.querySelectorAll('td')[3].textContent = producto.Stock
    templateProductos.querySelectorAll('td')[4].textContent = producto.Unidad
    templateProductos.querySelectorAll('td')[5].textContent = producto.Nom_Categoria
    templateProductos.querySelectorAll('td')[6].textContent = producto.Nom_Proveedor
    const clone  = templateProductos.cloneNode(true);
    fragment.appendChild(clone);
  })
  tablaProductos.appendChild(fragment);

}


const selectCategoria = () => {
  const selectCategorias = document.querySelectorAll('#selectCategoria');
  selectCategorias.forEach((selectCategoria) => {
    selectCategoria.innerHTML = " ";
    
    // Agregar opción "Categoria"
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Seleccione una categoria";
    selectCategoria.appendChild(defaultOption);

    axios.get('http://localhost:3000/api/categorias')
    .then((response)=>{
      response.data.forEach((categoria)=>{
        const opt = document.createElement('option');
        opt.value = categoria.idCategoria;
        opt.textContent = categoria.Nom_Categoria;
        opt.dataset.id = categoria.idCategoria; // Agregar data-id con el id de la categoria
        selectCategoria.appendChild(opt);
      });
    })
    .catch((error)=>{
      console.log(error);
    });
  });
}




const selectProveedor = () => {
  const selectProveedores = document.querySelectorAll('#selectProveedor');
  selectProveedores.forEach((selectProveedor) => {
    selectProveedor.innerHTML = " ";
    // Agregamos la opción por defecto
    const defaultOpt = document.createElement('option');
    defaultOpt.value = "";
    defaultOpt.textContent = "Seleccione un proveedor";
    selectProveedor.appendChild(defaultOpt);
    axios.get('http://localhost:3000/api/proveedores')
    .then((response)=>{
      response.data.forEach((proveedor) => {
        const opt = document.createElement('option');
        opt.value = proveedor.idProveedor;
        opt.textContent = proveedor.Nom_Proveedor;
        opt.dataset.id = proveedor.idProveedor; // Agregar data-id con el id del proveedor
        selectProveedor.appendChild(opt);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  });
}



const nuevoProducto = () => {
  const codigo = document.getElementById("crearCodigo").value;
  const nombre = document.getElementById("crearNombre").value;
  const precioCompra = document.getElementById("crearPrecioCompra").value;
  const precioVenta = document.getElementById("crearPrecioVenta").value;
  const unidad = document.getElementById("crearUnidad").value;
  const stock = document.getElementById("crearStock").value;
  const proveedor = document.getElementById("selectProveedor").value;
  const categoria = document.getElementById("selectCategoria").value;
  
  axios.post("http://localhost:3000/api/productos", {
    Codigo: codigo,
    Nom_Producto: nombre,
    Precio_Compra: precioCompra,
    Precio_Venta: precioVenta,
    Unidad: unidad,
    Stock: stock,
    idProveedor: proveedor,
    idCategoria: categoria
  })
  .then(function (response) {
    Swal.fire({
      title: "Correcto",
      text: "Producto creado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    console.log(response);
  })
  
  .catch(function (error) {
    console.log(error);
    Swal.fire({
      title: "No se creo el producto",
      text: "Verifica si el producto ya existe",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });  });
};









