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
    reiniciarInputs();
  })
  
  .catch(function (error) {
    console.log(error);
    alert("Hubo un error al crear la categoria. Verifica si el Nombre de la categoria ya existen");
  });
};