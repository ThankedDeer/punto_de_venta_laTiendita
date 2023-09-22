const tablaMoviminetos = document.getElementById("tablaMoviminetos");
const fragment = document.createDocumentFragment();
const templateMovimientos = document.getElementById("templateMovimientos").content;

window.addEventListener("DOMContentLoaded", function () {
  gActuales();
  gAproximadas();
  inversion();
  pInventario();
  movimientos();
  dineroCaja();
  dineroEntradas();
  dineroSalidas();
});

let dineroEnCaja = 0;
let gananciasActuales = 0;
let resultadoGlobal;
let actualesGlobal;
let entradasGlobal;
let salidasGlobal;


const movimientos = () => {
  axios
    .get("http://localhost:3000/api/todoCajas")
    .then((response) => {
      let movimientos = response.data;
      tablaMoviminetos.innerHTML = "";
      movimientos.forEach((movimiento) => {
        templateMovimientos.querySelector("th").textContent =
          movimiento.idCaja;
        templateMovimientos.querySelectorAll("td")[0].textContent =
          movimiento.Tipo_Operacion;
        templateMovimientos.querySelectorAll("td")[1].textContent =
          movimiento.Nom_Vendedor;
        templateMovimientos.querySelectorAll("td")[2].textContent =
          "$" + movimiento.Cantidad_Dinero;
        
        const fecha = new Date(movimiento.Fecha);
        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const anio = fecha.getFullYear();
        const fechaFormateada = `${dia}-${mes}-${anio}`;

        templateMovimientos.querySelectorAll("td")[3].textContent = fechaFormateada;
        templateMovimientos.querySelectorAll("td")[4].textContent =
          movimiento.Hora;
        templateMovimientos.querySelectorAll("td")[5].textContent =
          movimiento.Descripcion_Operacion;

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
  axios.get("http://localhost:3000/api/caja")
    .then((response) => {
      const dinero = response.data[0].dineroEnCaja;
      const dineroCaja = parseFloat(dinero) || 0;
      const Ganancias = parseFloat(actuales) || 0;

      let resultado = dineroCaja + Ganancias;
      resultadoGlobal = resultado;
      document.getElementById("dinero").innerHTML = "$" + resultado;
    })
    .catch((error) => {
      console.log(error);
    });
};

const gActuales = () => {
  axios.get("http://localhost:3000/api/Actuales")
    .then((response) => {
      let actuales = response.data[0].Ganancias || 0;
      dineroCaja(actuales);
      actualesGlobal = actuales;
      document.getElementById("gActuales").innerHTML = "$" + actuales;
    })
    .catch((error) => {
      console.log(error);
    });
};

const gAproximadas = () => {
    axios.get("http://localhost:3000/api/aproximadas")
      .then((response) => {
        let aproximadas = response.data[0].Ganancias  
          document.getElementById('gAproximadas').innerHTML = "$" + aproximadas
      })
      .catch((error) => {
        console.log(error); 
      });
  }

const pInventario = () => {
  axios
    .get("http://localhost:3000/api/productos")
    .then((response) => {
      const totalStock = response.data[0].total_stock;
      document.getElementById('pInventarios').innerHTML = totalStock;
    })
    .catch((error) => {
      console.log(error);
    });
};

  const inversion = () => {
    axios
      .get("http://localhost:3000/api/invercion")
      .then((response) => {
        let inversiones = response.data[0].Invercion
          document.getElementById('Inversión').innerHTML = "$" +inversiones
      })
      .catch((error) => {
        console.log(error); 
      });
  };


  const dineroEntradas = () => {
    axios
      .get("http://localhost:3000/api/entradas")
      .then((response) => {
        let entradas = response.data[0].Entradas
          entradasGlobal = entradas;
      })
      .catch((error) => {
        console.log(error); 
      });
  };

  const dineroSalidas = () => {
    axios
      .get("http://localhost:3000/api/salidas")
      .then((response) => {
        let salidas = response.data[0].Salidas
          salidasGlobal = salidas;
      })
      .catch((error) => {
        console.log(error); 
      });
  };

const ingresarCaja = () => {
  const cantidad = document.getElementById("inputEntrada");
  const user = JSON.parse(localStorage.getItem("vendedor"));
  const descripcion = document.getElementById("descripcionEntrada");

  let entradaAxl = {
    idCaja: localStorage.getItem("idCaja"),
    idCompu: localStorage.getItem("idCompu"),
    idOperacion: 2,
    idVendedor: user.id,
    Cantidad_Dinero: cantidad.value,
    Descripcion_Operacion: descripcion.value
  };
  axios.post("http://localhost:3000/api/entrada", entradaAxl)
    .then((response) => {
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
  const descripcion = document.getElementById("descripcionSalida");

  let salida = {
    idCaja: localStorage.getItem("idCaja"),
    idCompu: localStorage.getItem("idCompu"),
    idOperacion: 3,
    idVendedor: user.id,
    Cantidad_Dinero: cantidad.value,
    Descripcion_Operacion: descripcion.value
  };
  axios.post("http://localhost:3000/api/entrada", salida)
    .then((response) => {
      gActuales();
      movimientos()
    })
    .catch((error) => {
      console.log(error);
    });
  cantidad.value = "";
  $("#exampleModal").modal("hide");
};


const corteCaja = () => {
var fechaActual = new Date();
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; 
var anio = fechaActual.getFullYear();
var fechaFormateada = dia.toString().padStart(2, '0') + '-' + mes.toString().padStart(2, '0') + '-' + anio.toString();
localStorage.setItem('fecha', fechaFormateada);

var fecha = new Date();
var hora = fecha.getHours();
var minutos = fecha.getMinutes();
var segundos = fecha.getSeconds();
var horaActual = hora + ':' + minutos + ':' + segundos;
localStorage.setItem('hora', horaActual);

  const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
      <html>
      <head>
          <title>Corte de Caja</title>
      </head>
      <body>
      <h2 id=""><strong>***CORTE DE CAJA***</strong></h2>

        <div id="ticket">
        <h1>========================================================================================================</h1>
        <h2 id="Nom_Sucursal"><strong></strong></h2>
        <h1>========================================================================================================</h1>
        <h2 id="DireccionSucursal" ><strong></strong></h2>
        <h4 id="fecha"><strong></strong></h4>
        <h4 id="hora"><strong></strong></h4>

        <h4 id="dineroEnCaja"><strong>** Entradas de dinero: $${entradasGlobal} **</strong></h4>
        <h4 id="dineroEnCaja"><strong>** Salidas de dinero: $${salidasGlobal} **</strong></h4>
        <h4 id="dineroEnCaja"><strong>** Ganancias del día: $${actualesGlobal} **</strong></h4>
        <h4 id="dineroEnCaja"><strong>** Dinero En Caja: $${resultadoGlobal} **</strong></h4>
        
        
        </div>
          <script>
              window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                      window.close();
                  }
              }
          </script>

          <script>
            var sucursal = localStorage.getItem("Nom_Sucursal");
            var textoCompleto = sucursal;
            document.getElementById("Nom_Sucursal").textContent = textoCompleto;

            var direccionSucursal = localStorage.getItem("Direccion_Sucursal");
            var textoCompleto = direccionSucursal;
            document.getElementById("DireccionSucursal").textContent = textoCompleto;

            var fecha = localStorage.getItem("fecha");
            var textoCompleto = fecha;
            document.getElementById("fecha").textContent = "Fecha: " + textoCompleto;

            var hora = localStorage.getItem("hora");
            var textoCompleto = hora;
            document.getElementById("hora").textContent = "Hora: " + textoCompleto;
          </script>
      </body>
      </html>
      `);
      printWindow.document.close();
};