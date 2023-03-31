const templateCard = document.getElementById('template-card');
const fragment = document.createDocumentFragment();
data = [];

const fetchData = async () => {
  try {
    const res = await fetch('http://192.168.43.192:3000/api/vendedores')
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

const addCarrito = e => {
  console.log(e.target)
}