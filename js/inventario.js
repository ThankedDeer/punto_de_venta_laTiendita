const tablaProductos = document.getElementById("tablaProductos");
const fragment = document.createDocumentFragment();
const templateProductos = document.getElementById("templateProductos").content

window.addEventListener("load", function () {
  productos();
});



const productos = () => {
  axios
    .get("https://backtiendita-production.up.railway.app/api/productos")
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
    axios.get('https://backtiendita-production.up.railway.app/api/categorias')
    .then((response)=>{
      response.data.forEach((categoria)=>{
        const opt = document.createElement('option');
        opt.value = categoria.idCategoria;
        opt.textContent = categoria.Nom_Categoria;
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
    axios.get('https://backtiendita-production.up.railway.app/api/proveedores')
    .then((response)=>{
      response.data.forEach((proveedor) => {
        const opt = document.createElement('option');
        opt.value = proveedor.idProveedor;
        opt.textContent = proveedor.Nom_Proveedor;
        selectProveedor.appendChild(opt);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  });
}

const nuevoProducto = () => {
  const nuevoProducto = document.getElementById("nuevoProducto");
  const codigo = document.getElementById("crearCodigo").value;
  const nombre = document.getElementById("crearNombre").value;
  const precioCompra = document.getElementById("crearPrecioCompra").value;
  const precioVenta = document.getElementById("crearPrecioVenta").value;
  const stock = document.getElementById("crearStock").value;
  const categoria = document.getElementById("selectCategoria").value;
  const proveedor = document.getElementById("selectProveedor").value;
  
  axios.post("https://backtiendita-production.up.railway.app/api/productos", {
    Codigo: codigo,
    Nom_Producto: nombre,
    Precio_Compra: precioCompra,
    Precio_Venta: precioVenta,
    Stock: stock,
    idCategoria: categoria,
    idProveedor: proveedor
  })
  .then(function (response) {
    console.log(response);
    alert("Producto creado exitosamente");
  })
  .catch(function (error) {
    console.log(error);
    alert("Hubo un error al crear el producto");
  });
};







