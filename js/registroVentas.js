const tablaVentas = document.getElementById("tablaVentas");
const fragment = document.createDocumentFragment();
const templateVentas = document.getElementById("templateVentas").content;

window.addEventListener("DOMContentLoaded", function () {
  ventas();
});

const ventas = () => {
  axios
    .get("http://localhost:3000/api/allventas")
    .then((response) => {
      let ventas = response.data;
      tablaVentas.innerHTML = "";
      ventas.forEach((venta) => {
        const fecha = new Date(venta.fecha);
        const opciones = { year: "numeric", month: "numeric", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
        templateVentas.querySelector("th").textContent = venta.idVenta;
        templateVentas.querySelectorAll("td")[0].textContent = fechaFormateada;
        templateVentas.querySelectorAll("td")[1].textContent =
          venta.Total_Venta;
        templateVentas.querySelectorAll("td")[2].innerHTML =
          "<ul>" +
          venta.Productos.map(
            (producto) =>
              `<li>${producto.Nom_producto} (Cantidad: ${producto.Cantidad})</li>`
          ).join("") +
          "</ul>";

        const clone = templateVentas.cloneNode(true);
        fragment.appendChild(clone);
      });
      tablaVentas.appendChild(fragment);
    })
    .catch((error) => {
      console.log(error);
    });
};

const semana = () => {
  axios
    .get("http://localhost:3000/api/sventas")
    .then((response) => {
      let ventas = response.data;

      tablaVentas.innerHTML = "";
      ventas.forEach((venta) => {
        const fecha = new Date(venta.fecha);
        const opciones = { year: "numeric", month: "numeric", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
        templateVentas.querySelector("th").textContent = venta.idVenta;
        templateVentas.querySelectorAll("td")[0].textContent = fechaFormateada;
        templateVentas.querySelectorAll("td")[1].textContent =
          venta.Total_Venta;
        templateVentas.querySelectorAll("td")[2].innerHTML =
          "<ul>" +
          venta.Productos.map(
            (producto) =>
              `<li>${producto.Nom_producto} (Cantidad: ${producto.Cantidad})</li>`
          ).join("") +
          "</ul>";

        const clone = templateVentas.cloneNode(true);
        fragment.appendChild(clone);
      });
      tablaVentas.appendChild(fragment);
    })
    .catch((error) => {
      console.log(error);
    });
};

const dia = () => {
  axios
    .get("http://localhost:3000/api/dventas")
    .then((response) => {
      let ventas = response.data;

      tablaVentas.innerHTML = "";
      ventas.forEach((venta) => {
        const fecha = new Date(venta.fecha);
        const opciones = { year: "numeric", month: "numeric", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
        templateVentas.querySelector("th").textContent = venta.idVenta;
        templateVentas.querySelectorAll("td")[0].textContent = fechaFormateada;
        templateVentas.querySelectorAll("td")[1].textContent =
          venta.Total_Venta;
        templateVentas.querySelectorAll("td")[2].innerHTML =
          "<ul>" +
          venta.Productos.map(
            (producto) =>
              `<li>${producto.Nom_producto} (Cantidad: ${producto.Cantidad})</li>`
          ).join("") +
          "</ul>";

        const clone = templateVentas.cloneNode(true);
        fragment.appendChild(clone);
      });
      tablaVentas.appendChild(fragment);
    })
    .catch((error) => {
      console.log(error);
    });
};
