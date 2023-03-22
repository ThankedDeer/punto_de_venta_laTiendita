let carrito = {};

const items = document.getElementById("items");
const fragment = document.createDocumentFragment();
const templateCarrito = document.getElementById("templateLista").content;

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
    .get("https://backtiendita-production-9419.up.railway.app/api/producto/" + c)
    .then((response) => {
      const productoEncontrado = response.data[0];
      setCarrito(productoEncontrado);
    })
    .catch((error) => {
      Swal.fire({
        title: "Alerta",
        text: "Este producto no existe",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    });
};

const setCarrito = (objeto) => {
  const producto = {
    Codigo: objeto.Codigo,
    Nombre: objeto.Nom_Producto,
    Precio_Venta: objeto.Precio_Venta,
    Precio_Compra: objeto.Precio_Compra,
    Stock: objeto.Stock,
    cantidad: 1,
  };

  if (carrito.hasOwnProperty(producto.Codigo)) {
    if (carrito[producto.Codigo].Stock == 0) {
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
  templateFooter.querySelectorAll("span")[1].textContent = nPrecio;

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
    if (producto.Stock == 0) {
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
