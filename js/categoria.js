window.addEventListener("load", function () {
  cargarCategorias();
});

function cargarCategorias() {
  axios.get("http://localhost:3000/api/categorias")
    .then(function(response) {
      const categorias = response.data;
      const darCategoria = document.getElementById("darCategoria");

      const opcionVacia = document.createElement("option");
      opcionVacia.value = "";
      opcionVacia.text = "";
      darCategoria.add(opcionVacia);

      // Generar una opción por cada categoría en la lista
      categorias.forEach(function(categoria) {
        const option = document.createElement("option");
        option.value = categoria.idCategoria;
        option.text = categoria.Nom_Categoria;
        darCategoria.add(option);
      });

      // Actualizar el formulario al cambiar la categoría seleccionada
      darCategoria.addEventListener("change", function() {
        const idCategoria = darCategoria.value;
        axios.get(`http://localhost:3000/api/categoria/${idCategoria}`)
          .then(function(response) {
            console.log(idCategoria);
            const categoria = response.data[0];
            console.log(categoria);
            const actNameCategoria = document.getElementById("actNameCategoria");
            const actDescripcionCategoria = document.getElementById("actDescripcionCategoria");
            actNameCategoria.value = categoria.Nom_Categoria;
            actDescripcionCategoria.value = categoria.Descripcion_Categoria;
          })
          .catch(function(error) {
            console.log(error);
            Swal.fire({
              title: "Error",
              text: "No se pudo obtener la información de la categoría seleccionada",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
          });
      });

      const btnActualizarCategoria = document.getElementById("btnActualizarCategoria");
      btnActualizarCategoria.addEventListener("click", function() {
        const idCategoria = darCategoria.value;
        const nombre = document.getElementById("actNameCategoria").value;
        const descripcion = document.getElementById("actDescripcionCategoria").value;

        axios.patch(`http://localhost:3000/api/categoriact/${idCategoria}`, {
          Nom_Categoria: nombre,
          Descripcion_Categoria: descripcion,
        })
        .then(function(response) {
          Swal.fire({
            title: "Correcto",
            text: "Categoria actualizada correctamente",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
        })
        .catch(function(error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "No se pudo actualizar la categoría",
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
        text: "No se pudo cargar la lista de categorías",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    });
}



const nuevaCategoria = () => {
  const nombre = document.getElementById("newNameCategoria").value;
  const descripcion = document.getElementById("newDescripcionCategoria").value;
  
  axios.post("http://localhost:3000/api/categorias", {
    Nom_Categoria: nombre,
    Descripcion_Categoria: descripcion
  })
  .then(function (response) {
    Swal.fire({
      title: "Correcto",
      text: "Categoria creada correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  })
  
  .catch(function (error) {
    console.log(error);
    Swal.fire({
      title: "No se creo la categoira",
      text: "Verifica si la categoria ya existe",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
  });
};

