const tablaCredito = document.getElementById("tablaCredito");
const fragment = document.createDocumentFragment();
const templateCredito = document.getElementById("tablaCredito").content
window.addEventListener("load", function () {
  clientes();
  clientess();
  cargarClientes();
  saldoPendiente();
});

const saldoPendiente = () => {
  axios.get("http://localhost:3000/api/saldoPendiente").then((response) => {
      let lista = response.data;
      mostrarSaldoPendiente(lista);})
    .catch((error) => {
      console.log(error);
    });
};

const mostrarSaldoPendiente = (lista) => {
  const tablaCredito = document.getElementById("tablaCredito");
  const templateCredito = document.getElementById("templateCredito");
  tablaCredito.innerHTML = '';
  const creditosPorCliente = {};
  lista.forEach((saldo) => {
    const cliente = saldo.Nom_Cliente;
    const creditoDisponible = saldo.Credito_Disponible;
    if (!creditosPorCliente[cliente]) {
      creditosPorCliente[cliente] = [];
    }
    creditosPorCliente[cliente].push(creditoDisponible);
  });
  Object.entries(creditosPorCliente).forEach(([cliente, creditos]) => {
    const clone = templateCredito.content.cloneNode(true);
    const row = clone.querySelector(".credito");
    const th = row.querySelector("th");
    th.textContent = cliente;
    th.classList.add("text-center");
    const td = row.querySelector("td");
    td.innerHTML = creditos.map(credito => `\u25CF ${credito}`).join("<br>");
    td.classList.add("text-center");
    tablaCredito.appendChild(clone);
  });
};

const nuevoCliente = () => {
  const nombre = document.getElementById("crearNombreCliente").value;
  const direccion = document.getElementById("crearDireccionCliente").value;
  const contacto = document.getElementById("crearContactoCliente").value;
  axios.post("http://localhost:3000/api/cliente", {
    Nom_Cliente: nombre,
    Direccion_Cliente: direccion,
    Contacto_Cliente: contacto
  }).then(function (response) {
    Swal.fire({
      title: "Correcto",
      text: "Cliente creado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  }).catch(function (error) {
    console.log(error);
    Swal.fire({
      title: "No se creo el cliente",
      text: "Verifica si el cliente ya existe",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
  });
};

const clientes = () => {
  const listaClientes = document.querySelectorAll('#cliente');
  listaClientes.forEach((listaClientes) => {
    listaClientes.innerHTML = " ";
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Seleccione un cliente";
    listaClientes.appendChild(defaultOption);
    axios.get('http://localhost:3000/api/clienteIN').then((response)=>{
      response.data.forEach((cliente)=>{
        const opt = document.createElement('option');
        opt.value = cliente.idCliente;
        opt.textContent = cliente.Nom_Cliente;
        opt.dataset.id = cliente.idCliente;
        listaClientes.appendChild(opt);
      });
    }).catch((error)=>{
      console.log(error);
    });
  });
}

const clientess = () => {
  const listaClientes = document.querySelectorAll('#actcliente');
  listaClientes.forEach((listaClientes) => {
    listaClientes.innerHTML = " ";
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Seleccione un cliente";
    listaClientes.appendChild(defaultOption);
    axios.get('http://localhost:3000/api/clienteIN')
    .then((response)=>{
      response.data.forEach((cliente)=>{
        const opt = document.createElement('option');
        opt.value = cliente.idCliente;
        opt.textContent = cliente.Nom_Cliente;
        opt.dataset.id = cliente.idCliente; 
        listaClientes.appendChild(opt);
      });
    }).catch((error)=>{
      console.log(error);
    });
  });
}

const cargarDatosCliente = (idCliente) => {
  axios.get(`http://localhost:3000/api/datosCliente/${idCliente}`).then(response => {
      const cliente = response.data;
      const inputs = document.querySelectorAll("#actcliente, #nuevoNombre, #nuevaDireccion, #nuevoContacto");
      inputs.forEach(input => {
        switch (input.id) {
          case "actcliente":
            input.value = cliente.idCliente;
            break;
          case "nuevoNombre":
            input.value = cliente.Nom_Cliente;
            break;
          case "nuevaDireccion":
            input.value = cliente.Direccion_Cliente;
            break;
          case "nuevoContacto":
            input.value = cliente.Contacto_Cliente;
            break;
          default:
            break;
        }
      });
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "No se encontró el cliente",
        text: "Verifica si el cliente existe",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    });
};

const eliminarCliente = () => {
  const idClienteSelect = document.getElementById('actcliente');
  const cliente = idClienteSelect.value;
  axios.delete(`http://localhost:3000/api/deleteCliente/${cliente}`)
  .then(response => {
    Swal.fire({
      title: "Cliente eliminado",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    idClienteSelect.value = "";
    document.getElementById('nuevoNombre').value = "";
    document.getElementById('nuevaDireccion').value = "";
    document.getElementById('nuevoContacto').value = "";
  }).catch(error => {
    console.log(error);
    Swal.fire({
      title: "Error al eliminar el cliente",
      text: "Tiene un saldo pendiente o algo salio mal",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  });
}

function cargarClientes() {
  const selectCliente = document.getElementById('actcliente');
  const selectCreditos = document.getElementById('creditos');
  if (selectCliente.hasAttribute('data-cargado')) {
    return; 
  }
  axios.get('http://localhost:3000/api/clienteIN').then(response => {
      const clientes = response.data;
      selectCliente.innerHTML = '';
      const optionSelecciona = document.createElement('option');
      optionSelecciona.text = 'Selecciona un cliente';
      optionSelecciona.disabled = true;
      optionSelecciona.selected = true;
      selectCliente.appendChild(optionSelecciona);
      clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.text = cliente.Nom_Cliente;
        option.value = cliente.idCliente;
        selectCliente.appendChild(option);});
      selectCliente.addEventListener('change', () => {
        const idCliente = selectCliente.value;
        axios.get(`http://localhost:3000/api/creditos/${idCliente}`).then(response => {
            const creditos = response.data;
            selectCreditos.innerHTML = '';
            creditos.forEach(credito => {
              const option = document.createElement('option');
              option.text = credito.Credito_Disponible;
              option.value = credito.idCredito;
              selectCreditos.appendChild(option);
            });
          })
          .catch(error => {
            console.error('Error al cargar los créditos:', error);
          });
      });
      selectCliente.setAttribute('data-cargado', true);})
    .catch(error => {
      console.error('Error al cargar los clientes:', error);
    });
}

function actualizarCredito(){
  const idCliente = document.getElementById('actcliente').value;
  const idCredito = document.getElementById('creditos').value;
  const nuevoCredito = document.getElementById('actualizarCredito').value;
  const creditoActualizado = {
    idCliente: idCliente,
    idCredito: idCredito,
    Credito_Disponible: nuevoCredito};
  axios.patch(`http://localhost:3000/api/credito/${idCliente}/${idCredito}`, creditoActualizado).then(response => {
    Swal.fire({
      title: "Actualizado",
      text: "Saldo actualizado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  });
}

const crearCredito = () => {
  const cliente = document.getElementById("cliente").value;
  const credito = document.getElementById("credito").value;
  axios.post("http://localhost:3000/api/credito", {
    idCliente: cliente,
    Credito_Disponible: credito}).then(function (response) {
    Swal.fire({
      title: "Correcto",
      text: "Se añadio saldo pendiente al cliente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  }).catch(function (error) {
    console.log(error);
    Swal.fire({
      title: "Error al crear",
      text: "Verifica que los campos esten correctamente llenados",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });  
  });
};

const actualizarCliente = () => {
  const idCliente = document.getElementById("actcliente").value;
  const nuevoNombre = document.getElementById("nuevoNombre").value;
  const nuevaDireccion = document.getElementById("nuevaDireccion").value;
  const nuevoContacto = document.getElementById("nuevoContacto").value;
  const clienteActualizado = {
    idCliente: idCliente,
    Nom_Cliente: nuevoNombre,
    Direccion_Cliente: nuevaDireccion,
    Contacto_Cliente: nuevoContacto};
  axios.patch(`http://localhost:3000/api/actCliente/${idCliente}`, clienteActualizado).then(response => {
      Swal.fire({
        title: "Correcto",
        text: "Cliente actualizado correctamente",
        icon: "success",
        confirmButtonText: "Cerrar"});
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title: "Hubo un error al guardar los cambios",
        text: "Verifica bien los datos y completa la información correctamente",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    });
}

const habilitarCampos = () => {
  document.getElementById("nuevoNombre").removeAttribute("disabled");
  document.getElementById("nuevaDireccion").removeAttribute("disabled");
  document.getElementById("nuevoContacto").removeAttribute("disabled");
};
function limpiarInputsYSelects() {
  const inputs = document.querySelectorAll('input[type=text], input[type=number]');
  const selects = document.querySelectorAll('select');
  inputs.forEach(input => input.value = '');
  selects.forEach(select => select.selectedIndex = 0);
  window.location.reload();
}

