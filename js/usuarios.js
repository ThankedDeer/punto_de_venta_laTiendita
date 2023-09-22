const postUsuarios = () => {
  const usuario = document.getElementById("usuario");
  const contraseña = document.getElementById("contraseña");
  const rol = document.getElementById("rol");
  const newUsuario = {
    idVendedor_Permisos: rol.value,
    Nom_Vendedor: usuario.value,
    Contraseña: contraseña.value,
  };

  axios
    .post("http://localhost:3000/api/vendedores", newUsuario)
    .then((response) => {
      let usuarioCreado = response.data.Nom_Vendedor;
      Swal.fire({
        title: "Creado",
        html:
          "Usuario <strong>" + usuarioCreado + "</strong> creado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      rol.value = "";
      contraseña.value = "";
      usuario.value = "";
      $("#crear").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
};

const selectUsuarios = () => {
  const select = document.querySelector("#eliminar select");
  const objeto = localStorage.getItem("vendedor");
  const vendedor = JSON.parse(objeto);
  
  axios
    .get("http://localhost:3000/api/vendedores") 
    .then((response) => {
      const usuarios = response.data;
      select.innerHTML = "<option selected>Usuarios</option>"; 
      usuarios.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.idVendedor;
        option.textContent = usuario.Nom_Vendedor;
        select.appendChild(option);
      });
      const options = select.querySelectorAll("option");
      options.forEach((option) => {
        if (option.value == vendedor.id) {
          option.disabled = true;
          option.style.color = "red";

        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const eliminarUsario = () => {
  const usuarioEliminar = document.querySelector("#eliminar select").value;  
  axios
    .delete("http://localhost:3000/api/vendedores/" + usuarioEliminar)
    .then((response) => {
      Swal.fire({
        title: "Eliminado",
        html: "Usuario eliminado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      $("#eliminar").modal("hide");
    })
    .catch((error) => {
      console.error(error);
    });
};

const selectUsuarios2 = () => {
  const select = document.querySelector("#actualizar select");
  axios
    .get("http://localhost:3000/api/vendedores")
    .then((response) => {
      const usuarios = response.data;
      select.innerHTML = "<option selected>Usuarios</option>";
      usuarios.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.idVendedor;
        option.textContent = usuario.Nom_Vendedor;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};


const updateshow = () => {
  const usuario = document.getElementById("usuarioSelect").value;
  axios
    .get("http://localhost:3000/api/vendedor/" + usuario)
    .then((response) => {
      let idPermiso = response.data[0].idVendedor_Permisos;
      const selectRol = document.getElementById("updateRol");

      for (let i = 0; i < selectRol.options.length; i++) {
        if (selectRol.options[i].value == idPermiso) {
          selectRol.options[i].selected = true;
          break;
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateUsuarios = () => {
  const usuario = document.getElementById("usuarioSelect");
  const rol2 = document.getElementById("updateRol");
  const updateUsuario = {
    idVendedor_Permisos: rol2.value,
    idVendedor: usuario.value,
  };
  axios
    .patch("http://localhost:3000/api/permisos", updateUsuario)
    .then((response) => {
      Swal.fire({
        title: "Actualizado",
        html: "Usuario actualizado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      rol2.value = "";
      usuario.value = "";
      $("#actualizar").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
};

function limpiarInputsYSelects() {
  const inputs = document.querySelectorAll('input[type=text], input[type=number]');
  const selects = document.querySelectorAll('select');
  
  inputs.forEach(input => input.value = '');
  selects.forEach(select => select.selectedIndex = 0);

  window.location.reload();
}