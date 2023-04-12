const tablaMoviminetos = document.getElementById("tablaMoviminetos");
const fragment = document.createDocumentFragment();
const templateMovimientos = document.getElementById(
  "templateMovimientos"
).content;

window.addEventListener("DOMContentLoaded", function () {
  gActuales();
  gAproximadas();
  inversion();
  pInventario();
  movimientos();
});

const movimientos = () => {
  axios
    .get("http://localhost:3000/api/todoCajas")
    .then((response) => {
     
      console.log(response.data);
      let movimientos = response.data;
      tablaMoviminetos.innerHTML = ""
      movimientos.forEach((movimiento) => {
        const fecha = new Date( movimiento.fecha);
        const opciones = { year: "numeric", month: "numeric", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
        templateMovimientos.querySelector("th").textContent =
          movimiento.Nom_Vendedor;
        templateMovimientos.querySelectorAll("td")[0].textContent =
          movimiento.Nombre_Operación;
        templateMovimientos.querySelectorAll("td")[1].textContent =
          movimiento.hora;
        templateMovimientos.querySelectorAll("td")[2].textContent =
        fechaFormateada;
        templateMovimientos.querySelectorAll("td")[3].textContent =
          "$" +movimiento.Cantidad;

        const clone = templateMovimientos.cloneNode(true);
        fragment.appendChild(clone);
      });
      tablaMoviminetos.appendChild(fragment);
    })
    .catch((error) => {
      console.log(error);
    });
};

const dineroCaja = (actuales) => {
  axios
    .get("http://localhost:3000/api/caja")
    .then((response) => {
      const dinero = response.data[0].dineroEnCaja;
      const dineroCaja = parseFloat(dinero) || 0;
      const Ganancias = parseFloat(actuales) || 0;

      console.log(dineroCaja);
      console.log(Ganancias);

      let resultado = dineroCaja + Ganancias;
      document.getElementById("dinero").innerHTML = "$" + resultado;
    })
    .catch((error) => {
      console.log(error);
    });
};

const gActuales = () => {
  axios
    .get("http://localhost:3000/api/Actuales")
    .then((response) => {
      let actuales = response.data[0].Ganancias || 0;
      console.log(actuales);
      dineroCaja(actuales);
      document.getElementById("gActuales").innerHTML = "$" + actuales;
    })
    .catch((error) => {
      console.log(error);
    });
};

const gAproximadas = () => {
  axios
    .get("http://localhost:3000/api/Aproximadas")
    .then((response) => {
      aproximadas = response.data[0].Ganacias;
      console.log(aproximadas);

      document.getElementById("gAproximadas").innerHTML = "$" + aproximadas;
    })
    .catch((error) => {
      console.log(error);
    });
};

const pInventario = () => {
  axios
    .get("http://localhost:3000/api/productos")
    .then((response) => {
      inventario = response.data;
      total = 0;
      inventario.forEach((element) => {
        this.total = element.Stock + this.total;
      });

      document.getElementById("pInventarios").innerHTML = this.total;
    })
    .catch((error) => {
      console.log(error);
    });
};

const inversion = () => {
  axios
    .get("http://localhost:3000/api/invercion")
    .then((response) => {
      inversiones = response.data[0].Invercion;
      console.log(inversiones);
      document.getElementById("Inversión").innerHTML = "$" + inversiones;
    })
    .catch((error) => {
      console.log(error);
    });
};

axios
  .get("http://localhost:3000/api/invercion")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

const ingresarCaja = () => {
  const cantidad = document.getElementById("inputEntrada");
  const user = JSON.parse(localStorage.getItem("vendedor"));

  let entrada = {
    idVendedor: user.id,
    idOperacion: 2,
    Cantidad: cantidad.value,
  };
  axios
    .post("http://localhost:3000/api/entrada", entrada)
    .then((response) => {
      console.log(response.data);
      gActuales();
      movimientos()
    })
    .catch((error) => {
      console.log(error);
    });
  cantidad.value = "";
  $("#ingresarDinero").modal("hide");
};

const RetirarCaja = () => {
  const cantidad = document.getElementById("inputSalida");
  const user = JSON.parse(localStorage.getItem("vendedor"));

  let salida = {
    idVendedor: user.id,
    idOperacion: 3,
    Cantidad: cantidad.value,
  };
  axios
    .post("http://localhost:3000/api/entrada", salida)
    .then((response) => {
      console.log(response.data);
      gActuales();
      movimientos()
    })
    .catch((error) => {
      console.log(error);
    });
  cantidad.value = "";
  $("#exampleModal").modal("hide");
};
