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


// function mostrarCategorias() {
//   axios.get('http://localhost:3000/api/categorias')
//     .then(response => {
//       const categorias = response.data;
//       const select = document.getElementById('actualizarCat');
//       select.innerHTML = '<option selected value="">Selecciona la categoria</option>';
//       categorias.forEach(categoria => {
//         const option = document.createElement('option');
//         option.value = categoria.idCategoria;
//         option.dataset.nombre = categoria.Nom_Categoria;
//         option.dataset.descripcion = categoria.Descripcion_Categoria;
//         option.text = categoria.Nom_Categoria;
//         select.appendChild(option);
//       });
//       select.addEventListener('change', mostrarDatosCategoria);
//     })
//     .catch(error => console.error(error));
// }

// function mostrarDatosCategoria() {
//   const select = document.getElementById('actualizarCat');
//   const categoriaSeleccionada = select.options[select.selectedIndex];
//   document.getElementById("actualizarCategoria").value = categoriaSeleccionada.dataset.nombre;
//   document.getElementById("actualizarDescripcion").value = categoriaSeleccionada.dataset.descripcion;
//   console.log(categoriaSeleccionada);
// }

// function editarCategoria() {
//   const select = document.getElementById('actualizarCat');
//   const categoriaSeleccionada = select.options[select.selectedIndex].value;
//   const nombre = document.getElementById("actualizarCategoria").value;
//   const descripcion = document.getElementById("actualizarDescripcion").value;

//   axios.put(`http://localhost:3000/api/categoria/${categoriaSeleccionada}`, { 
//       Nom_Categoria: nombre, 
//       Descripcion_Categoria: descripcion 
//     })
//     .then(response => {
//       console.log(response.data);
//       Swal.fire({
//         title: "Correcto",
//         text: "Categoria actualizada correctamente",
//         icon: "success",
//         confirmButtonText: "Cerrar",
//       });
//       location.reload();
//     })
//     .catch(error => {
//           console.error(error);
//           Swal.fire({
//             title: "Error al actualizar",
//             text: "Verifica bien los datos",
//             icon: "warning",
//             confirmButtonText: "Cerrar",
//           });
//         });
//       }

// mostrarCategorias();





// // function actualizarCategoria() {
// //   const nombreCategoria = document.getElementById("traerNombre").value;
// //   const nombreActualizado = document.getElementById("actualizarNombre").value;
// //   const descripcionActualizada = document.getElementById("actualizarDescripcion").value;

// //   axios.put(`http://localhost:3000/api/categoria/${nombreCategoria}`, {
// //     nombre: nombreActualizado,
// //     descripcion: descripcionActualizada
// //   })
// //   .then(response => {
// //     console.log(response.data);
// //     Swal.fire({
// //       title: "Correcto",
// //       text: "Categoria actualizada correctamente",
// //       icon: "success",
// //       confirmButtonText: "Cerrar",
// //     });
// //   })
// //   .catch(error => {
// //     console.error(error);
// //     Swal.fire({
// //       title: "Error al actualizar",
// //       text: "Verifica bien los datos",
// //       icon: "warning",
// //       confirmButtonText: "Cerrar",
// //     });
// //   });
// // }

// const habilitarCamposCategoria = function() {
//   document.getElementById("actualizarCategoria").removeAttribute("readonly");
//   document.getElementById("actualizarDescripcion").removeAttribute("readonly");
// };