const tablaProductos = document.getElementById("tablaProductos");
const fragment = document.createDocumentFragment();
const templateProductos = document.getElementById("templateProductos").content

window.addEventListener("load", function () {
  productos();
  selectCategoria();
  selectProveedor();
  fillSucursalOptions();
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
    templateProductos.querySelector("th").textContent = producto.Codigo_Producto
    templateProductos.querySelectorAll('td')[0].textContent = producto.Nom_Producto
    templateProductos.querySelectorAll('td')[1].textContent = producto.Precio_Compra
    templateProductos.querySelectorAll('td')[2].textContent = producto.Precio_Venta
    templateProductos.querySelectorAll('td')[3].textContent = producto.Precio_Promocion
    templateProductos.querySelectorAll('td')[4].textContent = producto.Stock_Disponible
    templateProductos.querySelectorAll('td')[5].textContent = producto.Unidad
    templateProductos.querySelectorAll('td')[6].textContent = producto.Esta_Disponible === 1 ? "Disponible" : "No disponible";
    templateProductos.querySelectorAll('td')[7].textContent = producto.Nom_Categoria
    templateProductos.querySelectorAll('td')[8].textContent = producto.Nom_Proveedor
    const clone  = templateProductos.cloneNode(true);
    fragment.appendChild(clone);
  })
  tablaProductos.appendChild(fragment);
}

const selectCategoria = () => {
  const selectCategorias = document.querySelectorAll('#selectCategoria');
  selectCategorias.forEach((selectCategoria) => {
    selectCategoria.innerHTML = " ";
    
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Seleccione una categoría";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectCategoria.appendChild(defaultOption);

    axios.get('http://localhost:3000/api/categorias')
    .then((response)=>{
      response.data.forEach((categoria)=>{
        const opt = document.createElement('option');
        opt.value = categoria.idCategoria;
        opt.textContent = categoria.Nom_Categoria;
        opt.dataset.id = categoria.idCategoria; 
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
    const defaultOpt = document.createElement('option');
    defaultOpt.value = "";
    defaultOpt.textContent = "Seleccione un proveedor";
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    selectProveedor.appendChild(defaultOpt);
    axios.get('http://localhost:3000/api/proveedores')
    .then((response)=>{
      response.data.forEach((proveedor) => {
        const opt = document.createElement('option');
        opt.value = proveedor.idProveedor;
        opt.textContent = proveedor.Nom_Proveedor;
        opt.dataset.id = proveedor.idProveedor; 
        selectProveedor.appendChild(opt);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  });
}

const nuevoProducto = () => {
  const codigo = document.getElementById("crearCodigoProducto").value;
  const nombre = document.getElementById("crearNombre").value;
  const precioCompra = document.getElementById("crearPrecioCompra").value;
  const precioVenta = document.getElementById("crearPrecioVenta").value;
  const precioPromocion = document.getElementById("crearPrecioPromocion").value;
  const unidad = document.getElementById("crearUnidad").value;
  const stock = document.getElementById("crearStock").value;
  const disponible = document.getElementById("crearDisponible").value;
  const categoria = document.getElementById("selectCategoria").value;
  const proveedor = document.getElementById("selectProveedor").value;
  const sucursal = document.getElementById("Sucursal").value;
  
  axios.post("http://localhost:3000/api/productos", {
    Codigo_Producto: codigo,
    Nom_Producto: nombre,
    Precio_Compra: precioCompra,
    Precio_Venta: precioVenta,
    Precio_Promocion: precioPromocion,
    Unidad: unidad,
    Stock_Disponible: stock,
    Disponible : disponible,
    idCategoria: categoria,
    idProveedor: proveedor,
    idSucursal: sucursal
  })
  .then(function (response) {
    Swal.fire({
      title: "Correcto",
      text: "Producto creado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  })
  
  .catch(function (error) {
    console.log(error);
    Swal.fire({
      title: "No se creo el producto",
      text: "Verifica si el producto ya existe o completa correctamente los campos",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });  });
};

const getSucursal = () => {
  const idSucursal = localStorage.getItem("idSucursal");
  const nomSucursal = localStorage.getItem("Nom_Sucursal");
  
  return { idSucursal, nomSucursal };
};

const fillSucursalOptions = () => {
  const select = document.getElementById("Sucursal");
  const sucursal = getSucursal();

  const option = document.createElement("option");
  option.value = sucursal.idSucursal;
  option.textContent = sucursal.nomSucursal;
  select.appendChild(option);
};