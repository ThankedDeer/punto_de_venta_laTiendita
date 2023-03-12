carrito = [];

const items = document.getElementById("items");
const fragment = document.createDocumentFragment();
const templateCarrito = document.getElementById("templateLista").content;

const buscarProducto = () => {
  c = document.getElementById("buscarProducto").value;
  if (c.length == 0) {
    Swal.fire({
      title: "Alerta",
      text: "ingresa un codigo de producto  ",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
    return;
  }
  axios
    .get("https://backtiendita-production.up.railway.app/api/producto/" + c)
    .then((response) => {
      const producto = response.data[0];
      console.log(producto);
      producto.cantidad = 1;
      const encontrado = carrito.find((p) => p.Codigo === producto.Codigo);
      if (encontrado) {
        if (encontrado.Stock != 1) {
          encontrado.cantidad += producto.cantidad;
          encontrado.Stock = encontrado.Stock - 1;
          // console.log(encontrado.Stock);
        } else {
          Swal.fire({
            title: "Alerta",
            text: "Ya no hay mas producto en inventario",
            icon: "warning",
            confirmButtonText: "Cerrar",
          });
        }
      } else {
        carrito.push(producto);
      }
      pintarCarrito()

      pintarFooter();
        // document.getElementById("buscarProducto").value = "";


      ;
})
    .catch((error) => {
      console.log(error);
      Swal.fire({
        title: "Alerta",
        text: "Este producto no existe",
        icon: "error",
        confirmButtonText: "Cerrar",
      });

      // document.getElementById("buscarProducto").value = "";
    });
};




function pintarCarrito() {
    
  document.getElementById("items").innerHTML = "";
  carrito.forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.Codigo;
    console.log(producto.Codigo);
    templateCarrito.querySelectorAll("td")[0].textContent =
      producto.Nom_Producto;
    templateCarrito.querySelectorAll("td")[1].textContent =
      producto.cantidad;
    templateCarrito.querySelector("span").textContent =
      producto.Precio_Venta * producto.cantidad;

    //botones
    templateCarrito.querySelector(".btn-info").dataset.id = 1;
    templateCarrito.querySelector(".btn-danger").dataset.id = 1;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);

    items.appendChild(fragment);

  })
}











//pintar footer
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("template-footer").content;
const pintarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = ` <th scope="row" colspan="5">Lista vacía - escanea para agregar!</th>`;
    return
  }
  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { Precio_Venta, cantidad }) => acc + cantidad * Precio_Venta,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click', () =>{
    carrito = []
    pintarCarrito()
    pintarFooter()
  })
};
