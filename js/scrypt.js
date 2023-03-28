const items = document.getElementById("items");
const fragment = document.createDocumentFragment();
const templateCarrito = document.getElementById("templateLista").content;
const cantidadInput = document.getElementById("cantidad");
const precioInput = document.getElementById("importe");
const btnModal = document.getElementById("aceptar");
const modal = document.getElementById("modalBascula");

let listenersAgregados = false;
let carrito = {};

items.addEventListener("click", (e) => {
  btnAccion(e);
});

const buscarProducto = () => {
  let c = document.getElementById("buscarProducto").value;

  if (c.length === 0) {
    Swal.fire({
      title: "Alerta",
      text: "ingresa un codigo de producto  ",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });

    return;
  }
  axios
    .get("http://192.168.43.192:3000/api/producto/" + c)
    .then((response) => {
      this.productoEncontrado = response.data[0];

      if (productoEncontrado.Unidad == "Kilogramo") {
        $("#modalBascula").modal("show");
        if (!listenersAgregados) {
          $("#modalBascula").on("shown.bs.modal", () => {
            datosModal(productoEncontrado);
          });
          cantidadInput.addEventListener("input", () => {
            actualizarPrecio(productoEncontrado);
          });
          btnModal.addEventListener("click", () => {
            setCarritoBascula(productoEncontrado);
          });
          listenersAgregados = true;
        }
        return;
      }

      setCarrito(productoEncontrado);
      document.getElementById("buscarProducto").value = "";
    })
    .catch((error) => {
      Swal.fire({
        title: "Alerta",
        text: "Este producto no existe",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      document.getElementById("buscarProducto").value = "";
    });
};

const setCarrito = (objeto) => {
  const producto = {
    Codigo: objeto.Codigo,
    Nombre: objeto.Nom_Producto,
    Precio_Venta: objeto.Precio_Venta,
    Precio_Compra: objeto.Precio_Compra,
    Stock: objeto.Stock,
    Unidad: objeto.Unidad,
    cantidad: 1,
  };

  if (carrito.hasOwnProperty(producto.Codigo)) {
    if (carrito[producto.Codigo].Stock == 1) {
      Swal.fire({
        title: "Alerta",
        text: "Ya no hay mas producto en inventario",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });

      return;
    } else {
      carrito[producto.Codigo].Stock -= 1;
      if (carrito.hasOwnProperty(producto.Codigo)) {
        producto.cantidad = carrito[producto.Codigo].cantidad + 1;
        producto.Stock = carrito[producto.Codigo].Stock;
      }
    }
  }

  carrito[producto.Codigo] = { ...producto };
  console.log(carrito);
  pintarCarrito();
  pintarFooter();
};

function pintarCarrito() {
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    console.log(producto);
    templateCarrito.querySelector("th").textContent = producto.Codigo;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.Nombre;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelectorAll("span")[0].textContent =
      producto.Precio_Venta;
    templateCarrito.querySelectorAll("span")[1].textContent =
      producto.Precio_Venta * producto.cantidad;

    // Agregar eventos a los botones

    const btnAumentar = templateCarrito.querySelector(".btn-info");
    btnAumentar.dataset.id = producto.Codigo;

    const btnDisminuir = templateCarrito.querySelector(".btn-danger");
    btnDisminuir.dataset.id = producto.Codigo;

    // Clonar el template y agregarlo al fragmento
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });

  // Agregar el fragmento al DOM
  items.appendChild(fragment);
  pintarFooter();
}

//pintar footer
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("template-footer").content;

const pintarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = ` <th scope="row" colspan="5">Lista vacía - escanea para agregar!</th>`;
    return;
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
  templateFooter.querySelectorAll("span")[1].textContent =
    parseFloat(nPrecio).toFixed(2);

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
    pintarFooter();
  });
};

const btnAccion = (e) => {
  if (e.target.classList.contains("btn-info")) {
    const producto = carrito[e.target.dataset.id];
    if (producto.Stock == 1) {
      Swal.fire({
        title: "Alerta",
        text: "Ya no hay mas producto en inventario",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }
    producto.cantidad++;
    producto.Stock--;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
    pintarFooter();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    producto.Stock++;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    } else {
      carrito[e.target.dataset.id] = { ...producto };
    }
    pintarCarrito();
    pintarFooter();
  }
  e.stopPropagation();
};

const setCarritoBascula = (objeto) => {
  const producto = {
    Codigo: objeto.Codigo,
    Nombre: objeto.Nom_Producto,
    Precio_Venta: parseFloat(objeto.Precio_Venta),
    Precio_Compra: parseFloat(objeto.Precio_Compra),
    Unidad: objeto.Unidad,
    cantidad: parseFloat(cantidadInput.value),
  };

  if (carrito.hasOwnProperty(producto.Codigo)) {
    carrito[producto.Codigo].Stock -= cantidadInput.value;
    if (carrito.hasOwnProperty(producto.Codigo)) {
      producto.cantidad =
        carrito[producto.Codigo].cantidad + parseFloat(cantidadInput.value);
      producto.Stock = carrito[producto.Codigo].Stock;
    }
  }

  $("#modalBascula").off("shown.bs.modal");

  carrito[producto.Codigo] = { ...producto };
  console.log(carrito);
  pintarCarrito();
  limpiarModal();
  document.getElementById("buscarProducto").value = "";
  btnModal.removeEventListener("click", () => {
    setCarritoBascula(productoEncontrado);
  });
};

function datosModal(producto) {
  console.log("modal");
  const tituloProducto = document.querySelector("#productoNombre");

  const precio = document.querySelector("#precio");

  // Modifica el contenido de los elementos h1
  tituloProducto.textContent = producto.Nom_Producto;
  precio.textContent = "$" + producto.Precio_Venta + " por " + producto.Unidad;
}

const actualizarPrecio = (producto) => {
  const cantidad = parseFloat(cantidadInput.value);
  const precio = parseFloat(producto.Precio_Venta);
  const total = cantidad * precio;

  precioInput.value = total.toFixed(3);
};

const limpiarModal = () => {
  modal.querySelector("form").reset();
  $("#modalBascula").modal("toggle");
};
