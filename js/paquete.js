const tablaPaquetes = document.getElementById("tablaPaquetes");
const fragment = document.createDocumentFragment();
const templatePaquetes = document.getElementById("tablaPaquetes").content
window.addEventListener("load", function () { añadirCodigo(); añadirPaquete(); paquetes(); nombrePaquete();});

const paquetes = () => {
  axios.get("http://localhost:3000/api/paquetes").then((response) => {
      let lista = response.data
      mostrarPaquetes(lista)
    }).catch((error) =>{
      console.log(error);
    })};

const mostrarPaquetes = (lista) => {
  const tablaPaquetesAxl = document.getElementById("tablaPaquetes");
  const templatePaquetes = document.getElementById("templatePaquetes");
  const paquetes = {};
  lista.forEach((paquete) => {
    if (!paquetes
      [paquete.idPaquete]) {
      paquetes[paquete.idPaquete] = {
        idPaquete: paquete.idPaquete,
        Nom_Paquete: paquete.Nom_Paquete,
        Precio_Paquete: paquete.Precio_Paquete,
        Descripcion_Paquete: paquete.Descripcion_Paquete,
        productos: [],
      };
    }
    paquetes
    [paquete.idPaquete].productos.push({
      Nom_Producto: paquete.Nom_Producto,
      Cantidad_Producto: paquete.Cantidad_Producto,
    });
  });
  Object.values(paquetes).forEach((paquete) => {
    const clone = templatePaquetes.content.cloneNode(true);
    const row = clone.querySelector(".paquete");
    const productosCell = row.querySelectorAll("td")[2];
    row.querySelector("th").textContent = paquete.idPaquete;
    row.querySelectorAll("td")[0].textContent = paquete.Nom_Paquete;
    row.querySelectorAll("td")[1].textContent = paquete.Precio_Paquete;
    row.querySelectorAll("td")[3].textContent = paquete.Descripcion_Paquete;
    const productos 
    = paquete.productos.map(
      (producto) => `\u25CF ${producto.Nom_Producto} (${producto.Cantidad_Producto})`
    );
    productosCell.innerHTML = productos.join("<br>");
    tablaPaquetesAxl.appendChild(clone);
  });
};

const nuevoPaquete = () => {
  const codigoPaquete = document.getElementById("crearCodigoPaquete").value;
  const nombrePaquete = document.getElementById("crearNombrePaquete").value;
  const precioPaquete = document.getElementById("crearPrecioPaquete").value;
  const descripcionPaquete = document.getElementById("crearDescripcionPaquete").value;
  axios.post("http://localhost:3000/api/paquete", {
    idPaquete: codigoPaquete,
    Nom_Paquete: nombrePaquete,
    Precio_Paquete: precioPaquete,
    Descripcion_Paquete: descripcionPaquete
  }).then(function (response) {
    Swal.fire({
      title: "Correcto",
      text: "Paquete creado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  }).catch(function (error) {
    console.log(error);
    Swal.fire({
      title: "No se creo el paquete",
      text: "Verifica si el paquete ya existe o completa correctamente los campos",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });  
  });
};

const añadirPaquete = () => {
  const añadirPaquete = document.querySelectorAll('#anadirPaquete');
  añadirPaquete.forEach((añadirPaquete) => {
    añadirPaquete.innerHTML = " ";
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Seleccione un paquete";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    añadirPaquete.appendChild(defaultOption);
    axios.get('http://localhost:3000/api/paquetesCN')
    .then((response)=>{
      response.data.forEach((paquete)=>{
        const opt = document.createElement('option');
        opt.value = paquete.idPaquete;
        opt.textContent = paquete.Nom_Paquete;
        opt.dataset.id = paquete.idPaquete; 
        añadirPaquete.appendChild(opt);
      });
    })
    .catch((error)=>{
      console.log(error);
    });
  });
}

const añadirCodigo = () => {
  const añadirCodigo = document.querySelectorAll('#anadirCodigo');
  añadirCodigo.forEach((añadirCodigo) => {
    añadirCodigo.innerHTML = " ";
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Seleccione un producto";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    añadirCodigo.appendChild(defaultOption);
    axios.get('http://localhost:3000/api/productosPaq')
    .then((response)=>{
      response.data.forEach((producto)=>{
        const opt = document.createElement('option');
        opt.value = producto.Codigo_Producto;
        opt.textContent = producto.Nom_Producto;
        opt.dataset.id = producto.Codigo_Producto;
        añadirCodigo.appendChild(opt);
      });
      añadirCodigo.addEventListener('change', () => {
        const codigoProducto = añadirCodigo.value;
        axios.get(`http://localhost:3000/api/productosPaq/${codigoProducto}`).then((response) => {
          const precioPromocion = response.data.Precio_Promocion;
          const añadirPrecioPromocion = document.querySelector('#añadirPrecioPromocion');
          añadirPrecioPromocion.value = precioPromocion;
        })
        .catch((error)=>{
          console.log(error);
        });
      });
    })
    .catch((error)=>{
      console.log(error);
    });
  });
}

const añadirProductos = () => {
  const idPaquete = document.getElementById("anadirPaquete").value;
  const codigoProducto = document.getElementById("anadirCodigo").value;
  const precioPromocion = document.getElementById("añadirPrecioPromocion").value;
  const cantidad = document.getElementById("añadirCantidad").value;
  axios.post("http://localhost:3000/api/paqueteProducto", {
    idPaquete: idPaquete,
    Codigo_Producto: codigoProducto,
    Precio_Promocion: precioPromocion,
    Cantidad_Producto: cantidad
  }).then(function (response) {
    Swal.fire({
      title: "Correcto",
      text: "Producto añadido al paquete correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  }).catch(function (error) {
    console.log(error);
    Swal.fire({
      title: "No se añadio correctamente",
      text: "Verifica si el producto está disponible o completa correctamente los campos",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });  });
};

const nombrePaquete = () => {
  const eliminarPaquete = document.querySelectorAll('#eliminarPaquete');
  eliminarPaquete.forEach((eliminarPaquete) => {
    eliminarPaquete.innerHTML = " ";
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Seleccione un paquete";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    eliminarPaquete.appendChild(defaultOption);
    axios.get('http://localhost:3000/api/paquetesCN')
    .then((response)=>{
      response.data.forEach((paquete)=>{
        const opt = document.createElement('option');
        opt.value = paquete.idPaquete;
        opt.textContent = paquete.Nom_Paquete;
        opt.dataset.id = paquete.idPaquete;
        eliminarPaquete.appendChild(opt);
      });
    }).catch((error)=>{console.log(error);});
  });
}

function eliminarPaquete() {
  const codigoInput = document.getElementById('eliminarPaquete');
  const idPaquete = codigoInput.value;
  axios.delete(`http://localhost:3000/api/paquete/${idPaquete}`).then(response => {
      Swal.fire({
        title: "Paquete eliminado",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error al eliminar el paquete",
        text: "Verifica si el paquete existe",
        icon: "error",
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

