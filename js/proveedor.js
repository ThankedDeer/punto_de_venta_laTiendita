window.addEventListener("load", function () {
  cargarProveedores();
});

function cargarProveedores() {
  axios.get("http://localhost:3000/api/proveedores")
    .then(function(response) {
      const proveedores = response.data;
      const darProveedor = document.getElementById("darProveedor");

      const opcionVacia = document.createElement("option");
      opcionVacia.value = "";
      opcionVacia.text = "";
      darProveedor.add(opcionVacia);

      // Generar una opción por cada categoría en la lista
      proveedores.forEach(function(proveedor) {
        const option = document.createElement("option");
        option.value = proveedor.idProveedor;
        option.text = proveedor.Nom_Proveedor;
        darProveedor.add(option);
      });

      // Actualizar el formulario al cambiar la categoría seleccionada
      darProveedor.addEventListener("change", function() {
        const idProveedor = darProveedor.value;
        axios.get(`http://localhost:3000/api/proveedor/${idProveedor}`)
          .then(function(response) {
            console.log(idProveedor);
            const proveedor = response.data[0];
            console.log(proveedor);
            const actNameProveedor = document.getElementById("actNameProveedor");
            const actContactoProveedor = document.getElementById("actContactoProveedor");
            actNameProveedor.value = proveedor.Nom_Proveedor;
            actContactoProveedor.value = proveedor.Contacto;
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
          Contacto: contacto,
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
    Contacto: contacto
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