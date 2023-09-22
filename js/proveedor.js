window.addEventListener("load", function () {
  cargarProveedores();
});

function cargarProveedores() {
  axios.get("http://localhost:3000/api/proveedores")
    .then(function(response) {
      const proveedoresAxl = response.data;
      const darProveedor = document.getElementById("darProveedor");

      const opcionVacia = document.createElement("option");
      opcionVacia.value = "";
      opcionVacia.text = "Selecciona un proveedor";
      opcionVacia.disabled = true;
      opcionVacia.selected = true;
      darProveedor.add(opcionVacia);

      proveedoresAxl.forEach(function(proveedor) {
        const option = document.createElement("option");
        option.value = proveedor.idProveedor;
        option.text = proveedor.Nom_Proveedor;
        darProveedor.add(option);
      });

      darProveedor.addEventListener("change", function() {
        const idProveedor = darProveedor.value;
        axios.get(`http://localhost:3000/api/proveedor/${idProveedor}`)
          .then(function(response) {
            const proveedor = response.data[0];
            const actNameProveedor = document.getElementById("actNameProveedor");
            const actContactoProveedor = document.getElementById("actContactoProveedor");
            actNameProveedor.value = proveedor.Nom_Proveedor;
            actContactoProveedor.value = proveedor.Contacto_Proveedor;
          })
          .catch(function(error) {
            console.log(error);
            Swal.fire({
              title: "Error",
              text: "No se pudo obtener la información del proveedor seleccionado",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
          });
      });

      const btnActualizarProveedor = document.getElementById("btnActualizarProveedor");
      btnActualizarProveedor.addEventListener("click", function() {
        const idProveedor = darProveedor.value;
        const nombre = document.getElementById("actNameProveedor").value;
        const contacto = document.getElementById("actContactoProveedor").value;

        axios.patch(`http://localhost:3000/api/proveedores/${idProveedor}`, {
          Nom_Proveedor: nombre,
          Contacto_Proveedor: contacto,
        })
        .then((response) => {
          Swal.fire({
            title: "Correcto",
            text: "Proveedor actualizado correctamente",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
        })
        .catch(function(error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "No se pudo actualizar el proveedor",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        });
      });
    })
    .catch(function(error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar la lista de proveedores",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    });
}

const nuevoProveedor = () => {
  const nombre = document.getElementById("newProveedor").value;
  const contacto = document.getElementById("newDescripcionProveedor").value;
  
  axios.post("http://localhost:3000/api/proveedores", {
    Nom_Proveedor: nombre,
    Contacto_Proveedor: contacto
  })
  .then(function (response) {
    Swal.fire({
      title: "Correcto",
      text: "Proveedor creado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  })
  .catch(function (error) {
    console.log(error);
    Swal.fire({
      title: "No se creo la categoira",
      text: "Verifica si el proveedor ya existe",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
  });
};

const habilitarCamposProveedor = function() {
  document.getElementById("actNameProveedor").removeAttribute("disabled");
  document.getElementById("actContactoProveedor").removeAttribute("disabled");
}
