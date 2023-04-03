data = [];

const fetchData = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/vendedores')
    const data = await res.json()
    pintarCards(data)
  } catch (error) {
    console.log(error)
  }
}

const pintarCards = data => {
  const fragment = document.createDocumentFragment();
  
  data.forEach(vendedor => {
    const templateCard = document.querySelector('#template-card').content
    templateCard.querySelector('h5').textContent = vendedor.Nom_Vendedor
    templateCard.querySelector('.botonPermisos').dataset.id = vendedor.idVendedor
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })

  const items = document.querySelector('#items');
  items.appendChild(fragment);

  items.addEventListener('click', e => {
    addCarrito(e)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})
<<<<<<< HEAD

const addCarrito = e => {
  console.log(e)
}

// const actualizarRol = ()=>{
//   const credenciales = {
//     Nom_Vendedor: document.getElementById("user").,
//     Contraseña: document.getElementById("pass").value,
//   };
  
//   axios
//   .patch("http://localhost:3000/api/permisos", credenciales)
//   .then((response) => {
//     let lista = response.data
//     mostrarProductos(lista)
//   })
//   .catch((error) =>{
//     log.error(error);
//   })
// }

=======
>>>>>>> f9ecefe86f2b2ea37b07bb461afd9f1eaa1b6700
