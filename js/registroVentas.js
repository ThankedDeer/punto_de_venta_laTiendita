const tablaVentas = document.getElementById("tablaVentas");
const fragment = document.createDocumentFragment();
const templateVentas = document.getElementById("templateVentas").content;
const templateVentasVentasAxl = document.getElementById("templateVentasVentas").content;
const templateVentasSemana = document.getElementById("templateVentasSemana").content;

window.addEventListener("DOMContentLoaded", function () {
  ventas();
});

const ventas = () => {
  axios.get("http://localhost:3000/api/allventas")
    .then((response) => {
      let ventas = response.data;

      ventas.sort((a, b) => {
        return b.idVenta - a.idVenta;
      });

      tablaVentas.innerHTML = "";
      ventas.forEach((venta) => {
        const fecha = new Date(venta.Fecha);

        const offset = fecha.getTimezoneOffset();
        fecha.setMinutes(fecha.getMinutes() + offset);

        const opciones = { year: "numeric", month: "numeric", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);

        const templateVentasClone = templateVentasVentasAxl.cloneNode(true);
        templateVentasClone.querySelector("th").textContent = venta.idVenta;
        templateVentasClone.querySelectorAll("td")[2].textContent = fechaFormateada;
        templateVentasClone.querySelectorAll("td")[5].textContent = venta.Total_Venta;

        let productosHTML = "<ul>";
        venta.Productos.forEach((producto) => {
          productosHTML += `<li>${producto.Nom_Producto} (Cantidad: ${producto.Cantidad_Producto})</li>`;
        });
        productosHTML += "</ul>";
        templateVentasClone.querySelectorAll("td")[4].innerHTML = productosHTML;

        templateVentasClone.querySelectorAll("td")[1].textContent = venta.Nom_Vendedor; 
        templateVentasClone.querySelectorAll("td")[0].textContent = venta.idCaja;
        templateVentasClone.querySelectorAll("td")[3].textContent = venta.Hora;
        fragment.appendChild(templateVentasClone);
      });
      tablaVentas.appendChild(fragment);
    })
    .catch((error) => {
      console.log(error);
    });
};