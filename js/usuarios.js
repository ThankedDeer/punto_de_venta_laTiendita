const items = document.getElementById('items');
const templateCard = document.getElementById('template-card');
const fragment = document.createDocumentFragment();

data = []

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})
//items.addEventListener('click', e => {
  //   cambiarRol(e)
//})
const fetchData = async () => {
  try {
    const res = await fetch('https://backtiendita-production.up.railway.app/api/vendedores')
    const data = await res.json()
    pintarCards(data)
  }catch (error) {
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
}

//Actualizar rol-------------------------------------------------------------

//const cambiarRol = e => {
  //console.log(e.target)
//}