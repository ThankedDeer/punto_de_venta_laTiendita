const tablaProductos = document.getElementById("tablaProductos");
const fragment = document.createDocumentFragment();
const templateProductos = document.getElementById("templateProductos").content

window.addEventListener("load", function () {
  productos();
});


<<<<<<< HEAD


const productos = () => {
  axios
    .get("https://https://192.68.43.192/api/productos")
=======
const productos = () => {
  axios
    .get("http://localhost:3000/api/productos")
>>>>>>> b44224364812fb7fd3f920351118b8c74632f693
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
    templateProductos.querySelectorAll('td')[4].textContent = producto.idCategoria
    templateProductos.querySelectorAll('td')[5].textContent = producto.idProveedor
    const clone  = templateProductos.cloneNode(true);
    fragment.appendChild(clone);
  })
  tablaProductos.appendChild(fragment);

}


const selectCategoria = () => {
  const selectCategorias = document.querySelectorAll('#selectCategoria');
  selectCategorias.forEach((selectCategoria) => {
    selectCategoria.innerHTML = " ";
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
  const selectProveedor = document.querySelectorAll('#selectProveedor');
  selectProveedor.forEach((selectProveedor) => {
    selectProveedor.innerHTML = " ";
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
  const stock = document.getElementById("crearStock").value;
  const proveedor = document.getElementById("selectProveedor").value;
  const categoria = document.getElementById("selectCategoria").value;
  
  axios.post("http://localhost:3000/api/productos", {
    Codigo: codigo,
    Nom_Producto: nombre,
    Precio_Compra: precioCompra,
    Precio_Venta: precioVenta,
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
    reiniciarInputs();
  })
  
  .catch(function (error) {
    console.log(error);
    alert("Hubo un error al crear el producto. Verifica si el Codigo o Nombre del producto ya existen");
  });
};

const reiniciarInputs = () => {
  document.getElementById("crearCodigo").value = "";
  document.getElementById("crearNombre").value = "";
  document.getElementById("crearPrecioCompra").value = "";
  document.getElementById("crearPrecioVenta").value = "";
  document.getElementById("crearStock").value = "";
  document.getElementById("selectProveedor").value = "";
  document.getElementById("selectCategoria").value = "";
};






